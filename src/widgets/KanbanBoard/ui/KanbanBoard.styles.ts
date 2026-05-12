import styled from "styled-components";

export const Board = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 280px;
  gap: ${({ theme }) => theme.spacing.lg};

  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Column = styled.section`
  min-height: 520px;

  background: rgb(243 244 246);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  display: flex;
  flex-direction: column;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ColumnTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ColumnColor = styled.span<{ $color?: string }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $color, theme }) => $color || theme.colors.textMuted};
`;

export const ColumnTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TaskCount = styled.span`
  min-width: 24px;
  height: 24px;
  padding: 0 ${({ theme }) => theme.spacing.xs};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};

  font-size: 12px;
  font-weight: 500;
`;

export const TaskList = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  padding: ${({ theme }) => theme.spacing.md};
`;

export const TaskCard = styled.article`
  padding: ${({ theme }) => theme.spacing.md};

  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};

  cursor: pointer;
  transition:
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }
`;

export const TaskTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TaskDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  font-size: 13px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TaskFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Priority = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Assignee = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmptyColumn = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  text-align: center;
`;

export const ColumnActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ColumnActionButton = styled.button`
  width: 28px;
  height: 28px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};

  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};

  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const AddColumnCard = styled.div`
  min-height: 120px;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.md};

  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgb(255 255 255 / 0.6);
`;