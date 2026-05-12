import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ColorField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ColorLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
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
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 0 0 3px rgb(0 0 0 / 0.06);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

export const CustomColorButton = styled.button<{
    $active: boolean;
    $color: string;
}>`
  width: 32px;
  height: 32px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  border: 2px solid
    ${({ theme, $active }) =>
        $active ? theme.colors.textPrimary : theme.colors.border};

  background: ${({ $active, $color, theme }) =>
        $active ? $color : theme.colors.surface};

  color: ${({ $active, theme }) =>
        $active ? "white" : theme.colors.textSecondary};

  cursor: pointer;

  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    background-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: scale(1.08);
    color: ${({ $active, theme }) => ($active ? "white" : theme.colors.primary)};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgb(0 0 0 / 0.06);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

export const HiddenColorInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

export const SelectedColorText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
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