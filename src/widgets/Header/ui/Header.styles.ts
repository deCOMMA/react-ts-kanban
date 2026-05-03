import Link from "next/link";
import styled from "styled-components";

export const HeaderWrapper = styled.header`
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

export const HeaderInner = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;
`;

export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.md};

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(37 99 235 / 0.1);
  color: ${({ theme }) => theme.colors.primary};
`;

export const LogoText = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

export const Actions = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;