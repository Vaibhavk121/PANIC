// styles/theme.js

const theme = {
  light: {
    colors: {
      background: "#f8fafc",
      foreground: "#1e293b",
      card: "#ffffff",
      cardForeground: "#1e293b",
      popover: "#ffffff",
      popoverForeground: "#1e293b",
      primary: "#6366f1",
      primaryForeground: "#ffffff",
      secondary: "#e5e7eb",
      secondaryForeground: "#374151",
      muted: "#f3f4f6",
      mutedForeground: "#6b7280",
      accent: "#e0e7ff",
      accentForeground: "#374151",
      destructive: "#ef4444",
      destructiveForeground: "#ffffff",
      border: "#d1d5db",
      input: "#d1d5db",
      ring: "#6366f1",
      sidebar: "#f3f4f6",
      sidebarForeground: "#1e293b",
      sidebarPrimary: "#6366f1",
      sidebarPrimaryForeground: "#ffffff",
      sidebarAccent: "#e0e7ff",
      sidebarAccentForeground: "#374151",
      sidebarBorder: "#d1d5db",
      sidebarRing: "#6366f1",
      chart: ["#6366f1", "#4f46e5", "#4338ca", "#3730a3", "#312e81"],
    },
    fonts: {
      sans: "Inter",
      serif: "Merriweather",
      mono: "JetBrains Mono",
    },
    radius: {
      sm: 4,
      md: 6,
      lg: 8,
      xl: 12,
    },
    shadow: {
      sm: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      md: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    },
  },
};

export default theme;
