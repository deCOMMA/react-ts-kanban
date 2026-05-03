"use client";

import * as Styles from "./Header.styles";
import Link from "next/link";
import { LogsIcon } from "lucide-react";
import { Button } from "@/src/shared/ui/Button";

export function Header() {
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
                    <Link href="/login">
                        <Button variant="outlined">Войти</Button>
                    </Link>

                    <Link href="/register">
                        <Button>Регистрация</Button>
                    </Link>
                </Styles.Actions>
            </Styles.HeaderInner>
        </Styles.HeaderWrapper>
    );
}