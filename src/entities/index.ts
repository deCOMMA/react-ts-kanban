// =============================================================================
// ENTITIES — единая точка входа
// =============================================================================
// Импортируй всё отсюда, не лезь в подпапки напрямую:
//   import type { Task, Column } from "@/src/entities"

export type { User, UserPreview, CreateUserDto, UpdateUserDto } from "./user";

export type { Project, CreateProjectDto, UpdateProjectDto } from "./project";

export type { Board, CreateBoardDto, UpdateBoardDto } from "./board";

export type { Column, CreateColumnDto, UpdateColumnDto } from "./column";
export { DEFAULT_COLUMNS } from "./column";

export type { Task, TaskPriority, CreateTaskDto, UpdateTaskDto } from "./task";
export { TASK_PRIORITY_LABEL, DEFAULT_TASK_PRIORITY } from "./task";

export type { Comment, CreateCommentDto, UpdateCommentDto } from "./comment";
