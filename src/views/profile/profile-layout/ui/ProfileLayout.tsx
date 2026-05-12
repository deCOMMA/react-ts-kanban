"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { EditIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import * as Styles from "./ProfileLayout.styles";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";
import { Textarea } from "@/src/shared/ui/TextArea";
import { Modal } from "@/src/shared/ui/Modal";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export const ProfileLayout = observer(function ProfileLayout({
    children,
}: ProfileLayoutProps) {
    const pathname = usePathname();
    const { authStore, projectStore, friendStore, projectMemberStore } = useStore();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [bio, setBio] = useState("");
    const [formError, setFormError] = useState("");

    const user = authStore.user;

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        projectStore.fetchProjects(user.id);

        if (friendStore) {
            friendStore.fetchAll();
        }
    }, [user?.id, projectStore, friendStore]);

    const userProjects = projectStore.projects.filter((project) => {
        const isOwner = project.owner === user?.id;

        const isAcceptedMember = projectMemberStore.isProjectMember(
            project.id,
            user!.id,
        );

        return isOwner || isAcceptedMember;
    });

    const handleOpenEdit = () => {
        if (!user) {
            return;
        }

        setFullName(user.fullName);
        setUsername(user.username || "");
        setAvatarUrl(user.avatarUrl || "");
        setBio(user.bio || "");
        setFormError("");
        setIsEditOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setFormError("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setFormError("");

        if (!fullName.trim()) {
            setFormError("Введите имя");
            return;
        }

        if (!username.trim()) {
            setFormError("Введите ник");
            return;
        }

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
            setFormError(
                "Ник должен быть от 3 до 20 символов и содержать только латиницу, цифры или _"
            );
            return;
        }

        const success = await authStore.updateProfile({
            fullName,
            username,
            avatarUrl,
            bio,
        });

        if (success) {
            handleCloseEdit();
        }
    };

    if (!user) {
        return null;
    }

    const avatarLetter = user.fullName.slice(0, 1).toUpperCase();
    const friendsCount = friendStore ? friendStore.getFriends(user.id).length : 0;

    return (
        <Styles.Page>
            <Styles.Container>
                <Styles.ProfileCard>
                    <Styles.Avatar $src={user.avatarUrl}>
                        {!user.avatarUrl && avatarLetter}
                    </Styles.Avatar>

                    <Styles.UserInfo>
                        <Styles.FullName>{user.fullName}</Styles.FullName>
                        <Styles.Username>@{user.username || "username"}</Styles.Username>
                        <Styles.Email>{user.email}</Styles.Email>

                        <Styles.Bio>
                            {user.bio || "Описание профиля пока не добавлено."}
                        </Styles.Bio>
                    </Styles.UserInfo>

                    <Button
                        variant="outlined"
                        leftIcon={<EditIcon />}
                        onClick={handleOpenEdit}
                    >
                        Редактировать
                    </Button>
                </Styles.ProfileCard>

                <Styles.StatsGrid>
                    <Styles.StatCard>
                        <Styles.StatValue>{userProjects.length}</Styles.StatValue>
                        <Styles.StatLabel>Проектов</Styles.StatLabel>
                    </Styles.StatCard>

                    <Styles.StatCard>
                        <Styles.StatValue>{friendsCount}</Styles.StatValue>
                        <Styles.StatLabel>Друзей</Styles.StatLabel>
                    </Styles.StatCard>

                    <Styles.StatCard>
                        <Styles.StatValue>0</Styles.StatValue>
                        <Styles.StatLabel>Активностей</Styles.StatLabel>
                    </Styles.StatCard>
                </Styles.StatsGrid>

                <Styles.Tabs>
                    <Styles.TabLink href="/profile" $active={pathname === "/profile"}>
                        Обзор
                    </Styles.TabLink>

                    <Styles.TabLink
                        href="/profile/projects"
                        $active={pathname === "/profile/projects"}
                    >
                        Проекты
                    </Styles.TabLink>

                    <Styles.TabLink
                        href="/profile/friends"
                        $active={pathname === "/profile/friends"}
                    >
                        Друзья
                    </Styles.TabLink>

                    <Styles.TabLink
                        href="/profile/activity"
                        $active={pathname === "/profile/activity"}
                    >
                        Активность
                    </Styles.TabLink>
                </Styles.Tabs>

                <Styles.Content>{children}</Styles.Content>
            </Styles.Container>

            <Modal
                isOpen={isEditOpen}
                title="Редактирование профиля"
                description="Измените имя, ник, аватар и описание профиля."
                onClose={handleCloseEdit}
            >
                <Styles.Form onSubmit={handleSubmit}>
                    <Input
                        label="Имя"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Введите имя"
                    />

                    <Input
                        label="Ник"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Например: decomma9"
                    />

                    <Input
                        label="Ссылка на аватар"
                        value={avatarUrl}
                        onChange={(event) => setAvatarUrl(event.target.value)}
                        placeholder="https://..."
                    />

                    <Textarea
                        label="Описание"
                        value={bio}
                        onChange={(event) => setBio(event.target.value)}
                        placeholder="Расскажите немного о себе"
                    />

                    {(formError || authStore.error) && (
                        <Styles.ErrorText>{formError || authStore.error}</Styles.ErrorText>
                    )}

                    <Styles.Actions>
                        <Button type="button" variant="outlined" onClick={handleCloseEdit}>
                            Отмена
                        </Button>

                        <Button type="submit" disabled={authStore.isLoading}>
                            {authStore.isLoading ? "Сохраняем..." : "Сохранить"}
                        </Button>
                    </Styles.Actions>
                </Styles.Form>
            </Modal>
        </Styles.Page>
    );
});