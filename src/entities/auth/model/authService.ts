import { request } from "@/src/shared/api/baseApi";
import type { User } from "@/src/entities/user/model/types";

export type RegisterUserDto = Omit<User, "id">;

export async function registerUser(data: RegisterUserDto) {
    return request<User>("/users", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function getUsers() {
    return request<User[]>("/users");
}

export async function checkUserByEmail(email: string) {
    const users = await getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    console.log(users);
    return users.some((user) => user.email.toLowerCase() === normalizedEmail);
}

export async function checkUserByUsername(username: string) {
    const users = await getUsers();
    const normalizedUsername = username.trim().toLowerCase();
    console.log(users);
    return users.some(
        (user) => user.username?.toLowerCase() === normalizedUsername
    );
}

export async function loginUser(email: string, password: string) {
    const users = await getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    return (
        users.find(
            (user) =>
                user.email.toLowerCase() === normalizedEmail &&
                user.password === password
        ) ?? null
    );
}