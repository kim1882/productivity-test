"use client";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Route {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface ISidebar {
  width: number;
  routes: Route[];
}

export const Sidebar = ({ width, routes }: ISidebar) => {
  const pathname = usePathname();
  const [selectedRoute, setSelectedRoute] = useState<string>(pathname);

  const handleListItemClick = (href: string) => {
    setSelectedRoute(href);
  };

  return (
    <Drawer
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          top: ["48px", "56px", "64px"],
          height: "auto",
          bottom: 0,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        {routes.map(({ title, href, icon: Icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton
              component={Link}
              href={href}
              onClick={() => handleListItemClick(href)}
              sx={{
                backgroundColor: selectedRoute === href ? "#72A0C1" : "inherit", // Adjust as per your styling needs
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
