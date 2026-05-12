import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ColorButton = styled.button<{
    $color: string;
    $active: boolean;
}>`
  width: 32px;
  height: 32px;

  border-radius: 999px;
  border: 2px solid
    ${({ theme, $active }) =>
        $active ? theme.colors.textPrimary : "transparent"};

  background: ${({ $color }) => $color};
  cursor: pointer;

  transition:
    transform 0.15s ease,
    border-color 0.15s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;