import { $api } from "@/src/shared/api/axios";
import type { Task, CreateTaskDto, UpdateTaskDto, MoveTaskDto } from "./types";

export const fetchTasksByBoard = (boardId: string) =>
    $api.get<Task[]>(`/boards/${boardId}/tasks`);

export const fetchTaskById = (id: string) =>
    $api.get<Task>(`/tasks/${id}`);

export const createTask = (dto: CreateTaskDto) =>
    $api.post<Task>("/tasks", dto);

export const updateTask = (id: string, dto: UpdateTaskDto) =>
    $api.patch<Task>(`/tasks/${id}`, dto);

export const moveTask = (id: string, dto: MoveTaskDto) =>
    $api.patch<Task>(`/tasks/${id}/move`, dto);

export const deleteTask = (id: string) =>
    $api.delete(`/tasks/${id}`);