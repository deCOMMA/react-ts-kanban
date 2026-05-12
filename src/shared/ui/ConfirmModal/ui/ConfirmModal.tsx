"use client";

import { Modal } from "@/src/shared/ui/Modal";
import { Button } from "@/src/shared/ui/Button";
import * as Styles from "./ConfirmModal.styles";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    confirmDisabled?: boolean;
    onConfirm: () => Promise<void> | void;
    onClose: () => void;
}

export function ConfirmModal({
    isOpen,
    title,
    description,
    confirmText = "Подтвердить",
    cancelText = "Отмена",
    isLoading = false,
    confirmDisabled = false,
    onConfirm,
    onClose,
}: ConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} title={title} onClose={onClose}>
            <Styles.Text>{description}</Styles.Text>

            <Styles.Actions>
                <Button type="button" variant="outlined" onClick={onClose}>
                    {cancelText}
                </Button>

                <Button
                    type="button"
                    variant="danger"
                    disabled={isLoading || confirmDisabled}
                    onClick={onConfirm}
                >
                    {isLoading ? "Удаляем..." : confirmText}
                </Button>
            </Styles.Actions>
        </Modal>
    );
}