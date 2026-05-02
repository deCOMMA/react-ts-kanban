import { $api } from "@/src/shared/api/axios";
import type { Board, CreateBoardDto, UpdateBoardDto } from "./types";

export const fetchBoardsByProject = (projectId: string) =>
    $api.get<Board[]>(`/projects/${projectId}/boards`);

export const fetchBoardById = (id: string) =>
    $api.get<Board>(`/boards/${id}`);

export const createBoard = (projectId: string, dto: CreateBoardDto) =>
    $api.post<Board>(`/projects/${projectId}/boards`, dto);

export const updateBoard = (id: string, dto: UpdateBoardDto) =>
    $api.patch<Board>(`/boards/${id}`, dto);

export const deleteBoard = (id: string) =>
    $api.delete(`/boards/${id}`);