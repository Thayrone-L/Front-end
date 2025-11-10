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
    Box,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ReservationModal({ open, onClose, salas, selectedSala, selectedReserva, onSave }) {
    const [formData, setFormData] = useState({
        roomId: "",
        start: "",
        end: "",
        responsible: "",
        coffeeRequested: false,
        coffeeQuantity: 0,
        coffeeDescription: "",
    });

    useEffect(() => {
        if (selectedReserva) {
            setFormData({
                roomId: selectedReserva.roomId || "",
                start: selectedReserva.start
                    ? new Date(selectedReserva.start).toISOString().slice(0, 16)
                    : "",
                end: selectedReserva.end
                    ? new Date(selectedReserva.end).toISOString().slice(0, 16)
                    : "",
                responsible: selectedReserva.responsible || "",
                coffeeRequested: selectedReserva.coffeeRequested || false,
                coffeeQuantity: selectedReserva.coffeeQuantity || 0,
                coffeeDescription: selectedReserva.coffeeDescription || "",
            });
        } else if (selectedSala) {
            setFormData((prev) => ({ ...prev, roomId: selectedSala.id }));
        } else {
            setFormData({
                roomId: "",
                start: "",
                end: "",
                responsible: "",
                coffeeRequested: false,
                coffeeQuantity: 0,
                coffeeDescription: "",
            });
        }
    }, [selectedReserva, selectedSala]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
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
            coffeeDescription: formData.coffeeRequested ? formData.coffeeDescription : null,
        };

        onSave(payload);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {selectedReserva ? "Editar Reserva" : "Nova Reserva"}
            </DialogTitle>

            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <TextField
                    select
                    label="Sala"
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    required
                >
                    {salas?.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                            {s.name}
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
