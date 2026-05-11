"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { PlusIcon } from "lucide-react";

import * as Styles from "./ProjectsPage.styles";
import { Button } from "@/src/shared/ui/Button";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { useRouter } from "next/navigation";

export const ProjectsPage = observer(function ProjectsPage() {
    const { authStore, projectStore } = useStore();
    useEffect(() => {
        if (!authStore.user?.id) {
            return;
        }

        projectStore.fetchProjects(authStore.user.id);
    }, [authStore.user?.id, projectStore]);

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
                        {projectStore.projects.map((project) => (
                            <Styles.ProjectCard
                                key={project.id}
                                href={`/project/${project.id}/kanban`}
                            >
                                <Styles.ProjectTitle>{project.title}</Styles.ProjectTitle>

                                <Styles.ProjectDescription>
                                    {project.description || "Описание проекта пока не добавлено"}
                                </Styles.ProjectDescription>
                            </Styles.ProjectCard>
                        ))}
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