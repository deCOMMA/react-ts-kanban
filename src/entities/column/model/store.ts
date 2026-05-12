import { makeAutoObservable, runInAction } from "mobx";
import type { Column } from "./types";
import {
    createColumn,
    deleteColumn,
    fetchColumns,
    updateColumn,
} from "./columnService";

export class ColumnStore {
    columns: Column[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get sortedColumns() {
        return [...this.columns].sort((a, b) => a.order - b.order);
    }

    async fetchByBoard(boardId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const columns = await fetchColumns(boardId);

            runInAction(() => {
                this.columns = columns;
            });
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка загрузки колонок";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async create(
        boardId: string,
        data: {
            title: string;
            color?: string;
        }
    ) {
        this.isLoading = true;
        this.error = null;

        try {
            const now = new Date().toISOString();

            const column = await createColumn(boardId, {
                title: data.title.trim(),
                color: data.color,
                boardId,
                order: this.columns.length,
                tasks: [],
            });

            runInAction(() => {
                this.columns.push(column);
            });

            return column;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка создания колонки";
            });

            return null;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async update(
        columnId: string,
        data: {
            title: string;
            color?: string;
        }
    ) {
        this.isLoading = true;
        this.error = null;

        try {
            const updatedColumn = await updateColumn(columnId, {
                title: data.title.trim(),
                color: data.color,
            });

            runInAction(() => {
                this.columns = this.columns.map((column) =>
                    column.id === columnId ? updatedColumn : column
                );
            });

            return updatedColumn;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка обновления колонки";
            });

            return null;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async delete(columnId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            await deleteColumn(columnId);

            runInAction(() => {
                this.columns = this.columns.filter((column) => column.id !== columnId);
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка удаления колонки";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}