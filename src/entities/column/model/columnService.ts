import { $api } from "@/src/shared/api/axios";
import type { Column, CreateColumnDto, UpdateColumnDto } from "./types";

export const fetchColumns = (boardId: string) =>
    $api.get<Column[]>(`/boards/${boardId}/columns`);

export const createColumn = (boardId: string, dto: CreateColumnDto) =>
    $api.post<Column>(`/boards/${boardId}/columns`, dto);

export const updateColumn = (id: string, dto: UpdateColumnDto) =>
    $api.patch<Column>(`/columns/${id}`, dto);

export const deleteColumn = (id: string) =>
    $api.delete(`/columns/${id}`);

export const reorderColumns = (boardId: string, orderedIds: string[]) =>
    $api.patch(`/boards/${boardId}/columns/reorder`, { orderedIds });