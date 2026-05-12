"use client";

import { useState } from "react";
import { MoreVerticalIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

import type { Column } from "@/src/entities/column";
import type { Task } from "@/src/entities/task";
import { TASK_PRIORITY_LABEL } from "@/src/entities/task";
import { Button } from "@/src/shared/ui/Button";

import { ColumnModal } from "./ColumnModal/ColumnModal";
import * as Styles from "./KanbanBoard.styles";

interface KanbanBoardProps {
    boardId: string;
    columns: Column[];
    getTasksByColumn: (columnId: string) => Task[];
    onCreateColumn: (data: { title: string; color: string }) => Promise<void>;
    onUpdateColumn: (
        columnId: string,
        data: { title: string; color: string }
    ) => Promise<void>;
    onDeleteColumn: (columnId: string) => Promise<void>;
    isColumnLoading?: boolean;
}

export function KanbanBoard({
    boardId,
    columns,
    getTasksByColumn,
    onCreateColumn,
    onUpdateColumn,
    onDeleteColumn,
    isColumnLoading = false,
}: KanbanBoardProps) {
    const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
    const [editableColumn, setEditableColumn] = useState<Column | null>(null);

    const handleOpenCreateColumn = () => {
        setEditableColumn(null);
        setIsColumnModalOpen(true);
    };

    const handleOpenEditColumn = (column: Column) => {
        setEditableColumn(column);
        setIsColumnModalOpen(true);
    };

    const handleCloseColumnModal = () => {
        setEditableColumn(null);
        setIsColumnModalOpen(false);
    };

    const handleSubmitColumn = async (data: { title: string; color: string }) => {
        if (editableColumn) {
            await onUpdateColumn(editableColumn.id, data);
        } else {
            await onCreateColumn(data);
        }

        handleCloseColumnModal();
    };

    const handleDeleteColumn = async (column: Column) => {
        const tasks = getTasksByColumn(column.id);

        if (tasks.length > 0) {
            alert("Нельзя удалить колонку, в которой есть задачи");
            return;
        }

        const confirmed = window.confirm(
            `Удалить колонку "${column.title}"? Это действие нельзя отменить.`
        );

        if (!confirmed) {
            return;
        }

        await onDeleteColumn(column.id);
    };

    return (
        <>
            <Styles.Board>
                {columns.map((column) => {
                    const tasks = getTasksByColumn(column.id);

                    return (
                        <Styles.Column key={column.id}>
                            <Styles.ColumnHeader>
                                <Styles.ColumnTitleWrapper>
                                    <Styles.ColumnColor $color={column.color} />
                                    <Styles.ColumnTitle>{column.title}</Styles.ColumnTitle>
                                </Styles.ColumnTitleWrapper>

                                <Styles.ColumnActions>
                                    <Styles.TaskCount>{tasks.length}</Styles.TaskCount>

                                    <Styles.ColumnActionButton
                                        type="button"
                                        onClick={() => handleOpenEditColumn(column)}
                                        title="Редактировать колонку"
                                    >
                                        <PencilIcon size={16} />
                                    </Styles.ColumnActionButton>

                                    <Styles.ColumnActionButton
                                        type="button"
                                        onClick={() => handleDeleteColumn(column)}
                                        title="Удалить колонку"
                                    >
                                        <Trash2Icon size={16} />
                                    </Styles.ColumnActionButton>
                                </Styles.ColumnActions>
                            </Styles.ColumnHeader>

                            <Styles.TaskList>
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <Styles.TaskCard key={task.id}>
                                            <Styles.TaskTitle>{task.title}</Styles.TaskTitle>

                                            {task.description && (
                                                <Styles.TaskDescription>
                                                    {task.description}
                                                </Styles.TaskDescription>
                                            )}

                                            <Styles.TaskFooter>
                                                <Styles.Priority>
                                                    {TASK_PRIORITY_LABEL[task.priority]}
                                                </Styles.Priority>

                                                <Styles.Assignee>
                                                    {task.assignee?.fullName || "Без исполнителя"}
                                                </Styles.Assignee>
                                            </Styles.TaskFooter>
                                        </Styles.TaskCard>
                                    ))
                                ) : (
                                    <Styles.EmptyColumn>Нет задач</Styles.EmptyColumn>
                                )}
                            </Styles.TaskList>
                        </Styles.Column>
                    );
                })}

                <Styles.AddColumnCard>
                    <Button
                        variant="outlined"
                        leftIcon={<PlusIcon />}
                        onClick={handleOpenCreateColumn}
                    >
                        Добавить колонку
                    </Button>
                </Styles.AddColumnCard>
            </Styles.Board>

            <ColumnModal
                isOpen={isColumnModalOpen}
                column={editableColumn}
                isLoading={isColumnLoading}
                onClose={handleCloseColumnModal}
                onSubmit={handleSubmitColumn}
            />
        </>
    );
}