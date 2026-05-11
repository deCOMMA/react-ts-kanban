"use client";

import { observer } from "mobx-react-lite";
import { LogsIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import * as Styles from "./Header.styles";
import { Button } from "@/src/shared/ui/Button";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

export const Header = observer(function Header() {
    const { authStore } = useStore();
    const router = useRouter();

    const handleLogout = () => {
        authStore.logout();
        router.push("/login");
    };

    return (
        <Styles.HeaderWrapper>
            <Styles.HeaderInner>
                <Styles.LogoLink href="/">
                    <Styles.LogoIcon>
                        <LogsIcon size={20} />
                    </Styles.LogoIcon>

                    <Styles.LogoText>TaskFlow</Styles.LogoText>
                </Styles.LogoLink>

                <Styles.Actions>
                    {authStore.isAuth ? (
                        <>
                            <Styles.NavLink href="/project">Проекты</Styles.NavLink>

                            <Styles.UserInfo>
                                <UserIcon size={18} />
                                <Styles.UserName>{authStore.user?.fullName}</Styles.UserName>
                            </Styles.UserInfo>

                            <Button
                                variant="outlined"
                                leftIcon={<LogOutIcon />}
                                onClick={handleLogout}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <Styles.AuthLink href="/login">
                                <Button variant="outlined">Войти</Button>
                            </Styles.AuthLink>

                            <Styles.AuthLink href="/register">
                                <Button>Регистрация</Button>
                            </Styles.AuthLink>
                        </>
                    )}
                </Styles.Actions>
            </Styles.HeaderInner>
        </Styles.HeaderWrapper>
    );
});