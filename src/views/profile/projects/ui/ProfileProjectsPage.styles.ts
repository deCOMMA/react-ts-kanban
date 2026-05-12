import Link from "next/link";
import styled from "styled-components";
import type { ProjectRole } from "@/src/entities/project-member";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SectionDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};

  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

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

export const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
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

export const RoleBadge = styled.span<{ $role: ProjectRole }>`
  flex-shrink: 0;

  padding: 4px 8px;
  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  color: ${({ $role }) => {
        if ($role === "owner") return "rgb(37 99 235)";
        if ($role === "admin") return "rgb(124 58 237)";
        if ($role === "member") return "rgb(22 163 74)";
        return "rgb(107 114 128)";
    }};

  background: ${({ $role }) => {
        if ($role === "owner") return "rgb(37 99 235 / 0.1)";
        if ($role === "admin") return "rgb(124 58 237 / 0.1)";
        if ($role === "member") return "rgb(22 163 74 / 0.1)";
        return "rgb(107 114 128 / 0.1)";
    }};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const InvitationCard = styled.article`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  padding: ${({ theme }) => theme.spacing.lg};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const InvitationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InvitationMeta = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const EmptyState = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};

  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;