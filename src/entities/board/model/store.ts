import { makeAutoObservable, runInAction } from "mobx";
import type { Nullable } from "@/src/shared/types";
import type { Board, CreateBoardDto, UpdateBoardDto } from "./types";
import {
    fetchBoardsByProject,
    fetchBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
} from "./boardService";

export class BoardStore {
    boards: Board[] = [];
    current: Nullable<Board> = null;
    isLoading = false;
    error: Nullable<string> = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchByProject = async (projectId: string) => {
        this.isLoading = true;
        this.error = null;

        try {
            const data = await fetchBoardsByProject(projectId);
            runInAction(() => {
                this.boards = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить доски";
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
            const data = await fetchBoardById(id);
            runInAction(() => {
                this.current = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить доску";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    create = async (projectId: string, dto: CreateBoardDto) => {
        try {
            const data = await createBoard(projectId, dto);
            runInAction(() => {
                this.boards.push(data);
            });
            return data;
        } catch {
            runInAction(() => {
                this.error = "Не удалось создать доску";
            });
        }
    };

    update = async (id: string, dto: UpdateBoardDto) => {
        try {
            const data = await updateBoard(id, dto);
            runInAction(() => {
                this.boards = this.boards.map((b) => (b.id === id ? data : b));
                if (this.current?.id === id) this.current = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось обновить доску";
            });
        }
    };

    delete = async (id: string) => {
        try {
            await deleteBoard(id);
            runInAction(() => {
                this.boards = this.boards.filter((b) => b.id !== id);
                if (this.current?.id === id) this.current = null;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось удалить доску";
            });
        }
    };
}