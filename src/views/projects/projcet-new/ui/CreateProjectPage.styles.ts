import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 64px);
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FormCard = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;