"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { UserPlusIcon } from "lucide-react";

import * as Styles from "./ProjectUsersPage.styles";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { PROJECT_ROLE_LABEL } from "@/src/entities/project-member";

interface ProjectUsersPageProps {
    projectId: string;
}

export const ProjectUsersPage = observer(function ProjectUsersPage({
    projectId,
}: ProjectUsersPageProps) {
    const { authStore, friendStore, projectMemberStore } = useStore();

    const [searchValue, setSearchValue] = useState("");

    const currentUser = authStore.user;

    useEffect(() => {
        friendStore.fetchAll();
        projectMemberStore.fetchAll();
    }, [friendStore, projectMemberStore]);

    if (!currentUser) {
        return null;
    }

    const projectMembers = projectMemberStore.getMembersByProject(projectId);

    const outgoingInvitations = projectMemberStore.getOutgoingInvitationsByProject(projectId, currentUser.id);
    const outgoingInvitationsWithUsers = outgoingInvitations.flatMap((invitation) => {
        const user = friendStore.getUserById(invitation.toUserId);

        if (!user) {
            return [];
        }

        return [
            {
                invitation,
                user,
            },
        ];
    });

    const membersWithUsers = projectMembers.flatMap((member) => {
        const user = friendStore.getUserById(member.userId);

        if (!user) {
            return [];
        }

        return [
            {
                member,
                user,
            },
        ];
    });

    const searchResults = friendStore
        .searchUsers(currentUser.id, searchValue)
        .filter((user) => {
            const isMember = projectMemberStore.isProjectMember(projectId, user.id);
            return !isMember;
        });

    const handleInviteUser = async (targetUserId: string) => {
        await projectMemberStore.inviteUserToProject({
            projectId,
            fromUserId: currentUser.id,
            toUserId: targetUserId,
            role: "member",
        });
    };

    return (
        <Styles.Grid>
            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.Title>Участники проекта</Styles.Title>
                        <Styles.Description>
                            Пользователи, которые имеют доступ к проекту и его доскам.
                        </Styles.Description>
                    </div>
                </Styles.SectionHeader>

                {projectMemberStore.error && (
                    <Styles.ErrorText>{projectMemberStore.error}</Styles.ErrorText>
                )}

                <Styles.List>
                    {membersWithUsers.length === 0 ? (
                        <Styles.EmptyState>У проекта пока нет участников</Styles.EmptyState>
                    ) : (
                        membersWithUsers.map((item) => {
                            if (!item) {
                                return null;
                            }

                            const { member, user } = item;

                            return (
                                <Styles.UserCard key={member.id}>
                                    <Styles.Avatar $src={user.avatarUrl}>
                                        {!user.avatarUrl &&
                                            user.fullName.slice(0, 1).toUpperCase()}
                                    </Styles.Avatar>

                                    <Styles.UserLink href={currentUser.id != user.id ?
                                        `/users/${user.id}`
                                        :
                                        `/profile`}>
                                        <Styles.UserContent>
                                            <Styles.UserName>{user.fullName}</Styles.UserName>
                                            <Styles.Username>@{user.username}</Styles.Username>
                                        </Styles.UserContent>
                                    </Styles.UserLink>

                                    <Styles.RoleBadge $role={member.role}>
                                        {PROJECT_ROLE_LABEL[member.role]}
                                    </Styles.RoleBadge>
                                </Styles.UserCard>
                            );
                        })
                    )}
                </Styles.List>
            </Styles.Section>

            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.Title>Пригласить пользователя</Styles.Title>
                        <Styles.Description>
                            Найдите пользователя по имени или нику и отправьте приглашение в
                            проект.
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

                <Styles.List>
                    {searchValue.trim() && searchResults.length === 0 && (
                        <Styles.EmptyState>Пользователи не найдены</Styles.EmptyState>
                    )}

                    {searchResults.map((user) => {
                        const hasPendingInvitation =
                            projectMemberStore.hasPendingInvitation(projectId, user.id);

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

                                {hasPendingInvitation ? (
                                    <Styles.StatusText>Приглашение отправлено</Styles.StatusText>
                                ) : (
                                    <Button
                                        size="sm"
                                        leftIcon={<UserPlusIcon />}
                                        disabled={projectMemberStore.isLoading}
                                        onClick={() => handleInviteUser(user.id)}
                                    >
                                        Пригласить
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
                        <Styles.Title>Ожидают ответа</Styles.Title>
                        <Styles.Description>
                            Пользователи, которым вы отправили приглашение в этот проект.
                        </Styles.Description>
                    </div>
                </Styles.SectionHeader>

                <Styles.List>
                    {outgoingInvitationsWithUsers.length === 0 ? (
                        <Styles.EmptyState>Нет ожидающих приглашений</Styles.EmptyState>
                    ) : (
                        outgoingInvitationsWithUsers.map(({ invitation, user }) => (
                            <Styles.UserCard key={invitation.id}>
                                <Styles.Avatar $src={user.avatarUrl}>
                                    {!user.avatarUrl && user.fullName.slice(0, 1).toUpperCase()}
                                </Styles.Avatar>

                                <Styles.UserLink
                                    href={currentUser.id !== user.id ? `/users/${user.id}` : "/profile"}
                                >
                                    <Styles.UserContent>
                                        <Styles.UserName>{user.fullName}</Styles.UserName>
                                        <Styles.Username>@{user.username}</Styles.Username>
                                    </Styles.UserContent>
                                </Styles.UserLink>

                                <Styles.StatusText>Ожидает ответа</Styles.StatusText>
                            </Styles.UserCard>
                        ))
                    )}
                </Styles.List>
            </Styles.Section>
        </Styles.Grid>
    );
});