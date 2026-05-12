import styled from "styled-components";

export const Wrapper = styled.div``;

export const BoardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BoardTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const BoardDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const BoardPlaceholder = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};

  color: ${({ theme }) => theme.colors.textSecondary};
`;

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