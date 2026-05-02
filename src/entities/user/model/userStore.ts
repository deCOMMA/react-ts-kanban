import { makeAutoObservable, runInAction } from "mobx";
import type { User, UpdateUserDto } from "./types";
import { fetchUser, updateUser } from "./userService";
import { Nullable } from '@/src/shared/types'
export class UserStore {
    user: Nullable<User> = null;
    isLoading = false;
    error: Nullable<string> = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetch = async (id: string) => {
        this.isLoading = true;
        this.error = null;

        try {
            const { data } = await fetchUser(id);
            runInAction(() => {
                this.user = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось загрузить пользователя";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    update = async (id: string, dto: UpdateUserDto) => {
        this.isLoading = true;
        this.error = null;

        try {
            const { data } = await updateUser(id, dto);
            runInAction(() => {
                this.user = data;
            });
        } catch {
            runInAction(() => {
                this.error = "Не удалось обновить пользователя";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    get fullName() {
        return this.user?.fullName ?? "";
    }
}