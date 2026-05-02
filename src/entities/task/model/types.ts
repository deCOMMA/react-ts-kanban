import type { UserPreview } from "@/src/entities/user";
import type {
  CreateDto,
  UpdateDto,
  Nullable,
} from "@/src/shared/types/index";

export type TaskPriority = "low" | "medium" | "high" | "critical";

export const TASK_PRIORITY_LABEL: Record<TaskPriority, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  critical: "Критический",
};

export const DEFAULT_TASK_PRIORITY: TaskPriority = "medium";

export interface Task {
  id: string;
  title: string;
  description: Nullable<string>;
  priority: TaskPriority;
  columnId: string;
  boardId: string;
  projectId: string;
  order: number;
  assignee: Nullable<UserPreview>;
  createdBy: UserPreview;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskDto = CreateDto<Task>;
export type UpdateTaskDto = UpdateDto<Task>;

export interface MoveTaskDto {
  columnId: string;
  order: number;
}