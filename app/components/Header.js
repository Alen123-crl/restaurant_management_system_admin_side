'use client'

import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#1e293b"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography variant="h6">
          Restaurant Admin Panel
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body2">Admin</Typography>
          <Avatar />
        </Box>

      </Toolbar>
    </AppBar>
  );
}