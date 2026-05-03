"use client";

import * as Styles from "@/src/views/login/ui/LoginPage.styles";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";

export function RegisterPage() {
    return (
        <Styles.Page>
            <Styles.FormCard>
                <Styles.Header>
                    <Styles.Title>Создание аккаунта</Styles.Title>
                    <Styles.Subtitle>
                        Зарегистрируйтесь, чтобы создавать проекты и kanban-доски.
                    </Styles.Subtitle>
                </Styles.Header>
                <Styles.Form>
                    <Input
                        label="Имя"
                        type="text"
                        placeholder="Введите имя"
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="example@mail.com"
                    />
                    <Input
                        label="Пароль"
                        type="password"
                        placeholder="Минимум 6 символов"
                    />
                    <Input
                        label="Повторите пароль"
                        type="password"
                        placeholder="Повторите пароль"
                    />
                    <Button fullWidth>Зарегистрироваться</Button>
                </Styles.Form>
                <Styles.Footer>
                    Уже есть аккаунт?{" "}
                    <Styles.StyledLink href="/login">
                        Войти
                    </Styles.StyledLink>
                </Styles.Footer>
            </Styles.FormCard>
        </Styles.Page>
    );
}