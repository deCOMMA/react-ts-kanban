import { makeAutoObservable, runInAction } from "mobx";
import type { Column, CreateColumnDto, UpdateColumnDto } from "./types";
import {
    fetchColumns,
    createColumn,
    updateColumn,
    deleteColumn,
    reorderColumns,
} from "./columnService";

export class ColumnStore {
    columns: Column[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get sorted() {
        return [...this.columns].sort((a, b) => a.order - b.order);
    }

    fetchByBoard = async (boardId: string) => {
        this.isLoading = true;
        this.error = null;

        try {
            const { data } = await fetchColumns(boardId);
            runInAction(() => {
                this.columns = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить колонки";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    create = async (boardId: string, dto: CreateColumnDto) => {
        try {
            const { data } = await createColumn(boardId, dto);
            runInAction(() => {
                this.columns.push(data);
            });
            return data;
        } catch {
            runInAction(() => {
                this.error = "Не удалось создать колонку";
            });
        }
    };

    update = async (id: string, dto: UpdateColumnDto) => {
        try {
            const { data } = await updateColumn(id, dto);
            runInAction(() => {
                this.columns = this.columns.map((c) => (c.id === id ? data : c));
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось обновить колонку";
            });
        }
    };

    delete = async (id: string) => {
        try {
            await deleteColumn(id);
            runInAction(() => {
                this.columns = this.columns.filter((c) => c.id !== id);
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось удалить колонку";
            });
        }
    };

    reorder = async (boardId: string, orderedIds: string[]) => {
        const prev = [...this.columns];

        runInAction(() => {
            this.columns = orderedIds.map((id, index) => {
                const col = this.columns.find((c) => c.id === id)!;
                return { ...col, order: index };
            });
        });

        try {
            await reorderColumns(boardId, orderedIds);
        } catch {
            runInAction(() => {
                this.columns = prev;
                this.error = "Не удалось сохранить порядок колонок";
            });
        }
    };
}