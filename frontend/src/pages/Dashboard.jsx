import { useState, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Skeleton,
} from "@mui/material";
import RoomCalendar from "../components/RoomCalendar";
import FloatingButton from "../components/FloatingButton";
import AddIcon from "@mui/icons-material/Add";
import ReservationModal from "../components/ReservationModal";


export default function DashboardPage() {
    const [salas, setSalas] = useState(null);
    const [selectedSala, setSelectedSala] = useState(null);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleSaveReservation = async (reserva) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("https://localhost:7181/api/Reservation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(reserva)
            });

            if (!res.ok) throw new Error("Erro ao salvar reserva");
            alert("Reserva criada com sucesso!");
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        const fetchSalas = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("https://localhost:7181/api/Room", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Erro ao buscar salas");
                const data = await res.json();

                setSalas(data);

                if (data.length > 0) {
                    const primeiraSala = data.reduce((menor, atual) =>
                        atual.id < menor.id ? atual : menor
                    );
                    setSelectedSala(primeiraSala);
                }
            } catch (err) {
                setError(err.message);
                setSalas([]);
            }
        };

        fetchSalas();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Painel de Salas
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Grid container spacing={2} sx={{ mb: 3 }}>
                {salas === null
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Card>
                                <CardContent>
                                    <Skeleton variant="text" width="80%" />
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="text" width="40%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                    : salas.length === 0
                        ? (
                            <Typography>Nenhuma sala cadastrada.</Typography>
                        ) : (
                            salas.map((sala) => (
                                <Grid item xs={12} sm={6} md={4} key={sala.id}>
                                    <Card
                                        onClick={() => setSelectedSala(sala)}
                                        sx={{
                                            cursor: "pointer",
                                            backgroundColor: selectedSala?.id === sala.id
                                                ? "#90caf9"
                                                : sala.ocupada
                                                    ? "#f28b82"
                                                    : "#ccff90",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "scale(1.02)",
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6">
                                                {sala.nome}
                                            </Typography>
                                            <Typography>
                                                Capacidade: {sala.capacidade}
                                            </Typography>
                                            <Typography>
                                                Status: {sala.ocupada ? "Ocupada" : "Livre"}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
            </Grid>

            {selectedSala ? (
                <Box>
                    <RoomCalendar/>
                </Box>
            ) : (
                <Typography variant="body1" color="text.secondary">
                    Selecione uma sala para visualizar o calendário de reservas.
                </Typography>
            )}
            <FloatingButton
                icon={<AddIcon />}
                text="Nova Reserva"
                onClick={() => setOpenModal(true)}
            />
            <ReservationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                salas={salas}
                selectedSala={selectedSala}
                onSave={handleSaveReservation}
            />
        </Box>
    );
}
