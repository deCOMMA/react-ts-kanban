import type { Task } from "@/src/entities/task";
import type { CreateDto, UpdateDto } from "@/src/shared/types/index";

export interface Column {
  id: string;
  title: string;
  boardId: string;
  order: number;
  color?: string;
  tasks?: Task[];
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_COLUMNS: Pick<Column, "title" | "order" | "color">[] = [
  { title: "Бэклог", order: 0, color: "#6B7280" },
  { title: "В работе", order: 1, color: "#3B82F6" },
  { title: "Ревью", order: 2, color: "#F59E0B" },
  { title: "Готово", order: 3, color: "#10B981" },
];

export type CreateColumnDto = CreateDto<Column>;
export type UpdateColumnDto = UpdateDto<Column>;
