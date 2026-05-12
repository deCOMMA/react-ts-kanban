import { request } from "@/src/shared/api/baseApi";
import type { Column, CreateColumnDto, UpdateColumnDto } from "./types";

export async function fetchColumns(boardId: string) {
    const columns = await request<Column[]>("/columns");

    return columns.filter((column) => column.boardId === boardId);
}

export async function createColumn(boardId: string, dto: CreateColumnDto) {
    return request<Column>("/columns", {
        method: "POST",
        body: JSON.stringify({
            ...dto,
            boardId,
        }),
    });
}

export async function updateColumn(id: string, dto: UpdateColumnDto) {
    return request<Column>(`/columns/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dto),
    });
}

export async function deleteColumn(id: string) {
    return request<Column>(`/columns/${id}`, {
        method: "DELETE",
    });
}