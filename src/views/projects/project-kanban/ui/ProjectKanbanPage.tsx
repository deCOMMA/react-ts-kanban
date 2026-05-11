"use client";

import { rootStore } from "@/src/app/providers/rootStore/rootStore";
import * as Styles from "./ProjectKanbanPage.styles";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { useEffect } from "react";

interface ProjectKanbanPageProps {
    projectId: string;
}

export function ProjectKanbanPage({ projectId }: ProjectKanbanPageProps) {

    const { authStore, projectStore } = useStore();
    useEffect(() => {
        if (!authStore.user?.id) {
            return;
        }

        projectStore.fetchProjects(authStore.user.id);
    }, [authStore.user?.id, projectStore]);
    const project = projectStore.projects.find((item) => item.id == projectId)

    return (
        <Styles.Page>
            <Styles.Container>
                <Styles.Title>Kanban-доска</Styles.Title>
                <Styles.Subtitle>Проект ID: {project?.title}</Styles.Subtitle>

                <Styles.BoardPlaceholder>
                    Здесь позже будет kanban-доска проекта: колонки, задачи и drag-and-drop.
                </Styles.BoardPlaceholder>
            </Styles.Container>
        </Styles.Page>
    );
}