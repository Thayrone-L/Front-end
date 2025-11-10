import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function UserModal({ open, onClose, selectedUser, onSave }) {
    const [formData, setFormData] = useState({ username: "", password: "" });

    useEffect(() => {
        if (selectedUser) {
            setFormData({
                username: selectedUser.username || "",
                password: ""
            });
        } else {
            setFormData({ username: "", password: "" });
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.username.trim() || !formData.password.trim()) {
            alert("Preencha todos os campos!");
            return;
        }
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{selectedUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
            <DialogContent sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
