"use client";

import { observer } from "mobx-react-lite";

import * as Styles from "./ProfileProjectsPage.styles";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

export const ProfileProjectsPage = observer(function ProfileProjectsPage() {
    const { projectStore } = useStore();

    if (projectStore.projects.length === 0) {
        return (
            <Styles.EmptyState>
                У вас пока нет проектов или вы не участвуете ни в одном проекте.
            </Styles.EmptyState>
        );
    }

    return (
        <Styles.Grid>
            {projectStore.projects.map((project) => (
                <Styles.ProjectCard
                    key={project.id}
                    href={`/project/${project.id}/kanban`}
                >
                    <Styles.ProjectTitle>{project.title}</Styles.ProjectTitle>

                    <Styles.ProjectDescription>
                        {project.description || "Описание проекта не добавлено"}
                    </Styles.ProjectDescription>
                </Styles.ProjectCard>
            ))}
        </Styles.Grid>
    );
});