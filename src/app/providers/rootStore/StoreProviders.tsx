// src/app/providers/StoreProvider.tsx

"use client";

import { createContext, useContext } from "react";
import { rootStore, RootStore } from "./rootStore";

const StoreContext = createContext<RootStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <StoreContext.Provider value={rootStore}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const store = useContext(StoreContext);

    if (!store) {
        throw new Error("useStore must be used within StoreProvider");
    }

    return store;
}