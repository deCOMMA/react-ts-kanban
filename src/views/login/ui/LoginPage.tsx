"use client";

import * as Styles from "./LoginPage.styles";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";

export function LoginPage() {
    return (
        <Styles.Page>
            <Styles.FormCard>
                <Styles.Header>
                    <Styles.Title>Вход в аккаунт</Styles.Title>
                    <Styles.Subtitle>
                        Введите данные, чтобы продолжить работу с досками.
                    </Styles.Subtitle>
                </Styles.Header>

                <Styles.Form>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="example@mail.com"
                    />

                    <Input
                        label="Пароль"
                        type="password"
                        placeholder="Введите пароль"
                    />

                    <Button fullWidth>Войти</Button>
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