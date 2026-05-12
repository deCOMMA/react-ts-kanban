"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import * as Styles from "./ProjectKanbanPage.styles";
import { useStore } from "@/src/app/providers/rootStore/StoreProviders";
import { DEFAULT_COLUMNS } from "@/src/entities/column";
import { KanbanBoard } from "@/src/widgets/KanbanBoard";

interface ProjectKanbanPageProps {
    projectId: string;
}

export const ProjectKanbanPage = observer(function ProjectKanbanPage({
    projectId,
}: ProjectKanbanPageProps) {
    const { boardStore, columnStore, taskStore } = useStore();

    useEffect(() => {
        const initBoard = async () => {
            await boardStore.fetchByProject(projectId);

            let board = boardStore.boards.find(
                (item) => item.projectId === projectId
            );

            if (!board) {
                board = await boardStore.create(projectId, {
                    title: "Основная доска",
                    projectId,
                    columns: [],
                });
            }

            if (!board) {
                return;
            }

            await columnStore.fetchByBoard(board.id);

            if (columnStore.columns.length === 0) {
                const sortedDefaultColumns = [...DEFAULT_COLUMNS].sort(
                    (a, b) => a.order - b.order
                );

                for (const column of sortedDefaultColumns) {
                    await columnStore.create(board.id, {
                        title: column.title,
                        color: column.color,
                    });
                }
                await columnStore.fetchByBoard(board.id);
            }
            console.log(columnStore.columns.length)

            await taskStore.fetchByBoard(board.id);
        };

        initBoard();
    }, [projectId, boardStore, columnStore, taskStore]);

    const board = boardStore.boards.find((item) => item.projectId === projectId);

    const isLoading =
        boardStore.isLoading || columnStore.isLoading || taskStore.isLoading;

    if (!board && isLoading) {
        return (
            <Styles.Wrapper>
                <Styles.BoardPlaceholder>Загрузка доски...</Styles.BoardPlaceholder>
            </Styles.Wrapper>
        );
    }

    if (!board) {
        return (
            <Styles.Wrapper>
                <Styles.BoardPlaceholder>
                    Доска проекта пока не найдена
                </Styles.BoardPlaceholder>
            </Styles.Wrapper>
        );
    }

    return (
        <Styles.Wrapper>
            <Styles.BoardHeader>
                <Styles.BoardTitle>{board.title || "Канбан-доска"}</Styles.BoardTitle>

                <Styles.BoardDescription>
                    Управляйте задачами проекта по этапам выполнения.
                </Styles.BoardDescription>
            </Styles.BoardHeader>

            {isLoading ? (
                <Styles.BoardPlaceholder>Загрузка доски...</Styles.BoardPlaceholder>
            ) : (
                <KanbanBoard
                    boardId={board.id}
                    columns={columnStore.sortedColumns}
                    getTasksByColumn={(columnId) => taskStore.byColumn(columnId)}
                    isColumnLoading={columnStore.isLoading}
                    onCreateColumn={async (data) => {
                        await columnStore.create(board.id, data);
                    }}
                    onUpdateColumn={async (columnId, data) => {
                        await columnStore.update(columnId, data);
                    }}
                    onDeleteColumn={async (columnId) => {
                        await columnStore.delete(columnId);
                    }}
                />
            )}
        </Styles.Wrapper>
    );
});