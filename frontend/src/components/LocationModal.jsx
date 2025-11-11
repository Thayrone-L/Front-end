import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function LocationModal({ open, onClose, selectedLocation, onSave }) {
    const [name, setName] = useState("");

    useEffect(() => {
        if (selectedLocation) {
            setName(selectedLocation.name || "");
        } else {
            setName("");
        }
    }, [selectedLocation]);

    const handleSave = () => {
        if (!name.trim()) {
            alert("Preencha o nome da localiza��o!");
            return;
        }
        onSave({ name });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{selectedLocation ? "Editar Localização" : "Nova Localização"}</DialogTitle>
            <DialogContent sx={{ mt: 1 }}>
                <TextField
                    label="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
