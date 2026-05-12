import Link from "next/link";
import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Tabs = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  margin-bottom: ${({ theme }) => theme.spacing.xl};
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