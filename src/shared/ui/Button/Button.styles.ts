import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outlined";
export type ButtonSize = "sm" | "md" | "lg";

export const variantStyles = {
    primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: white;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:active:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryActive};
    }
  `,

    secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textPrimary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,

    danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: white;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.dangerHover};
    }
  `,

    outlined: css`
        background: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.border};

        &:hover:not(:disabled) {
            background: rgb(37 99 235 / 0.08);
            border-color: ${({ theme }) => theme.colors.primary};
        }

        &:active:not(:disabled) {
            background: rgb(37 99 235 / 0.16);
        }
`,
};

export const sizeStyles = {
    sm: css`
    height: 32px;
    padding: 0 12px;
    font-size: 13px;
  `,

    md: css`
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  `,

    lg: css`
    height: 48px;
    padding: 0 20px;
    font-size: 15px;
  `,
};

export const StyledButton = styled.button<{
    $variant: ButtonVariant;
    $size: ButtonSize;
    $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;

  border: none;

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;