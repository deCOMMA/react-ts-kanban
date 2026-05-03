"use client";

import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import * as Styles from "./LoginPage.styles";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginPage() {

    const { authStore } = useStore();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("123")

        const success = await authStore.login(email, password);

        if (success) {
            router.push("/");
        }
    };

    return (
        <Styles.Page>
            <Styles.FormCard>
                <Styles.Header>
                    <Styles.Title>Вход в аккаунт</Styles.Title>
                    <Styles.Subtitle>
                        Введите данные, чтобы продолжить работу с досками.
                    </Styles.Subtitle>
                </Styles.Header>

                <Styles.Form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button fullWidth type="submit">
                        Войти
                    </Button>

                    {authStore.error && <div>{authStore.error}</div>}
                </Styles.Form>

                <Styles.Footer>
                    Нет аккаунта?{" "}
                    <Styles.StyledLink href="/register">
                        Зарегистрироваться
                    </Styles.StyledLink>
                </Styles.Footer>
            </Styles.FormCard>
        </Styles.Page>
    );
}