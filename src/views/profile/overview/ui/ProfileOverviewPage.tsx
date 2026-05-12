"use client";

import * as Styles from "./ProfileOverviewPage.styles";

export function ProfileOverviewPage() {
    return (
        <Styles.Grid>
            <Styles.Section>
                <Styles.SectionTitle>Недавняя активность</Styles.SectionTitle>
                <Styles.MutedText>
                    Активность появится здесь после добавления системы событий.
                </Styles.MutedText>
            </Styles.Section>

            <Styles.Section>
                <Styles.SectionTitle>Быстрые действия</Styles.SectionTitle>
                <Styles.MutedText>
                    Позже здесь можно добавить создание проекта, переход к задачам и
                    приглашение друзей.
                </Styles.MutedText>
            </Styles.Section>
        </Styles.Grid>
    );
}