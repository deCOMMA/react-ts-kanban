"use client";

import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "lucide-react";

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

const hexToRgb = (hex: string) => {
    const value = hex.replace("#", "");

    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);

    return `rgb(${r} ${g} ${b})`;
};

const rgbToHex = (rgb: string) => {
    const match = rgb.match(/\d+/g);

    if (!match || match.length < 3) {
        return "#6b7280";
    }

    const [r, g, b] = match.map(Number);

    return `#${[r, g, b]
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("")}`;
};

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
    const colorInputRef = useRef<HTMLInputElement | null>(null);

    const [title, setTitle] = useState("");
    const [color, setColor] = useState(COLUMN_COLORS[0]);
    const [error, setError] = useState("");

    const isEdit = Boolean(column);
    const isCustomColor = !COLUMN_COLORS.includes(color);

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

                <Styles.ColorField>
                    <Styles.ColorLabel>Цвет колонки</Styles.ColorLabel>

                    <Styles.ColorGrid>
                        {COLUMN_COLORS.map((item) => (
                            <Styles.ColorButton
                                key={item}
                                type="button"
                                $color={item}
                                $active={item === color}
                                onClick={() => setColor(item)}
                                title={item}
                            />
                        ))}

                        <Styles.CustomColorButton
                            type="button"
                            $active={isCustomColor}
                            $color={color}
                            onClick={() => colorInputRef.current?.click()}
                            title="Выбрать свой цвет"
                        >
                            <PlusIcon size={18} />
                        </Styles.CustomColorButton>

                        <Styles.HiddenColorInput
                            ref={colorInputRef}
                            type="color"
                            value={rgbToHex(color)}
                            onChange={(event) => setColor(hexToRgb(event.target.value))}
                        />
                    </Styles.ColorGrid>

                    <Styles.SelectedColorText>
                        Выбранный цвет: <span>{color}</span>
                    </Styles.SelectedColorText>
                </Styles.ColorField>

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