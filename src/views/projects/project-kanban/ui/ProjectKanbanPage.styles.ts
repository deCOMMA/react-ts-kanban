import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 64px);
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const BoardPlaceholder = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};

  color: ${({ theme }) => theme.colors.textSecondary};
`;