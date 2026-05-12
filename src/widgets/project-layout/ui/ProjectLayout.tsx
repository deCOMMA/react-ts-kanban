"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";

import * as Styles from "./ProjectLayout.styles";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

interface ProjectLayoutProps {
    projectId: string;
    children: React.ReactNode;
}

export const ProjectLayout = observer(function ProjectLayout({
    projectId,
    children,
}: ProjectLayoutProps) {
    const pathname = usePathname();
    const { authStore, projectStore } = useStore();

    useEffect(() => {
        if (!authStore.user?.id) {
            return;
        }

        projectStore.fetchProjects(authStore.user.id);
    }, [authStore.user?.id, projectStore]);

    const project = projectStore.projects.find((item) => item.id === projectId);

    return (
        <Styles.Page>
            <Styles.Container>
                <Styles.Header>
                    <Styles.TitleBlock>
                        <Styles.Title>{project?.title || "Проект"}</Styles.Title>

                        <Styles.Subtitle>
                            {project?.description || "Рабочее пространство проекта"}
                        </Styles.Subtitle>
                    </Styles.TitleBlock>
                </Styles.Header>

                <Styles.Tabs>
                    <Styles.TabLink
                        href={`/project/${projectId}/kanban`}
                        $active={pathname === `/project/${projectId}/kanban`}
                    >
                        Канбан
                    </Styles.TabLink>

                    <Styles.TabLink
                        href={`/project/${projectId}/info`}
                        $active={pathname === `/project/${projectId}/info`}
                    >
                        Информация
                    </Styles.TabLink>
                    <Styles.TabLink
                        href={`/project/${projectId}/users`}
                        $active={pathname === `/project/${projectId}/users`}
                    >
                        Участники
                    </Styles.TabLink>
                </Styles.Tabs>

                <Styles.Content>{children}</Styles.Content>
            </Styles.Container>
        </Styles.Page>
    );
});