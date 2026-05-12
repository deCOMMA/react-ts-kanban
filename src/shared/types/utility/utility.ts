import { ReactNode } from "react";

export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;

export type Optional<T> = T | null | undefined;

export type WithChildren<T> = T & {
    children: ReactNode;
};

/** Делает вложенный объект полностью Partial (рекурсивно) */
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** Делает указанные поля обязательными, остальные не трогает */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** DTO для создания: убираем серверные поля, всё остальное обязательно */
export type CreateDto<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

/** DTO для обновления: убираем серверные поля, всё остальное опционально */
export type UpdateDto<T> = Partial<Omit<T, "id" | "createdAt">>;

/** Стандартный ответ сервера со списком */
export type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
};

/** Любая сущность с порядковым номером (для drag & drop) */
export type Ordered<T> = T & { order: number };

/** Сущность в состоянии загрузки */
export type WithLoading<T> = {
    data: Nullable<T>;
    isLoading: boolean;
    error: Nullable<string>;
};