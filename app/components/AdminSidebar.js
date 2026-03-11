'use client'

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventSeatIcon from "@mui/icons-material/EventSeat";

import Link from "next/link";

const drawerWidth = 240;

export default function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          position: "relative",  // important
          height: "100%",
          borderRight: "1px solid #eee"
        }
      }}
    >
      <List>

        <ListItemButton component={Link} href="/admin">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} href="/admin/blogs">
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          <ListItemText primary="Blogs" />
        </ListItemButton>

        <ListItemButton component={Link} href="/admin/menu">
          <ListItemIcon><RestaurantMenuIcon /></ListItemIcon>
          <ListItemText primary="Menu" />
        </ListItemButton>

        <ListItemButton component={Link} href="/admin/opening-hours">
          <ListItemIcon><AccessTimeIcon /></ListItemIcon>
          <ListItemText primary="Opening Hours" />
        </ListItemButton>
        
        <ListItemButton component={Link} href="/admin/special-hours">
  <ListItemText primary="Special Hours" />
</ListItemButton>

        <ListItemButton component={Link} href="/admin/reservations">
          <ListItemIcon><EventSeatIcon /></ListItemIcon>
          <ListItemText primary="Reservations" />
        </ListItemButton>

      </List>
    </Drawer>
  );
}