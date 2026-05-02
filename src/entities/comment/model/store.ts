import { makeAutoObservable, runInAction } from "mobx";
import type { Comment, CreateCommentDto, UpdateCommentDto } from "./types";
import {
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
} from "./commentService";

export class CommentStore {
    comments: Comment[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get sorted() {
        return [...this.comments].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
    }

    fetchByTask = async (taskId: string) => {
        this.isLoading = true;
        this.error = null;

        try {
            const { data } = await fetchComments(taskId);
            runInAction(() => {
                this.comments = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить комментарии";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    create = async (taskId: string, dto: CreateCommentDto) => {
        try {
            const { data } = await createComment(taskId, dto);
            runInAction(() => {
                this.comments.push(data);
            });
            return data;
        } catch {
            runInAction(() => {
                this.error = "Не удалось добавить комментарий";
            });
        }
    };

    update = async (id: string, dto: UpdateCommentDto) => {
        try {
            const { data } = await updateComment(id, dto);
            runInAction(() => {
                this.comments = this.comments.map((c) => (c.id === id ? data : c));
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось обновить комментарий";
            });
        }
    };

    delete = async (id: string) => {
        try {
            await deleteComment(id);
            runInAction(() => {
                this.comments = this.comments.filter((c) => c.id !== id);
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось удалить комментарий";
            });
        }
    };
}