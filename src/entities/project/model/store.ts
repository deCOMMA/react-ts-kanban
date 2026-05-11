import { makeAutoObservable, runInAction } from "mobx";
import type { Project } from "./types";
import type { User } from "@/src/entities/user";
import {
    createProject,
    getProjectsByUserId,
} from "./projectService";

export class ProjectStore {
    projects: Project[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProjects(userId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const projects = await getProjectsByUserId(userId);

            runInAction(() => {
                this.projects = projects;
            });
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка загрузки проектов";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async createProject(
        user: User,
        title: string,
        description: string
    ): Promise<Project | null> {
        this.isLoading = true;
        this.error = null;

        try {
            const now = new Date().toISOString();

            const projectKey = title
                .trim()
                .slice(0, 4)
                .toUpperCase()
                .replace(/[^A-ZА-Я0-9]/g, "");

            const project = await createProject({
                title: title.trim(),
                description: description.trim(),
                key: projectKey || "PROJ",
                owner: user.id,
                members: [
                    {
                        id: user.id,
                        fullName: user.fullName,
                        avatarUrl: user.avatarUrl,
                    },
                ],
                boards: [],
            });

            runInAction(() => {
                this.projects.push(project);
            });

            return project;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка создания проекта";
            });

            return null;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}