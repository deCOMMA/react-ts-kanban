import { $api } from "@/src/shared/api/axios";
import type { User, UpdateUserDto } from "./types";

export const fetchUser = (id: string) =>
    $api.get<User>(`/users/${id}`);

export const updateUser = (id: string, dto: UpdateUserDto) =>
    $api.patch<User>(`/users/${id}`, dto);