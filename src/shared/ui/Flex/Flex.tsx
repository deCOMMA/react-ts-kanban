// src/shared/ui/Flex/Flex.tsx

"use client";

import type { HTMLAttributes } from "react";
import { StyledFlex } from "./Flex.styles";

type Align = "flex-start" | "center" | "flex-end" | "stretch";
type Justify =
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column";
    align?: Align;
    justify?: Justify;
    gap?: string;
    wrap?: "wrap" | "nowrap";
}

export function Flex({
    direction,
    align,
    justify,
    gap,
    wrap,
    children,
    ...props
}: FlexProps) {
    return (
        <StyledFlex
            $direction={direction}
            $align={align}
            $justify={justify}
            $gap={gap}
            $wrap={wrap}
            {...props}
        >
            {children}
        </StyledFlex>
    );
}