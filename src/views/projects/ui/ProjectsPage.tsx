"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { PlusIcon } from "lucide-react";

import * as Styles from "./ProjectsPage.styles";
import { Button } from "@/src/shared/ui/Button";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { useRouter } from "next/navigation";
import { PROJECT_ROLE_LABEL } from "@/src/entities/project-member";

export const ProjectsPage = observer(function ProjectsPage() {

    const { authStore, projectStore, projectMemberStore } = useStore();
    useEffect(() => {
        if (!authStore.user?.id) {
            return;
        }

        projectStore.fetchProjects(authStore.user.id);
        projectMemberStore.fetchAll();
    }, [authStore.user?.id, projectStore, projectMemberStore]);

    const router = useRouter();

    const handleCreateProject = () => {
        router.push("/project/new");
    };

    return (
        <Styles.Page>
            <Styles.Container>
                <Styles.Header>
                    <Styles.TitleBlock>
                        <Styles.Title>Проекты</Styles.Title>
                        <Styles.Subtitle>
                            Управляйте рабочими пространствами, досками и задачами.
                        </Styles.Subtitle>
                    </Styles.TitleBlock>

                    <Button leftIcon={<PlusIcon />} onClick={handleCreateProject}>
                        Создать проект
                    </Button>
                </Styles.Header>

                {projectStore.error && (
                    <Styles.ErrorText>{projectStore.error}</Styles.ErrorText>
                )}

                {projectStore.isLoading ? (
                    <Styles.EmptyState>Загрузка проектов...</Styles.EmptyState>
                ) : projectStore.projects.length > 0 ? (
                    <Styles.Grid>
                        {projectStore.projects.map((project) => {
                            const role = authStore.user
                                ? projectMemberStore.getUserProjectRole(project.id, authStore.user.id)
                                : null;

                            return (
                                <Styles.ProjectCard key={project.id} href={`/project/${project.id}/kanban`}>
                                    <Styles.ProjectHeader>
                                        <Styles.ProjectTitle>{project.title}</Styles.ProjectTitle>

                                        <Styles.RoleBadge $role={role || "member"}>
                                            {role ? PROJECT_ROLE_LABEL[role] : "Участник"}
                                        </Styles.RoleBadge>
                                    </Styles.ProjectHeader>

                                    <Styles.ProjectDescription>
                                        {project.description || "Описание проекта не добавлено"}
                                    </Styles.ProjectDescription>
                                </Styles.ProjectCard>
                            );
                        })}
                    </Styles.Grid>
                ) : (
                    <Styles.EmptyState>
                        У вас пока нет проектов. Создайте первый проект, чтобы начать работу.
                    </Styles.EmptyState>
                )}
            </Styles.Container>
        </Styles.Page>
    );
});