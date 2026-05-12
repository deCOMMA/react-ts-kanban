import styled from "styled-components";

export const Card = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 22px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 500;
`;