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
  { title: "Бэклог", order: 0, color: "rgb(107 114 128)" },
  { title: "В работе", order: 1, color: "rgb(59 130 246)" },
  { title: "Ревью", order: 2, color: "rgb(245 158 11)" },
  { title: "Готово", order: 3, color: "rgb(16 185 129)" },
];

export type CreateColumnDto = CreateDto<Column>;
export type UpdateColumnDto = UpdateDto<Column>;
