import Link from "next/link";
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled(Link)`
  padding: ${({ theme }) => theme.spacing.xl};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};

  color: inherit;
  text-decoration: none;

  transition:
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ProjectDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyState = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};

  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;