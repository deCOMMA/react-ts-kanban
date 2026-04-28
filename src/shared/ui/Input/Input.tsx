"use client";

import type { InputHTMLAttributes } from "react";
import { Field, Label, StyledInput, ErrorText } from "./Input.styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
    return (
        <Field>
            {label && <Label>{label}</Label>}
            <StyledInput $hasError={Boolean(error)} {...props} />
            {error && <ErrorText>{error}</ErrorText>}
        </Field>
    );
}