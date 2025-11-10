import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";

export default function RoomModal({ open, onClose, selectedRoom, locations, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        locationId: 0,
        capacity: 0
    });

    useEffect(() => {
        if (selectedRoom) {
            setFormData({
                name: selectedRoom.name || "",
                locationId: selectedRoom.locationId || 0,
                capacity: selectedRoom.capacity || 0
            });
        } else {
            setFormData({ name: "", locationId: 0, capacity: 0 });
        }
    }, [selectedRoom]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "capacity" || name === "locationId" ? Number(value) : value
        }));
    };

    const handleSave = () => {
        if (!formData.name || !formData.locationId || !formData.capacity) {
            alert("Preencha todos os campos!");
            return;
        }

        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{selectedRoom ? "Editar Sala" : "Nova Sala"}</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    label="Nome da Sala"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <TextField
                    select
                    label="Localização"
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleChange}
                    required
                >
                    {locations.map((loc) => (
                        <MenuItem key={loc.id} value={loc.id}>
                            {loc.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Capacidade"
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
