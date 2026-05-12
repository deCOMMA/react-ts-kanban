"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { CheckIcon, XIcon } from "lucide-react";

import * as Styles from "./ProfileProjectsPage.styles";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { Button } from "@/src/shared/ui/Button";
import { PROJECT_ROLE_LABEL } from "@/src/entities/project-member";

export const ProfileProjectsPage = observer(function ProfileProjectsPage() {
    const { authStore, projectStore, projectMemberStore, friendStore } =
        useStore();

    const currentUser = authStore.user;

    useEffect(() => {
        if (!currentUser?.id) {
            return;
        }

        projectStore.fetchProjects(currentUser.id);
        projectStore.fetchAllProjects();
        projectMemberStore.fetchAll();
        friendStore.fetchAll();
    }, [currentUser?.id, projectStore, projectMemberStore, friendStore]);

    if (!currentUser) {
        return null;
    }

    const incomingInvitations = projectMemberStore.getIncomingInvitations(currentUser.id);

    const userProjects = projectStore.projects.filter((project) => {
        const isOwner = project.owner === currentUser.id;

        const isAcceptedMember = projectMemberStore.isProjectMember(
            project.id,
            currentUser.id
        );

        return isOwner || isAcceptedMember;
    });
    console.log("userProjects", userProjects);
    const handleAcceptInvitation = async (
        invitationId: string
    ) => {
        const invitation = incomingInvitations.find(
            (item) => item.id === invitationId
        );

        if (!invitation) {
            return;
        }

        const success = await projectMemberStore.acceptInvitation(invitation);

        if (!success) {
            return;
        }

        await projectStore.addMemberToProject(invitation.projectId, {
            id: currentUser.id,
            fullName: currentUser.fullName,
            avatarUrl: currentUser.avatarUrl,
        });

        await projectStore.fetchProjects(currentUser.id);
        await projectMemberStore.fetchAll();
    };

    const handleRejectInvitation = async (
        invitationId: string
    ) => {
        const invitation = incomingInvitations.find(
            (item) => item.id === invitationId
        );

        if (!invitation) {
            return;
        }

        await projectMemberStore.rejectInvitation(invitation);
    };
    console.log(projectStore.projects.length);
    return (
        <Styles.Wrapper>
            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.SectionTitle>Мои проекты</Styles.SectionTitle>
                        <Styles.SectionDescription>
                            Проекты, где вы являетесь владельцем или участником.
                        </Styles.SectionDescription>
                    </div>
                </Styles.SectionHeader>

                {userProjects.length == 0 ? (
                    <Styles.EmptyState>
                        У вас пока нет проектов или вы не участвуете ни в одном проекте.
                    </Styles.EmptyState>
                ) : (
                    <Styles.Grid>
                        {userProjects.map((project) => {
                            const role =
                                project.owner === currentUser.id
                                    ? "owner"
                                    : projectMemberStore.getUserProjectRole(
                                        project.id,
                                        currentUser.id
                                    ) || "member";

                            return (
                                <Styles.ProjectCard
                                    key={project.id}
                                    href={`/project/${project.id}/kanban`}
                                >
                                    <Styles.ProjectHeader>
                                        <Styles.ProjectTitle>{project.title}</Styles.ProjectTitle>

                                        <Styles.RoleBadge $role={role}>
                                            {PROJECT_ROLE_LABEL[role]}
                                        </Styles.RoleBadge>
                                    </Styles.ProjectHeader>

                                    <Styles.ProjectDescription>
                                        {project.description || "Описание проекта не добавлено"}
                                    </Styles.ProjectDescription>
                                </Styles.ProjectCard>
                            );
                        })}
                    </Styles.Grid>
                )}
            </Styles.Section>

            <Styles.Section>
                <Styles.SectionHeader>
                    <div>
                        <Styles.SectionTitle>Приглашения в проекты</Styles.SectionTitle>
                        <Styles.SectionDescription>
                            Здесь отображаются проекты, в которые вас пригласили.
                        </Styles.SectionDescription>
                    </div>
                </Styles.SectionHeader>

                <Styles.List>
                    {incomingInvitations.length === 0 ? (
                        <Styles.EmptyState>Входящих приглашений пока нет</Styles.EmptyState>
                    ) : (
                        incomingInvitations.map((invitation) => {
                            const project = projectStore.getProjectById(
                                invitation.projectId
                            );

                            const fromUser = friendStore.getUserById(invitation.fromUserId);

                            return (
                                <Styles.InvitationCard key={invitation.id}>
                                    <Styles.InvitationContent>
                                        <Styles.ProjectTitle>
                                            {project?.title || "Проект"}
                                        </Styles.ProjectTitle>

                                        <Styles.ProjectDescription>
                                            {project?.description ||
                                                "Описание проекта не добавлено"}
                                        </Styles.ProjectDescription>

                                        <Styles.InvitationMeta>
                                            Пригласил:{" "}
                                            <span>
                                                {fromUser
                                                    ? `${fromUser.fullName} (@${fromUser.username})`
                                                    : "Пользователь"}
                                            </span>
                                        </Styles.InvitationMeta>

                                        <Styles.InvitationMeta>
                                            Роль:{" "}
                                            <span>{PROJECT_ROLE_LABEL[invitation.role]}</span>
                                        </Styles.InvitationMeta>
                                    </Styles.InvitationContent>

                                    <Styles.Actions>
                                        <Button
                                            size="sm"
                                            leftIcon={<CheckIcon />}
                                            disabled={projectMemberStore.isLoading}
                                            onClick={() => handleAcceptInvitation(invitation.id)}
                                        >
                                            Принять
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            leftIcon={<XIcon />}
                                            disabled={projectMemberStore.isLoading}
                                            onClick={() => handleRejectInvitation(invitation.id)}
                                        >
                                            Отклонить
                                        </Button>
                                    </Styles.Actions>
                                </Styles.InvitationCard>
                            );
                        })
                    )}
                </Styles.List>
            </Styles.Section>

        </Styles.Wrapper>
    );
});