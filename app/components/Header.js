'use client'

import { AppBar, Toolbar, Typography, Box, Avatar, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {

  const router = useRouter();

  const handleLogout = () => {
    // Clear admin token
    localStorage.removeItem("adminToken");

    // Redirect to login page
    router.push("/login");
  }

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

          {/* Logout button */}
          <Button 
            variant="outlined" 
            color="inherit" 
            size="small"
            onClick={handleLogout}
            sx={{ borderColor: "white", color: "white" }}
          >
            Logout
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}