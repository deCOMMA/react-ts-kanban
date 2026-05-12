import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.xl};

  background: rgb(17 24 39 / 0.45);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 480px;

  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: 0 20px 40px rgb(0 0 0 / 0.16);
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Description = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};

  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;