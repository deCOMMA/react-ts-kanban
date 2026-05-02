import type { CreateDto, UpdateDto } from "@/src/shared/types/index";

export interface User {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export type UserPreview = Pick<User, "id" | "fullName" | "avatarUrl">;

export type CreateUserDto = CreateDto<User>;
export type UpdateUserDto = UpdateDto<User>;