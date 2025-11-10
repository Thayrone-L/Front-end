import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Box
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ReservationModal({ open, onClose, selectedSala, onSave }) {
    const [salas, setSalas] = useState([]);
    const [formData, setFormData] = useState({
        roomId: "",
        start: "",
        end: "",
        responsible: "",
        coffeeRequested: false,
        coffeeQuantity: 0,
        coffeeDescription: ""
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (open) {
            axios
                .get("https://localhost:7181/api/Room", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => setSalas(res.data))
                .catch((err) => console.error("Erro ao carregar salas:", err));
        }
    }, [open]);

    useEffect(() => {
        if (selectedSala) {
            setFormData((prev) => ({ ...prev, roomId: selectedSala.id }));
        }
    }, [selectedSala]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSave = () => {
        if (!formData.roomId || !formData.start || !formData.end || !formData.responsible) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const payload = {
            roomId: Number(formData.roomId),
            start: new Date(formData.start),
            end: new Date(formData.end),
            responsible: formData.responsible,
            coffeeRequested: formData.coffeeRequested,
            coffeeQuantity: formData.coffeeRequested ? Number(formData.coffeeQuantity) : 0,
            coffeeDescription: formData.coffeeRequested ? formData.coffeeDescription : null
        };

        onSave(payload);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nova Reserva</DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 2
                }}
            >
                <TextField
                    select
                    label="Sala"
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    required
                    sx={{ mt: 1 }}
                >
                    {salas.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                            {s.nome}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Responsável"
                    name="responsible"
                    value={formData.responsible}
                    onChange={handleChange}
                    required
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                        label="Início"
                        type="datetime-local"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Término"
                        type="datetime-local"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                        fullWidth
                    />
                </Box>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.coffeeRequested}
                            onChange={handleChange}
                            name="coffeeRequested"
                        />
                    }
                    label="Solicitar café?"
                />

                {formData.coffeeRequested && (
                    <>
                        <TextField
                            label="Quantidade de cafés"
                            type="number"
                            name="coffeeQuantity"
                            value={formData.coffeeQuantity}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            label="Descrição do café"
                            name="coffeeDescription"
                            value={formData.coffeeDescription}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </>
                )}
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
