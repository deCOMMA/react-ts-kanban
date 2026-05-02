import { makeAutoObservable, runInAction } from "mobx";
import type { Task, CreateTaskDto, UpdateTaskDto, MoveTaskDto } from "./types";
import {
    fetchTasksByBoard,
    fetchTaskById,
    createTask,
    updateTask,
    moveTask,
    deleteTask,
} from "./taskService";
import { Nullable } from "@/src/shared/types";

export class TaskStore {
    tasks: Task[] = [];
    current: Nullable<Task> = null;
    isLoading = false;
    error: Nullable<string> = null;

    constructor() {
        makeAutoObservable(this);
    }

    byColumn(columnId: string): Task[] {
        return this.tasks
            .filter((t) => t.columnId === columnId)
            .sort((a, b) => a.order - b.order);
    }

    fetchByBoard = async (boardId: string) => {
        this.isLoading = true;
        this.error = null;

        try {
            const { data } = await fetchTasksByBoard(boardId);
            runInAction(() => {
                this.tasks = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить задачи";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    fetchById = async (id: string) => {
        this.isLoading = true;
        this.error = null;

        try {
            const { data } = await fetchTaskById(id);
            runInAction(() => {
                this.current = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить задачу";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    create = async (dto: CreateTaskDto) => {
        try {
            const { data } = await createTask(dto);
            runInAction(() => {
                this.tasks.push(data);
            });
            return data;
        } catch {
            runInAction(() => {
                this.error = "Не удалось создать задачу";
            });
        }
    };

    update = async (id: string, dto: UpdateTaskDto) => {
        try {
            const { data } = await updateTask(id, dto);
            runInAction(() => {
                this.tasks = this.tasks.map((t) => (t.id === id ? data : t));
                if (this.current?.id === id) this.current = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось обновить задачу";
            });
        }
    };

    move = async (id: string, dto: MoveTaskDto) => {
        const prev = [...this.tasks];

        runInAction(() => {
            this.tasks = this.tasks.map((t) =>
                t.id === id ? { ...t, columnId: dto.columnId, order: dto.order } : t
            );
        });

        try {
            const { data } = await moveTask(id, dto);
            runInAction(() => {
                this.tasks = this.tasks.map((t) => (t.id === id ? data : t));
            });
        } catch {
            runInAction(() => {
                this.tasks = prev;
                this.error = "Не удалось переместить задачу";
            });
        }
    };

    delete = async (id: string) => {
        try {
            await deleteTask(id);
            runInAction(() => {
                this.tasks = this.tasks.filter((t) => t.id !== id);
                if (this.current?.id === id) this.current = null;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось удалить задачу";
            });
        }
    };
}