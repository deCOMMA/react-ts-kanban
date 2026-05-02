import { makeAutoObservable, runInAction } from "mobx";
import type { WithLoading, Nullable } from "@/src/shared/types";
import type { AuthCredentials, RegisterCredentials, AuthResponse } from "./types";
import { login, register, logout } from "./authService";

export class AuthStore {
    token: Nullable<string> = null;
    userId: Nullable<string> = null;

    state: WithLoading<AuthResponse> = {
        data: null,
        isLoading: false,
        error: null,
    };

    constructor() {
        makeAutoObservable(this);
        if (typeof window !== "undefined") {
            this.token = localStorage.getItem("token");
            this.userId = localStorage.getItem("userId");
        }
    }

    get isAuthenticated() {
        return !!this.token;
    }

    get isLoading() {
        return this.state.isLoading;
    }

    get error() {
        return this.state.error;
    }

    login = async (dto: AuthCredentials) => {
        this.state.isLoading = true;
        this.state.error = null;

        try {
            const { data } = await login(dto);
            runInAction(() => {
                this.token = data.token;
                this.userId = data.userId;
                this.state.data = data;
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
            });
        } catch {
            runInAction(() => {
                this.state.error = "Неверный логин или пароль";
            });
        } finally {
            runInAction(() => {
                this.state.isLoading = false;
            });
        }
    };

    register = async (dto: RegisterCredentials) => {
        this.state.isLoading = true;
        this.state.error = null;

        try {
            const { data } = await register(dto);
            runInAction(() => {
                this.token = data.token;
                this.userId = data.userId;
                this.state.data = data;
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
            });
        } catch {
            runInAction(() => {
                this.state.error = "Ошибка при регистрации";
            });
        } finally {
            runInAction(() => {
                this.state.isLoading = false;
            });
        }
    };

    logout = async () => {
        try {
            await logout();
        } finally {
            runInAction(() => {
                this.token = null;
                this.userId = null;
                this.state.data = null;
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            });
        }
    };
}