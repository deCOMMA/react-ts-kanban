"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@/src/app/styles/theme";
import { GlobalStyles } from "@/src/app/styles/GlobalStyles";
import StyledComponentsRegistry from "@/src/shared/lib/styled-components-registry";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
}