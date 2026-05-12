"use client";

import { observer } from "mobx-react-lite";

import * as Styles from "./ProjectInfoPage.styles";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

interface ProjectInfoPageProps {
    projectId: string;
}

export const ProjectInfoPage = observer(function ProjectInfoPage({
    projectId,
}: ProjectInfoPageProps) {
    const { projectStore } = useStore();

    const project = projectStore.projects.find((item) => item.id === projectId);

    return (
        <Styles.Card>
            <Styles.Title>Информация о проекте</Styles.Title>

            <Styles.Row>
                <Styles.Label>Название</Styles.Label>
                <Styles.Value>{project?.title || "—"}</Styles.Value>
            </Styles.Row>

            <Styles.Row>
                <Styles.Label>Описание</Styles.Label>
                <Styles.Value>{project?.description || "—"}</Styles.Value>
            </Styles.Row>

            <Styles.Row>
                <Styles.Label>Ключ проекта</Styles.Label>
                <Styles.Value>{project?.key || "—"}</Styles.Value>
            </Styles.Row>

            <Styles.Row>
                <Styles.Label>Участников</Styles.Label>
                <Styles.Value>{project?.members.length || 0}</Styles.Value>
            </Styles.Row>
        </Styles.Card>
    );
});