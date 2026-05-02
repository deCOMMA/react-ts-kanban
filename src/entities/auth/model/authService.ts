import { $api } from "@/src/shared/api/axios";
import type { AuthCredentials, RegisterCredentials, AuthResponse } from "./types";

export const login = (dto: AuthCredentials) =>
    $api.post<AuthResponse>("/auth/login", dto);

export const register = (dto: RegisterCredentials) =>
    $api.post<AuthResponse>("/auth/register", dto);

export const logout = () =>
    $api.post("/auth/logout");