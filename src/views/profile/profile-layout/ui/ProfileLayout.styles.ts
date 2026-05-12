import Link from "next/link";
import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 64px);
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const ProfileCard = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};

  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
  }
`;

export const Avatar = styled.div<{ $src?: string | null }>`
  width: 96px;
  height: 96px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;

  background: ${({ $src }) =>
        $src ? `url(${$src}) center / cover no-repeat` : "rgb(37 99 235 / 0.12)"};

  color: ${({ theme }) => theme.colors.primary};

  font-size: 32px;
  font-weight: 700;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const FullName = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Username = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Email = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Bio = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  max-width: 620px;

  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatsGrid = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StatLabel = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Tabs = styled.nav`
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TabLink = styled(Link) <{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  color: ${({ theme, $active }) =>
        $active ? theme.colors.primary : theme.colors.textSecondary};

  border-bottom: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};

  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgb(37 99 235 / 0.06);
  }
`;

export const Content = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;