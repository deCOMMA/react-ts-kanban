import { $api } from "@/src/shared/api/axios";
import type { Comment, CreateCommentDto, UpdateCommentDto } from "./types";

export const fetchComments = (taskId: string) =>
    $api.get<Comment[]>(`/tasks/${taskId}/comments`);

export const createComment = (taskId: string, dto: CreateCommentDto) =>
    $api.post<Comment>(`/tasks/${taskId}/comments`, dto);

export const updateComment = (id: string, dto: UpdateCommentDto) =>
    $api.patch<Comment>(`/comments/${id}`, dto);

export const deleteComment = (id: string) =>
    $api.delete(`/comments/${id}`);