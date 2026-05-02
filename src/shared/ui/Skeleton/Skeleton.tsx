"use client";

import { StyledSkeleton } from "./Skeleton.styles";

interface SkeletonProps {
    width?: string;
    height?: string;
    radius?: string;
}

export function Skeleton({
    width = "100%",
    height = "16px",
    radius = "8px",
}: SkeletonProps) {
    return <StyledSkeleton $width={width} $height={height} $radius={radius} />;
}