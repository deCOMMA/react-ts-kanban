import { request } from "@/src/shared/api/baseApi";
import type { Task, CreateTaskDto, UpdateTaskDto, MoveTaskDto } from "./types";

export async function fetchTasksByBoard(boardId: string) {
    const tasks = await request<Task[]>("/tasks");

    return tasks.filter((task) => task.boardId === boardId);
}

export async function fetchTaskById(id: string) {
    return request<Task>(`/tasks/${id}`);
}

export async function createTask(dto: CreateTaskDto) {
    return request<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(dto),
    });
}

export async function updateTask(id: string, dto: UpdateTaskDto) {
    return request<Task>(`/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dto),
    });
}

export async function moveTask(id: string, dto: MoveTaskDto) {
    return request<Task>(`/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dto),
    });
}

export async function deleteTask(id: string) {
    return request<Task>(`/tasks/${id}`, {
        method: "DELETE",
    });
}