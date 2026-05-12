import { request } from "@/src/shared/api/baseApi";
import type { ProjectMember, ProjectInvitation } from "./types";

export async function fetchProjectMembers() {
    return request<ProjectMember[]>("/projectMembers");
}

export async function fetchProjectInvitations() {
    return request<ProjectInvitation[]>("/projectInvitations");
}

export async function createProjectMember(data: Omit<ProjectMember, "id">) {
    return request<ProjectMember>("/projectMembers", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateProjectMember(
    memberId: string,
    data: Partial<ProjectMember>
) {
    return request<ProjectMember>(`/projectMembers/${memberId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}

export async function deleteProjectMember(memberId: string) {
    return request<ProjectMember>(`/projectMembers/${memberId}`, {
        method: "DELETE",
    });
}

export async function createProjectInvitation(
    data: Omit<ProjectInvitation, "id">
) {
    return request<ProjectInvitation>("/projectInvitations", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateProjectInvitation(
    invitationId: string,
    data: Partial<ProjectInvitation>
) {
    return request<ProjectInvitation>(`/projectInvitations/${invitationId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
}