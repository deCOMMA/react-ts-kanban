import { makeAutoObservable, runInAction } from "mobx";
import type {
    ProjectInvitation,
    ProjectMember,
    ProjectRole,
} from "./types";
import {
    createProjectInvitation,
    createProjectMember,
    deleteProjectMember,
    fetchProjectInvitations,
    fetchProjectMembers,
    updateProjectInvitation,
    updateProjectMember,
} from "./projectMemberService";

export class ProjectMemberStore {
    members: ProjectMember[] = [];
    invitations: ProjectInvitation[] = [];

    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAll() {
        this.isLoading = true;
        this.error = null;

        try {
            const [members, invitations] = await Promise.all([
                fetchProjectMembers(),
                fetchProjectInvitations(),
            ]);

            runInAction(() => {
                this.members = members;
                this.invitations = invitations;
            });
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error
                        ? e.message
                        : "Ошибка загрузки участников проекта";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    getMembersByProject(projectId: string) {
        return this.members.filter((member) => member.projectId === projectId);
    }

    getUserProjectMembership(projectId: string, userId: string) {
        return (
            this.members.find(
                (member) => member.projectId === projectId && member.userId === userId
            ) || null
        );
    }

    getUserProjectRole(projectId: string, userId: string) {
        return this.getUserProjectMembership(projectId, userId)?.role || null;
    }

    isProjectMember(projectId: string, userId: string) {
        return Boolean(this.getUserProjectMembership(projectId, userId));
    }

    getPendingInvitationsByProject(projectId: string) {
        return this.invitations.filter(
            (invitation) =>
                invitation.projectId === projectId && invitation.status === "pending"
        );
    }

    getIncomingInvitations(userId: string) {
        return this.invitations.filter(
            (invitation) =>
                invitation.toUserId === userId && invitation.status === "pending"
        );
    }

    getOutgoingInvitations(userId: string) {
        return this.invitations.filter(
            (invitation) =>
                invitation.fromUserId === userId && invitation.status === "pending"
        );
    }

    getPendingInvitation(projectId: string, userId: string) {
        return (
            this.invitations.find(
                (invitation) =>
                    invitation.projectId === projectId &&
                    invitation.toUserId === userId &&
                    invitation.status === "pending"
            ) || null
        );
    }

    hasPendingInvitation(projectId: string, userId: string) {
        return Boolean(this.getPendingInvitation(projectId, userId));
    }

    async createOwnerMember(projectId: string, userId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const alreadyMember = this.isProjectMember(projectId, userId);

            if (alreadyMember) {
                return true;
            }

            const now = new Date().toISOString();

            const member = await createProjectMember({
                projectId,
                userId,
                role: "owner",
                createdAt: now,
                updatedAt: now,
            });

            runInAction(() => {
                this.members = [...this.members, member];
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error
                        ? e.message
                        : "Ошибка добавления владельца проекта";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async inviteUserToProject(data: {
        projectId: string;
        fromUserId: string;
        toUserId: string;
        role?: ProjectRole;
    }) {
        this.isLoading = true;
        this.error = null;

        try {
            if (data.fromUserId === data.toUserId) {
                throw new Error("Нельзя пригласить самого себя");
            }

            if (this.isProjectMember(data.projectId, data.toUserId)) {
                throw new Error("Пользователь уже является участником проекта");
            }

            if (this.hasPendingInvitation(data.projectId, data.toUserId)) {
                throw new Error("Приглашение уже отправлено");
            }

            const now = new Date().toISOString();

            const invitation = await createProjectInvitation({
                projectId: data.projectId,
                fromUserId: data.fromUserId,
                toUserId: data.toUserId,
                role: data.role || "member",
                status: "pending",
                createdAt: now,
                updatedAt: now,
            });

            runInAction(() => {
                this.invitations = [...this.invitations, invitation];
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка отправки приглашения";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async acceptInvitation(invitation: ProjectInvitation) {
        this.isLoading = true;
        this.error = null;

        try {
            const now = new Date().toISOString();

            const updatedInvitation = await updateProjectInvitation(invitation.id, {
                status: "accepted",
                updatedAt: now,
            });

            const member = await createProjectMember({
                projectId: invitation.projectId,
                userId: invitation.toUserId,
                role: invitation.role,
                createdAt: now,
                updatedAt: now,
            });

            runInAction(() => {
                this.invitations = this.invitations.map((item) =>
                    item.id === invitation.id ? updatedInvitation : item
                );

                this.members = [...this.members, member];
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка принятия приглашения";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async rejectInvitation(invitation: ProjectInvitation) {
        this.isLoading = true;
        this.error = null;

        try {
            const updatedInvitation = await updateProjectInvitation(invitation.id, {
                status: "rejected",
                updatedAt: new Date().toISOString(),
            });

            runInAction(() => {
                this.invitations = this.invitations.map((item) =>
                    item.id === invitation.id ? updatedInvitation : item
                );
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка отклонения приглашения";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async updateMemberRole(memberId: string, role: ProjectRole) {
        this.isLoading = true;
        this.error = null;

        try {
            const updatedMember = await updateProjectMember(memberId, {
                role,
                updatedAt: new Date().toISOString(),
            });

            runInAction(() => {
                this.members = this.members.map((member) =>
                    member.id === memberId ? updatedMember : member
                );
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка изменения роли участника";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async removeMember(memberId: string) {
        this.isLoading = true;
        this.error = null;

        try {
            await deleteProjectMember(memberId);

            runInAction(() => {
                this.members = this.members.filter((member) => member.id !== memberId);
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка удаления участника";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    getOutgoingInvitationsByProject(projectId: string, userId: string) {
        return this.invitations.filter(
            (invitation) =>
                invitation.projectId === projectId &&
                invitation.fromUserId === userId &&
                invitation.status === "pending"
        );
    }
}