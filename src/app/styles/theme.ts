// src/app/styles/theme.ts

export const theme = {
    colors: {
        primary: "rgb(37 99 235)",
        primaryHover: "rgb(29 78 216)",
        primaryActive: "rgb(30 64 175)",

        secondary: "rgb(243 244 246)",
        secondaryHover: "rgb(229 231 235)",
        secondaryActive: "rgb(209 213 219)",

        background: "rgb(245 247 250)",
        surface: "rgb(255 255 255)",

        textPrimary: "rgb(17 24 39)",
        textSecondary: "rgb(107 114 128)",
        textMuted: "rgb(156 163 175)",

        border: "rgb(229 231 235)",

        danger: "rgb(220 38 38)",
        dangerHover: "rgb(185 28 28)",

        focus: "rgb(37 99 235 / 0.35)",
        skeleton: "rgb(229 231 235)",
        skeletonHighlight: "rgb(243 244 246)",
    },

    radius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
    },

    spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        xxl: "32px",
    },

    shadow: {
        card: "0 1px 3px rgb(0 0 0 / 0.08)",
    },
};

export type AppTheme = typeof theme;