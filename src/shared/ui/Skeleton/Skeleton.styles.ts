import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }

  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const StyledSkeleton = styled.div<{
    $width: string;
    $height: string;
    $radius: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ $radius }) => $radius};

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeleton} 0px,
    ${({ theme }) => theme.colors.skeletonHighlight} 40px,
    ${({ theme }) => theme.colors.skeleton} 80px
  );

  background-size: 200px 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;