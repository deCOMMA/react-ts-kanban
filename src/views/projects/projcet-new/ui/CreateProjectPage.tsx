"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

import * as Styles from "./CreateProjectPage.styles";
import { Input } from "@/src/shared/ui/Input";
import { Textarea } from "@/src/shared/ui/TextArea";
import { Button } from "@/src/shared/ui/Button";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

export const CreateProjectPage = observer(function CreateProjectPage() {
    const router = useRouter();
    const { authStore, projectStore, projectMemberStore } = useStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [formError, setFormError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFormError("");

        if (!authStore.user) {
            setFormError("Пользователь не авторизован");
            return;
        }

        if (!title.trim()) {
            setFormError("Введите название проекта");
            return;
        }

        if (!description.trim()) {
            setFormError("Введите описание проекта");
            return;
        }

        const project = await projectStore.createProject(
            authStore.user,
            title,
            description
        );

        if (project) {
            await projectMemberStore.createOwnerMember(project.id, authStore.user.id);

            router.push(`/project/${project.id}/kanban`);
        }
    };

    return (
        <Styles.Page>
            <Styles.Container>
                <Styles.Header>
                    <Styles.Title>Создание проекта</Styles.Title>
                    <Styles.Subtitle>
                        Укажите базовую информацию о проекте. После создания вы перейдёте к
                        kanban-доске.
                    </Styles.Subtitle>
                </Styles.Header>

                <Styles.FormCard>
                    <Styles.Form onSubmit={handleSubmit}>
                        <Input
                            label="Название проекта"
                            placeholder="Например: Дипломная работа"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Textarea
                            label="Описание проекта"
                            placeholder="Кратко опишите назначение проекта"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {(formError || projectStore.error) && (
                            <Styles.ErrorText>
                                {formError || projectStore.error}
                            </Styles.ErrorText>
                        )}

                        <Styles.Actions>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => router.push("/projects")}
                            >
                                Отмена
                            </Button>

                            <Button type="submit" disabled={projectStore.isLoading}>
                                {projectStore.isLoading ? "Создаём..." : "Создать проект"}
                            </Button>
                        </Styles.Actions>
                    </Styles.Form>
                </Styles.FormCard>
            </Styles.Container>
        </Styles.Page>
    );
});