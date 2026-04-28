import styled from "styled-components";

export const StyledFlex = styled.div<{
    $direction?: string;
    $align?: string;
    $justify?: string;
    $gap?: string;
    $wrap?: string;
}>`
  display: flex;

  flex-direction: ${({ $direction }) => $direction || "row"};
  align-items: ${({ $align }) => $align || "stretch"};
  justify-content: ${({ $justify }) => $justify || "flex-start"};
  gap: ${({ $gap }) => $gap || "0"};
  flex-wrap: ${({ $wrap }) => $wrap || "nowrap"};
`;