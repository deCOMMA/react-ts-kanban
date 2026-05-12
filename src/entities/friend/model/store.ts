import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "@/src/entities/user";
import type { FriendRequest, Friendship } from "./type";
import {
    createFriendRequest,
    createFriendship,
    deleteFriendship,
    fetchFriendRequests,
    fetchFriendships,
    fetchUsers,
    updateFriendRequest,
} from "./friendService";

export class FriendStore {
    users: User[] = [];
    friendRequests: FriendRequest[] = [];
    friendships: Friendship[] = [];

    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAll() {
        this.isLoading = true;
        this.error = null;

        try {
            const [users, friendRequests, friendships] = await Promise.all([
                fetchUsers(),
                fetchFriendRequests(),
                fetchFriendships(),
            ]);

            runInAction(() => {
                this.users = users;
                this.friendRequests = friendRequests;
                this.friendships = friendships;
            });
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка загрузки друзей";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    searchUsers(currentUserId: string, query: string) {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return [];
        }

        return this.users.filter((user) => {
            if (user.id === currentUserId) {
                return false;
            }

            return (
                user.username.toLowerCase().includes(normalizedQuery) ||
                user.fullName.toLowerCase().includes(normalizedQuery)
            );
        });
    }

    getFriends(currentUserId: string) {
        const friendIds = this.friendships
            .filter((friendship) => friendship.userIds.includes(currentUserId))
            .map((friendship) =>
                friendship.userIds[0] === currentUserId
                    ? friendship.userIds[1]
                    : friendship.userIds[0]
            );

        return this.users.filter((user) => friendIds.includes(user.id));
    }

    getIncomingRequests(currentUserId: string) {
        return this.friendRequests.filter(
            (request) =>
                request.toUserId === currentUserId && request.status === "pending"
        );
    }

    getOutgoingRequests(currentUserId: string) {
        return this.friendRequests.filter(
            (request) =>
                request.fromUserId === currentUserId && request.status === "pending"
        );
    }

    getUserById(userId: string) {
        return this.users.find((user) => user.id === userId) || null;
    }

    isFriend(currentUserId: string, targetUserId: string) {
        return this.friendships.some(
            (friendship) =>
                friendship.userIds.includes(currentUserId) &&
                friendship.userIds.includes(targetUserId)
        );
    }

    hasPendingRequest(currentUserId: string, targetUserId: string) {
        return this.friendRequests.some(
            (request) =>
                request.status === "pending" &&
                ((request.fromUserId === currentUserId &&
                    request.toUserId === targetUserId) ||
                    (request.fromUserId === targetUserId &&
                        request.toUserId === currentUserId))
        );
    }

    async sendFriendRequest(currentUserId: string, targetUserId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            if (currentUserId === targetUserId) {
                throw new Error("Нельзя добавить себя в друзья");
            }

            if (this.isFriend(currentUserId, targetUserId)) {
                throw new Error("Пользователь уже у вас в друзьях");
            }

            if (this.hasPendingRequest(currentUserId, targetUserId)) {
                throw new Error("Заявка уже существует");
            }

            const now = new Date().toISOString();

            const request = await createFriendRequest({
                fromUserId: currentUserId,
                toUserId: targetUserId,
                status: "pending",
                createdAt: now,
                updatedAt: now,
            });

            runInAction(() => {
                this.friendRequests = [...this.friendRequests, request];
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка отправки заявки";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async acceptFriendRequest(request: FriendRequest) {
        this.isLoading = true;
        this.error = null;

        try {
            const now = new Date().toISOString();

            const updatedRequest = await updateFriendRequest(request.id, {
                status: "accepted",
                updatedAt: now,
            });

            const friendship = await createFriendship({
                userIds: [request.fromUserId, request.toUserId],
                createdAt: now,
            });

            runInAction(() => {
                this.friendRequests = this.friendRequests.map((item) =>
                    item.id === request.id ? updatedRequest : item
                );

                this.friendships = [...this.friendships, friendship];
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка принятия заявки";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async rejectFriendRequest(request: FriendRequest) {
        this.isLoading = true;
        this.error = null;

        try {
            const updatedRequest = await updateFriendRequest(request.id, {
                status: "rejected",
                updatedAt: new Date().toISOString(),
            });

            runInAction(() => {
                this.friendRequests = this.friendRequests.map((item) =>
                    item.id === request.id ? updatedRequest : item
                );
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка отклонения заявки";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async removeFriend(currentUserId: string, friendId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const friendship = this.friendships.find(
                (item) =>
                    item.userIds.includes(currentUserId) &&
                    item.userIds.includes(friendId)
            );

            if (!friendship) {
                throw new Error("Дружба не найдена");
            }

            await deleteFriendship(friendship.id);

            runInAction(() => {
                this.friendships = this.friendships.filter(
                    (item) => item.id !== friendship.id
                );
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка удаления друга";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
    getFriendshipBetween(firstUserId: string, secondUserId: string) {
        return (
            this.friendships.find(
                (friendship) =>
                    friendship.userIds.includes(firstUserId) &&
                    friendship.userIds.includes(secondUserId)
            ) || null
        );
    }

    getPendingRequestBetween(firstUserId: string, secondUserId: string) {
        return (
            this.friendRequests.find(
                (request) =>
                    request.status === "pending" &&
                    ((request.fromUserId === firstUserId &&
                        request.toUserId === secondUserId) ||
                        (request.fromUserId === secondUserId &&
                            request.toUserId === firstUserId))
            ) || null
        );
    }

    getRelationStatus(currentUserId: string, targetUserId: string) {
        if (currentUserId === targetUserId) {
            return "self";
        }

        const friendship = this.getFriendshipBetween(currentUserId, targetUserId);

        if (friendship) {
            return "friend";
        }

        const pendingRequest = this.getPendingRequestBetween(
            currentUserId,
            targetUserId
        );

        if (!pendingRequest) {
            return "none";
        }

        if (pendingRequest.fromUserId === currentUserId) {
            return "outgoing";
        }

        return "incoming";
    }
}