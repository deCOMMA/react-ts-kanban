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

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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

export const Section = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xxl};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FriendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FriendCard = styled(Link)`
  padding: ${({ theme }) => theme.spacing.md};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};

  color: inherit;
  text-decoration: none;

  transition:
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

export const FriendAvatar = styled.div<{ $src?: string | null }>`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;

  background: ${({ $src }) =>
        $src ? `url(${$src}) center / cover no-repeat` : "rgb(37 99 235 / 0.12)"};

  color: ${({ theme }) => theme.colors.primary};

  font-size: 15px;
  font-weight: 700;
`;

export const FriendInfo = styled.div`
  min-width: 0;
`;

export const FriendName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FriendUsername = styled.div`
  margin-top: 2px;
  font-size: 13px;
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