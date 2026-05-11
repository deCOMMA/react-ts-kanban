"use client";

import type { TextareaHTMLAttributes } from "react";
import * as Styles from "./Textarea.styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, error, ...props }: TextareaProps) {
    return (
        <Styles.Field>
            {label && <Styles.Label>{label}</Styles.Label>}

            <Styles.StyledTextarea $hasError={Boolean(error)} {...props} />

            {error && <Styles.ErrorText>{error}</Styles.ErrorText>}
        </Styles.Field>
    );
}