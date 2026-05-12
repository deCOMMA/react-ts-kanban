import styled from "styled-components";

export const Text = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;