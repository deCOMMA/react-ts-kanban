"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { CheckIcon, UserPlusIcon, XIcon } from "lucide-react";

import * as Styles from "./ProfileFriendsPage.styles";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";

export const ProfileFriendsPage = observer(function ProfileFriendsPage() {
    const { authStore, friendStore } = useStore();

    const [searchValue, setSearchValue] = useState("");

    const currentUser = authStore.user;

    if (!currentUser) {
        return null;
    }

    const friends = friendStore.getFriends(currentUser.id);
    const incomingRequests = friendStore.getIncomingRequests(currentUser.id);
    const outgoingRequests = friendStore.getOutgoingRequests(currentUser.id);
    const searchResults = friendStore.searchUsers(currentUser.id, searchValue);

    const handleSendRequest = async (targetUserId: string) => {
        await friendStore.sendFriendRequest(currentUser.id, targetUserId);
    };

    const handleAcceptRequest = async (requestId: string) => {
        const request = incomingRequests.find((item) => item.id === requestId);

        if (!request) {
            return;
        }

        await friendStore.acceptFriendRequest(request);
    };

    const handleRejectRequest = async (requestId: string) => {
        const request = incomingRequests.find((item) => item.id === requestId);

        if (!request) {
            return;
        }

        await friendStore.rejectFriendRequest(request);
    };

    const handleRemoveFriend = async (friendId: string) => {
        await friendStore.removeFriend(currentUser.id, friendId);
    };

    return (
        <Styles.PageGrid>
            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.Title>Поиск пользователей</Styles.Title>
                        <Styles.Description>
                            Найдите пользователя по имени или нику и отправьте заявку в друзья.
                        </Styles.Description>
                    </div>
                </Styles.SectionHeader>

                <Styles.SearchWrapper>
                    <Input
                        label="Поиск"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        placeholder="Например: decomma9"
                    />
                </Styles.SearchWrapper>

                {friendStore.error && (
                    <Styles.ErrorText>{friendStore.error}</Styles.ErrorText>
                )}

                <Styles.List>
                    {searchValue.trim() && searchResults.length === 0 && (
                        <Styles.EmptyState>Пользователи не найдены</Styles.EmptyState>
                    )}

                    {searchResults.map((user) => {
                        const isFriend = friendStore.isFriend(currentUser.id, user.id);
                        const hasPendingRequest = friendStore.hasPendingRequest(
                            currentUser.id,
                            user.id
                        );

                        return (
                            <Styles.UserCard key={user.id}>
                                <Styles.Avatar $src={user.avatarUrl}>
                                    {!user.avatarUrl && user.fullName.slice(0, 1).toUpperCase()}
                                </Styles.Avatar>

                                <Styles.UserLink href={`/users/${user.id}`}>
                                    <Styles.UserContent>
                                        <Styles.UserName>{user.fullName}</Styles.UserName>
                                        <Styles.Username>@{user.username}</Styles.Username>
                                    </Styles.UserContent>
                                </Styles.UserLink>

                                {isFriend ? (
                                    <Styles.StatusText>Уже в друзьях</Styles.StatusText>
                                ) : hasPendingRequest ? (
                                    <Styles.StatusText>Заявка отправлена</Styles.StatusText>
                                ) : (
                                    <Button
                                        size="sm"
                                        leftIcon={<UserPlusIcon />}
                                        disabled={friendStore.isLoading}
                                        onClick={() => handleSendRequest(user.id)}
                                    >
                                        Добавить
                                    </Button>
                                )}
                            </Styles.UserCard>
                        );
                    })}
                </Styles.List>
            </Styles.Section>

            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.Title>Мои друзья</Styles.Title>
                        <Styles.Description>
                            Пользователи, с которыми вы можете работать над проектами.
                        </Styles.Description>
                    </div>

                    <Styles.CountBadge>{friends.length}</Styles.CountBadge>
                </Styles.SectionHeader>

                <Styles.List>
                    {friends.length === 0 ? (
                        <Styles.EmptyState>У вас пока нет друзей</Styles.EmptyState>
                    ) : (
                        friends.map((friend) => (
                            <Styles.UserCard key={friend.id}>
                                <Styles.Avatar $src={friend.avatarUrl}>
                                    {!friend.avatarUrl &&
                                        friend.fullName.slice(0, 1).toUpperCase()}
                                </Styles.Avatar>
                                <Styles.UserLink href={`/users/${friend.id}`}>
                                    <Styles.UserContent>
                                        <Styles.UserName>{friend.fullName}</Styles.UserName>
                                        <Styles.Username>@{friend.username}</Styles.Username>
                                    </Styles.UserContent>
                                </Styles.UserLink>

                                <Button
                                    size="sm"
                                    variant="outlined"
                                    disabled={friendStore.isLoading}
                                    onClick={() => handleRemoveFriend(friend.id)}
                                >
                                    Удалить
                                </Button>
                            </Styles.UserCard>
                        ))
                    )}
                </Styles.List>
            </Styles.Section>
            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.Title>Входящие заявки</Styles.Title>
                        <Styles.Description>
                            Пользователи, которые хотят добавить вас в друзья.
                        </Styles.Description>
                    </div>
                </Styles.SectionHeader>

                <Styles.List>
                    {incomingRequests.length === 0 ? (
                        <Styles.EmptyState>Входящих заявок пока нет</Styles.EmptyState>
                    ) : (
                        incomingRequests.map((request) => {
                            const user = friendStore.getUserById(request.fromUserId);

                            if (!user) {
                                return null;
                            }

                            return (
                                <Styles.UserCard key={request.id}>
                                    <Styles.Avatar $src={user.avatarUrl}>
                                        {!user.avatarUrl &&
                                            user.fullName.slice(0, 1).toUpperCase()}
                                    </Styles.Avatar>
                                    <Styles.UserLink href={`/users/${user.id}`}>
                                        <Styles.UserContent>
                                            <Styles.UserName>{user.fullName}</Styles.UserName>
                                            <Styles.Username>@{user.username}</Styles.Username>
                                        </Styles.UserContent>
                                    </Styles.UserLink>

                                    <Styles.Actions>
                                        <Button
                                            size="sm"
                                            leftIcon={<CheckIcon />}
                                            disabled={friendStore.isLoading}
                                            onClick={() => handleAcceptRequest(request.id)}
                                        >
                                            Принять
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            leftIcon={<XIcon />}
                                            disabled={friendStore.isLoading}
                                            onClick={() => handleRejectRequest(request.id)}
                                        >
                                            Отклонить
                                        </Button>
                                    </Styles.Actions>
                                </Styles.UserCard>
                            );
                        })
                    )}
                </Styles.List>
            </Styles.Section>


            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.Title>Исходящие заявки</Styles.Title>
                        <Styles.Description>
                            Заявки, которые вы отправили другим пользователям.
                        </Styles.Description>
                    </div>
                </Styles.SectionHeader>

                <Styles.List>
                    {outgoingRequests.length === 0 ? (
                        <Styles.EmptyState>Исходящих заявок пока нет</Styles.EmptyState>
                    ) : (
                        outgoingRequests.map((request) => {
                            const user = friendStore.getUserById(request.toUserId);

                            if (!user) {
                                return null;
                            }

                            return (
                                <Styles.UserCard key={request.id}>
                                    <Styles.Avatar $src={user.avatarUrl}>
                                        {!user.avatarUrl &&
                                            user.fullName.slice(0, 1).toUpperCase()}
                                    </Styles.Avatar>
                                    <Styles.UserLink href={`/users/${user.id}`}>
                                        <Styles.UserContent>
                                            <Styles.UserName>{user.fullName}</Styles.UserName>
                                            <Styles.Username>@{user.username}</Styles.Username>
                                        </Styles.UserContent>
                                    </Styles.UserLink>

                                    <Styles.StatusText>Ожидает ответа</Styles.StatusText>
                                </Styles.UserCard>
                            );
                        })
                    )}
                </Styles.List>
            </Styles.Section>
        </Styles.PageGrid>
    );
});