export type ProjectRole = "owner" | "admin" | "member" | "viewer";

export type ProjectInvitationStatus = "pending" | "accepted" | "rejected";

export interface ProjectMember {
    id: string;
    projectId: string;
    userId: string;
    role: ProjectRole;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectInvitation {
    id: string;
    projectId: string;
    fromUserId: string;
    toUserId: string;
    role: ProjectRole;
    status: ProjectInvitationStatus;
    createdAt: string;
    updatedAt: string;
}

export const PROJECT_ROLE_LABEL: Record<ProjectRole, string> = {
    owner: "Владелец",
    admin: "Администратор",
    member: "Участник",
    viewer: "Наблюдатель",
};

export const PROJECT_INVITATION_STATUS_LABEL: Record<
    ProjectInvitationStatus,
    string
> = {
    pending: "Ожидает ответа",
    accepted: "Принято",
    rejected: "Отклонено",
};