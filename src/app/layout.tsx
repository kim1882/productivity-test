import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import ChecklistIcon from "@mui/icons-material/Checklist";
import InsightsIcon from "@mui/icons-material/Insights";
import TaskIcon from "@mui/icons-material/Task";
import theme from "@/theme";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Providers } from "@/lib/providers";
import Sidebar from "@/components/Sidebar";

const WIDTH = 180;
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Productivity Test",
  description: "Created by Lupita Estrada",
};

const ROUTES = [
  { title: "TASKS", href: "/tasks", icon: ChecklistIcon },
  { title: "INSIGHTS", href: "/insights", icon: InsightsIcon },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppBar position="fixed" sx={{ zIndex: 2000 }}>
                <Toolbar sx={{ backgroundColor: "background.paper" }}>
                  <TaskIcon
                    sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
                  />
                  <Typography variant="h6" color="text.primary">
                    My tasks
                  </Typography>
                </Toolbar>
              </AppBar>
              <Sidebar width={WIDTH} routes={ROUTES} />
              <Box
                component="main"
                sx={{
                  minHeight: "100vh",
                  flexGrow: 1,
                  bgcolor: "background.default",
                  ml: `${WIDTH}px`,
                  mt: ["48px", "56px", "64px"],
                  p: 3,
                }}
              >
                {children}
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
