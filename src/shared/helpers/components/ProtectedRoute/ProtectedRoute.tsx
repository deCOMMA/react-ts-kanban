"use client";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useStore } from "@/src/app/providers/rootStore/StoreProviders";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = observer(function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const { authStore } = useStore();
    const router = useRouter();

    useEffect(() => {
        if (!authStore.isInitialized) {
            return;
        }

        if (!authStore.isAuth) {
            router.replace("/login");
        }
    }, [authStore.isInitialized, authStore.isAuth, router]);

    if (!authStore.isInitialized) {
        return null;
    }

    if (!authStore.isAuth) {
        return null;
    }

    return <>{children}</>;
});