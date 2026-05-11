import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "@/src/entities/user/model/types";
import {
    loginUser,
    registerUser,
    checkUserByEmail,
} from "../model/authService";

export class AuthStore {
    user: User | null = null;
    isLoading = false;
    error: string | null = null;
    isInitialized = false;

    constructor() {
        makeAutoObservable(this);
    }

    initAuth() {
        if (typeof window === "undefined") {
            return;
        }

        try {
            const stored = localStorage.getItem("user");

            if (stored) {
                this.user = JSON.parse(stored);
            }
        } catch {
            this.user = null;
            localStorage.removeItem("user");
        } finally {
            this.isInitialized = true;
        }
    }

    async register(fullName: string, email: string, password: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const exists = await checkUserByEmail(email);

            if (exists) {
                throw new Error("Пользователь с такой почтой уже существует");
            }

            const now = new Date().toISOString();

            await registerUser({
                fullName: fullName.trim(),
                email: email.trim().toLowerCase(),
                password,
                avatarUrl: null,
                createdAt: now,
                updatedAt: now,
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Ошибка регистрации";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async login(email: string, password: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const user = await loginUser(email, password);

            if (!user) {
                throw new Error("Неверный email или пароль");
            }

            runInAction(() => {
                this.user = user;

                if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(user));
                }
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Ошибка авторизации";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    logout() {
        this.user = null;
        this.error = null;

        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
        }
    }

    get isAuth() {
        return Boolean(this.user);
    }
}