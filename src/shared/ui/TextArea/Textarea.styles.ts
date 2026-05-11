import styled from "styled-components";

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StyledTextarea = styled.textarea<{ $hasError: boolean }>`
  min-height: 120px;
  padding: 12px;

  resize: vertical;

  border: 1px solid
    ${({ theme, $hasError }) =>
        $hasError ? theme.colors.danger : theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 14px;
  line-height: 1.5;
  outline: none;
  transition: 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
        $hasError ? theme.colors.danger : theme.colors.primary};

    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? "rgb(220 38 38 / 0.18)" : theme.colors.focus};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
`;