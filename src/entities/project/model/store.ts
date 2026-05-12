import { makeAutoObservable, runInAction } from "mobx";
import type { Project } from "./types";
import type { User, UserPreview } from "@/src/entities/user";
import {
    createProject,
    getProjectsByUserId,
    fetchAllProjects,
    updateProject,
} from "./projectService";

export class ProjectStore {
    projects: Project[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAllProjects() {
        this.isLoading = true;
        this.error = null;

        try {
            const projects = await fetchAllProjects();

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

    getProjectById(projectId: string) {
        return (
            this.projects.find((project) => project.id === projectId) ||
            this.projects.find((project) => project.id === projectId) ||
            null
        );
    }

    async addMemberToProject(projectId: string, user: UserPreview) {
        this.isLoading = true;
        this.error = null;

        try {
            const project = this.getProjectById(projectId);

            if (!project) {
                throw new Error("Проект не найден");
            }

            const alreadyMember = project.members.some(
                (member) => member.id === user.id
            );

            if (alreadyMember) {
                return true;
            }

            const updatedProject = await updateProject(projectId, {
                members: [...project.members, user],
                updatedAt: new Date().toISOString(),
            });

            runInAction(() => {
                this.projects = this.projects.map((item) =>
                    item.id === projectId ? updatedProject : item
                );

                const existsInUserProjects = this.projects.some(
                    (item) => item.id === projectId
                );

                if (existsInUserProjects) {
                    this.projects = this.projects.map((item) =>
                        item.id === projectId ? updatedProject : item
                    );
                } else {
                    this.projects = [...this.projects, updatedProject];
                }
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка добавления участника";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
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