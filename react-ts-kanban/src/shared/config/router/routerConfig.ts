import type { RouteObject } from 'react-router-dom';
const enum AppRoutes {
    MAIN = 'main',
}

const RoutePath: Record<AppRoutes, string> = {
    main: '/',
}

export type RouteConfig = {
    path: string;
    title?: string;
    element: React.ReactNode;
    authOnly?: boolean;
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
    main: {
    }
}