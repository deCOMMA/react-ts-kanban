"use client";

import { useEffect, useState } from "react";

import * as Styles from "./ColumnModal.styles";
import { Modal } from "@/src/shared/ui/Modal";
import { Input } from "@/src/shared/ui/Input";
import { Button } from "@/src/shared/ui/Button";
import type { Column } from "@/src/entities/column";

const COLUMN_COLORS = [
    "rgb(107 114 128)",
    "rgb(37 99 235)",
    "rgb(22 163 74)",
    "rgb(245 158 11)",
    "rgb(220 38 38)",
    "rgb(124 58 237)",
];

interface ColumnModalProps {
    isOpen: boolean;
    column?: Column | null;
    isLoading?: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; color: string }) => Promise<void> | void;
}

export function ColumnModal({
    isOpen,
    column,
    isLoading = false,
    onClose,
    onSubmit,
}: ColumnModalProps) {
    const [title, setTitle] = useState("");
    const [color, setColor] = useState(COLUMN_COLORS[0]);
    const [error, setError] = useState("");

    const isEdit = Boolean(column);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setTitle(column?.title || "");
        setColor(column?.color || COLUMN_COLORS[0]);
        setError("");
    }, [isOpen, column]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!title.trim()) {
            setError("Введите название колонки");
            return;
        }

        await onSubmit({
            title,
            color,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            title={isEdit ? "Редактирование колонки" : "Создание колонки"}
            description={
                isEdit
                    ? "Измените название и цвет колонки."
                    : "Добавьте новый этап работы на kanban-доску."
            }
            onClose={onClose}
        >
            <Styles.Form onSubmit={handleSubmit}>
                <Input
                    label="Название колонки"
                    placeholder="Например: Тестирование"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <div>
                    <Input label="Выбранный цвет" value={color} disabled />

                    <Styles.ColorGrid>
                        {COLUMN_COLORS.map((item) => (
                            <Styles.ColorButton
                                key={item}
                                type="button"
                                $color={item}
                                $active={item === color}
                                onClick={() => setColor(item)}
                            />
                        ))}
                    </Styles.ColorGrid>
                </div>

                {error && <Styles.ErrorText>{error}</Styles.ErrorText>}

                <Styles.Actions>
                    <Button type="button" variant="outlined" onClick={onClose}>
                        Отмена
                    </Button>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Сохраняем..." : isEdit ? "Сохранить" : "Создать"}
                    </Button>
                </Styles.Actions>
            </Styles.Form>
        </Modal>
    );
}