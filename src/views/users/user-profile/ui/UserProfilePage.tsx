"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { UserPlusIcon, CheckIcon, XIcon, UserMinusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import * as Styles from "./UserProfilePage.styles";
import { Button } from "@/src/shared/ui/Button";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

interface UserProfilePageProps {
    userId: string;
}

export const UserProfilePage = observer(function UserProfilePage({
    userId,
}: UserProfilePageProps) {
    const router = useRouter();
    const { authStore, friendStore, projectStore, projectMemberStore } = useStore();

    const currentUser = authStore.user;


    useEffect(() => {
        friendStore.fetchAll();
        projectMemberStore.fetchAll();
        projectStore.fetchAllProjects();
    }, [friendStore, projectMemberStore, projectStore]);

    if (!currentUser) {
        return null;
    }

    const targetUser = friendStore.getUserById(userId);

    const userProjects = projectStore.projects.filter((project) => {
        const isOwner = project.owner === targetUser?.id;

        const isAcceptedMember = projectMemberStore.isProjectMember(
            project.id,
            targetUser!.id,
        );

        return isOwner || isAcceptedMember;
    });

    if (!targetUser) {
        return (
            <Styles.Page>
                <Styles.Container>
                    <Styles.EmptyState>Пользователь не найден</Styles.EmptyState>
                </Styles.Container>
            </Styles.Page>
        );
    }

    const relationStatus = friendStore.getRelationStatus(
        currentUser.id,
        targetUser.id
    );

    const pendingRequest = friendStore.getPendingRequestBetween(
        currentUser.id,
        targetUser.id
    );

    const friends = friendStore.getFriends(targetUser.id);

    const avatarLetter = targetUser.fullName.slice(0, 1).toUpperCase();

    const handleSendRequest = async () => {
        await friendStore.sendFriendRequest(currentUser.id, targetUser.id);
    };

    const handleAcceptRequest = async () => {
        if (!pendingRequest) {
            return;
        }

        await friendStore.acceptFriendRequest(pendingRequest);
    };

    const handleRejectRequest = async () => {
        if (!pendingRequest) {
            return;
        }

        await friendStore.rejectFriendRequest(pendingRequest);
    };

    const handleRemoveFriend = async () => {
        await friendStore.removeFriend(currentUser.id, targetUser.id);
    };

    const renderAction = () => {
        if (relationStatus === "self") {
            return (
                <Button variant="outlined" onClick={() => router.push("/profile")}>
                    Мой профиль
                </Button>
            );
        }

        if (relationStatus === "friend") {
            return (
                <Button
                    variant="outlined"
                    leftIcon={<UserMinusIcon />}
                    disabled={friendStore.isLoading}
                    onClick={handleRemoveFriend}
                >
                    Удалить из друзей
                </Button>
            );
        }

        if (relationStatus === "outgoing") {
            return (
                <Button variant="outlined" disabled>
                    Заявка отправлена
                </Button>
            );
        }

        if (relationStatus === "incoming") {
            return (
                <Styles.Actions>
                    <Button
                        leftIcon={<CheckIcon />}
                        disabled={friendStore.isLoading}
                        onClick={handleAcceptRequest}
                    >
                        Принять
                    </Button>

                    <Button
                        variant="outlined"
                        leftIcon={<XIcon />}
                        disabled={friendStore.isLoading}
                        onClick={handleRejectRequest}
                    >
                        Отклонить
                    </Button>
                </Styles.Actions>
            );
        }

        return (
            <Button
                leftIcon={<UserPlusIcon />}
                disabled={friendStore.isLoading}
                onClick={handleSendRequest}
            >
                Добавить в друзья
            </Button>
        );
    };

    return (
        <Styles.Page>
            <Styles.Container>
                <Styles.ProfileCard>
                    <Styles.Avatar $src={targetUser.avatarUrl}>
                        {!targetUser.avatarUrl && avatarLetter}
                    </Styles.Avatar>

                    <Styles.UserInfo>
                        <Styles.FullName>{targetUser.fullName}</Styles.FullName>
                        <Styles.Username>@{targetUser.username}</Styles.Username>
                        <Styles.Email>{targetUser.email}</Styles.Email>

                        <Styles.Bio>
                            {targetUser.bio || "Описание профиля пока не добавлено."}
                        </Styles.Bio>
                    </Styles.UserInfo>

                    {renderAction()}
                </Styles.ProfileCard>

                <Styles.StatsGrid>
                    <Styles.StatCard>
                        <Styles.StatValue>{userProjects.length}</Styles.StatValue>
                        <Styles.StatLabel>Проектов</Styles.StatLabel>
                    </Styles.StatCard>

                    <Styles.StatCard>
                        <Styles.StatValue>{friends.length}</Styles.StatValue>
                        <Styles.StatLabel>Друзей</Styles.StatLabel>
                    </Styles.StatCard>

                    <Styles.StatCard>
                        <Styles.StatValue>0</Styles.StatValue>
                        <Styles.StatLabel>Активностей</Styles.StatLabel>
                    </Styles.StatCard>
                </Styles.StatsGrid>

                <Styles.Section>
                    <Styles.SectionTitle>Друзья пользователя</Styles.SectionTitle>

                    {friends.length === 0 ? (
                        <Styles.EmptyState>У пользователя пока нет друзей</Styles.EmptyState>
                    ) : (
                        <Styles.FriendGrid>
                            {friends.map((friend) => (
                                <Styles.FriendCard key={friend.id} href={
                                    currentUser.id != friend.id ?
                                        `/users/${friend.id}`
                                        :
                                        `/profile`
                                }>
                                    <Styles.FriendAvatar $src={friend.avatarUrl}>
                                        {!friend.avatarUrl &&
                                            friend.fullName.slice(0, 1).toUpperCase()}
                                    </Styles.FriendAvatar>

                                    <Styles.FriendInfo>
                                        <Styles.FriendName>{friend.fullName}</Styles.FriendName>
                                        <Styles.FriendUsername>
                                            @{friend.username}
                                        </Styles.FriendUsername>
                                    </Styles.FriendInfo>
                                </Styles.FriendCard>
                            ))}
                        </Styles.FriendGrid>
                    )}
                </Styles.Section>
            </Styles.Container>
        </Styles.Page>
    );
});