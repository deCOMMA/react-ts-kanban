import styled from "styled-components";

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const MutedText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;