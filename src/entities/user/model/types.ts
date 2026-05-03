import type { CreateDto, Nullable, UpdateDto } from "@/src/shared/types/index";

export interface User {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: Nullable<string>;
    createdAt: string;
    updatedAt: string;
    password: string;
}

export type UserPreview = Pick<User, "id" | "fullName" | "avatarUrl">;

export type CreateUserDto = CreateDto<User>;
export type UpdateUserDto = UpdateDto<User>;