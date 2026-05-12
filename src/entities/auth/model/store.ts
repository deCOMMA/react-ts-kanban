import { makeAutoObservable, runInAction } from "mobx";
import type { User } from "@/src/entities/user/model/types";
import {
    loginUser,
    registerUser,
    checkUserByEmail,
    checkUserByUsername,
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

    async register(
        fullName: string,
        username: string,
        email: string,
        password: string
    ) {
        this.isLoading = true;
        this.error = null;
        console.log(this.isLoading)
        try {
            const emailExists = await checkUserByEmail(email);

            if (emailExists) {
                throw new Error("Пользователь с такой почтой уже существует");
            }

            const usernameExists = await checkUserByUsername(username);

            if (usernameExists) {
                throw new Error("Пользователь с таким ником уже существует");
            }

            const now = new Date().toISOString();

            await registerUser({
                fullName: fullName.trim(),
                username: username.trim().toLowerCase(),
                email: email.trim().toLowerCase(),
                password,
                avatarUrl: null,
                bio: null,
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

    async updateProfile(data: {
        fullName: string;
        username: string;
        avatarUrl?: string | null;
        bio?: string | null;
    }) {
        if (!this.user) {
            return false;
        }

        this.isLoading = true;
        this.error = null;

        try {
            const users = await import("../model/authService").then((module) =>
                module.getUsers()
            );

            const normalizedUsername = data.username.trim().toLowerCase();

            const usernameExists = users.some(
                (user) =>
                    user.id !== this.user?.id &&
                    user.username?.toLowerCase() === normalizedUsername
            );

            if (usernameExists) {
                throw new Error("Пользователь с таким ником уже существует");
            }

            const updatedUser = await fetch(
                `http://localhost:4000/users/${this.user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fullName: data.fullName.trim(),
                        username: normalizedUsername,
                        avatarUrl: data.avatarUrl || null,
                        bio: data.bio?.trim() || null,
                        updatedAt: new Date().toISOString(),
                    }),
                }
            ).then((res) => {
                if (!res.ok) {
                    throw new Error("Не удалось обновить профиль");
                }

                return res.json();
            });

            runInAction(() => {
                this.user = updatedUser;
                localStorage.setItem("user", JSON.stringify(updatedUser));
            });

            return true;
        } catch (e: unknown) {
            runInAction(() => {
                this.error =
                    e instanceof Error ? e.message : "Ошибка обновления профиля";
            });

            return false;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}