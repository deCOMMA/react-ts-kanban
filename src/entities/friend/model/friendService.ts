import { request } from "@/src/shared/api/baseApi";
import type { User } from "@/src/entities/user";
import type { FriendRequest, Friendship } from "./type";

export async function fetchUsers() {
    return request<User[]>("/users");
}

export async function fetchFriendRequests() {
    return request<FriendRequest[]>("/friendRequests");
}

export async function fetchFriendships() {
    return request<Friendship[]>("/friendships");
}

export async function createFriendRequest(
    data: Omit<FriendRequest, "id">
) {
    return request<FriendRequest>("/friendRequests", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateFriendRequest(
    requestId: string,
    data: Partial<FriendRequest>
) {
    return request<FriendRequest>(`/friendRequests/${requestId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export async function createFriendship(data: Omit<Friendship, "id">) {
    return request<Friendship>("/friendships", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function deleteFriendship(friendshipId: string) {
    return request<Friendship>(`/friendships/${friendshipId}`, {
        method: "DELETE",
    });
}