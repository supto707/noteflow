import { Outlet } from "react-router";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function ThemedRoot() {
  const { dark } = useTheme();
  return (
    <div className={dark ? "dark" : ""} style={{ minHeight: "100vh", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
      <Outlet />
    </div>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedRoot />
    </ThemeProvider>
  );
}
