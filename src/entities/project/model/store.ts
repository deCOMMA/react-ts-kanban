import { makeAutoObservable, runInAction } from "mobx";
import type { Nullable } from "@/src/shared/types";
import type { Project, CreateProjectDto, UpdateProjectDto } from "./types";
import {
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "./projectService";

export class ProjectStore {
    projects: Project[] = [];
    current: Nullable<Project> = null;
    isLoading = false;
    error: Nullable<string> = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchAll = async () => {
        this.isLoading = true;
        this.error = null;

        try {
            const { data } = await fetchProjects();
            runInAction(() => {
                this.projects = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить проекты";
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
            const { data } = await fetchProjectById(id);
            runInAction(() => {
                this.current = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить проект";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    create = async (dto: CreateProjectDto) => {
        try {
            const { data } = await createProject(dto);
            runInAction(() => {
                this.projects.push(data);
            });
            return data;
        } catch {
            runInAction(() => {
                this.error = "Не удалось создать проект";
            });
        }
    };

    update = async (id: string, dto: UpdateProjectDto) => {
        try {
            const { data } = await updateProject(id, dto);
            runInAction(() => {
                this.projects = this.projects.map((p) => (p.id === id ? data : p));
                if (this.current?.id === id) this.current = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось обновить проект";
            });
        }
    };

    delete = async (id: string) => {
        try {
            await deleteProject(id);
            runInAction(() => {
                this.projects = this.projects.filter((p) => p.id !== id);
                if (this.current?.id === id) this.current = null;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось удалить проект";
            });
        }
    };
}