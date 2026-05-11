import { request } from "@/src/shared/api/baseApi";
import type { Project, CreateProjectDto } from "./types";

export async function getProjectsByUserId(userId: string) {
    const projects = await request<Project[]>("/projects");

    return projects.filter(
        (project) =>
            project.owner === userId ||
            project.members.some((member) => member.id === userId)
    );
}

export async function createProject(data: CreateProjectDto) {
    return request<Project>("/projects", {
        method: "POST",
        body: JSON.stringify(data),
    });
}