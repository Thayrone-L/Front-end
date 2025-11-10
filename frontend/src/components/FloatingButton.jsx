import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function FloatingButton({ icon, text, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: 9999,
            }}
        >
            <Button
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    minWidth: hovered ? 150 : 56,
                    height: 56,
                    borderRadius: 28,
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: hovered ? 2 : 0,
                }}
                variant="contained"
                color="primary"
            >
                <Box
                    component="span"
                    sx={{
                        fontSize: hovered ? "1rem" : "2rem",
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.5s cubic-bezier(0.4, 0, 0.2, 1)',

                    }}
                >
                    {hovered ? text : icon}
                </Box>
            </Button>
        </Box>
    );
}
