"use client";

import { Flex } from "../Flex";
import type { HTMLAttributes } from "react";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
    gap?: string;
}

export function Stack({ gap, children, ...props }: StackProps) {
    return (
        <Flex direction="column" gap={gap} {...props}>
            {children}
        </Flex>
    );
}