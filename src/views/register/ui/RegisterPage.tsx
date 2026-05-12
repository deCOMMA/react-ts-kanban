"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";
import * as Styles from "@/src/views/login/ui/LoginPage.styles";

export function RegisterPage() {
    const { authStore } = useStore();
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!fullName.trim()) {
            setFormError("Введите имя");
            return;
        }

        if (!email.trim() || !email.includes("@")) {
            setFormError("Введите корректную почту");
            return;
        }

        if (password.length < 6) {
            setFormError("Пароль должен быть минимум 6 символов");
            return;
        }

        if (password !== repeatPassword) {
            setFormError("Пароли не совпадают");
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

        const success = await authStore.register(
            fullName,
            username,
            email,
            password
        );

        if (success) {
            router.push("/login");
        }
    };

    return (
        <Styles.Page>
            <Styles.FormCard>
                <Styles.Header>
                    <Styles.Title>Создание аккаунта</Styles.Title>
                    <Styles.Subtitle>
                        Зарегистрируйтесь, чтобы создавать проекты и kanban-доски.
                    </Styles.Subtitle>
                </Styles.Header>

                <Styles.Form onSubmit={handleSubmit}>
                    <Input
                        label="Имя"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Введите имя"
                    />
                    <Input
                        label="Ник"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Например: decomma9"
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                    />
                    <Input
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Минимум 6 символов"
                    />
                    <Input
                        label="Повторите пароль"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        placeholder="Повторите пароль"
                    />

                    {(formError || authStore.error) && (
                        <Styles.ErrorText>{formError || authStore.error}</Styles.ErrorText>
                    )}

                    <Button fullWidth type="submit" disabled={authStore.isLoading}>
                        {authStore.isLoading ? "Создаём аккаунт..." : "Зарегистрироваться"}
                    </Button>
                </Styles.Form>

                <Styles.Footer>
                    Уже есть аккаунт?{" "}
                    <Styles.StyledLink href="/login">Войти</Styles.StyledLink>
                </Styles.Footer>
            </Styles.FormCard>
        </Styles.Page>
    );
}