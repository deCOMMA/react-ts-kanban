"use client";

import type { HTMLAttributes, ReactNode } from "react";
import {
    StyledCard,
    Header,
    TitleBlock,
    Title,
    Description,
    Content,
} from "./Card.styles";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    actions?: ReactNode;
}

export function Card({ title, description, actions, children, ...props }: CardProps) {
    return (
        <StyledCard {...props}>
            {(title || description || actions) && (
                <Header>
                    <TitleBlock>
                        {title && <Title>{title}</Title>}
                        {description && <Description>{description}</Description>}
                    </TitleBlock>
                    {actions}
                </Header>
            )}

            <Content>{children}</Content>
        </StyledCard>
    );
}