import { request } from "@/src/shared/api/baseApi";
import type { Board, CreateBoardDto, UpdateBoardDto } from "./types";

export async function fetchBoardsByProject(projectId: string) {
    const boards = await request<Board[]>("/boards");

    return boards.filter((board) => board.projectId === projectId);
}

export async function fetchBoardById(id: string) {
    return request<Board>(`/boards/${id}`);
}

export async function createBoard(projectId: string, dto: CreateBoardDto) {
    return request<Board>("/boards", {
        method: "POST",
        body: JSON.stringify({
            ...dto,
            projectId,
        }),
    });
}

export async function updateBoard(id: string, dto: UpdateBoardDto) {
    return request<Board>(`/boards/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dto),
    });
}

export async function deleteBoard(id: string) {
    return request<Board>(`/boards/${id}`, {
        method: "DELETE",
    });
}