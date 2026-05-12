"use client";

import { useEffect } from "react";
import * as Styles from "./Modal.styles";

interface ModalProps {
    isOpen: boolean;
    title: string;
    description?: string;
    children: React.ReactNode;
    onClose: () => void;
}

export function Modal({
    isOpen,
    title,
    description,
    children,
    onClose,
}: ModalProps) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <Styles.Overlay onMouseDown={onClose}>
            <Styles.Content onMouseDown={(event) => event.stopPropagation()}>
                <Styles.Header>
                    <Styles.Title>{title}</Styles.Title>

                    {description && (
                        <Styles.Description>{description}</Styles.Description>
                    )}
                </Styles.Header>

                {children}
            </Styles.Content>
        </Styles.Overlay>
    );
}