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
import ReservationModal from "../components/ReservationModal";

export default function DashboardPage() {
    const [salas, setSalas] = useState(null);
    const [selectedSala, setSelectedSala] = useState(null);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

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
                    setSelectedSala(data[0]);
                }
            } catch (err) {
                setError(err.message);
                setSalas([]);
            }
        };

        fetchSalas();
    }, []);

    const handleNovaReserva = () => setOpenModal(true);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Painel de Salas
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <Grid container spacing={2} sx={{ mb: 3 }}>
                {salas === null ? (
                    Array.from({ length: 6 }).map((_, i) => (
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
                ) : salas.length === 0 ? (
                    <Typography>Nenhuma sala cadastrada.</Typography>
                ) : (
                    salas.map((sala) => (
                        <Grid item xs={12} sm={6} md={4} key={sala.id}>
                            <Card
                                onClick={() => setSelectedSala(sala)}
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor:
                                        selectedSala?.id === sala.id
                                            ? "#90caf9"
                                            : "#ccff90",
                                    transition: "0.3s",
                                    "&:hover": { transform: "scale(1.02)" },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{sala.name}</Typography>
                                    <Typography>
                                        Local: {sala.locationName}
                                    </Typography>
                                    <Typography>
                                        Capacidade: {sala.capacity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {selectedSala ? (
                <Box>
                    <RoomCalendar selectedSala={selectedSala} />
                </Box>
            ) : (
                <Typography variant="body1" color="text.secondary">
                    Selecione uma sala para visualizar o calendário de reservas.
                </Typography>
            )}

            <FloatingButton
                text="Nova reserva"
                icon="+"
                onClick={handleNovaReserva}
            />

            <ReservationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                selectedSala={selectedSala}
                onSave={(data) => console.log("Salvar reserva:", data)}
            />
        </Box>
    );
}