import { $api } from "@/src/shared/api/axios";
import type { Project, CreateProjectDto, UpdateProjectDto } from "./types";

export const fetchProjects = () =>
    $api.get<Project[]>("/projects");

export const fetchProjectById = (id: string) =>
    $api.get<Project>(`/projects/${id}`);

export const createProject = (dto: CreateProjectDto) =>
    $api.post<Project>("/projects", dto);

export const updateProject = (id: string, dto: UpdateProjectDto) =>
    $api.patch<Project>(`/projects/${id}`, dto);

export const deleteProject = (id: string) =>
    $api.delete(`/projects/${id}`);