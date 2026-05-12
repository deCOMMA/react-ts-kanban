import Link from "next/link";
import styled from "styled-components";
import type { ProjectRole } from "@/src/entities/project-member";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Description = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xs};

  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SearchWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const UserCard = styled.article`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.md};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 640px) {
    grid-template-columns: auto 1fr;
  }
`;

export const Avatar = styled.div<{ $src?: string | null }>`
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;

  background: ${({ $src }) =>
        $src ? `url(${$src}) center / cover no-repeat` : "rgb(37 99 235 / 0.12)"};

  color: ${({ theme }) => theme.colors.primary};

  font-size: 16px;
  font-weight: 700;
`;

export const UserLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Username = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 640px) {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
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

export const StatusText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ErrorText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;