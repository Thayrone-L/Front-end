import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FloatingButton from "../components/FloatingButton";
import ReservationModal from "../components/ReservationModal";

export default function ReservationsPage() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [salas, setSalas] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const token = localStorage.getItem("token");

    const fetchReservas = async () => {
        try {
            const res = await fetch("https://localhost:7181/api/Reservation", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erro ao carregar reservas");
            const data = await res.json();
            setReservas(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSalas = async () => {
        try {
            const res = await fetch("https://localhost:7181/api/Room", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setSalas(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchReservas();
        fetchSalas();
    }, []);

    const handleNew = () => {
        setSelectedReserva(null);
        setOpenModal(true);
    };

    const handleEdit = async (reservaId) => {
        try {
            const res = await fetch(`https://localhost:7181/api/Reservation/${reservaId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erro ao buscar reserva");
            const data = await res.json();
            setSelectedReserva(data);
            setOpenModal(true);
        } catch (err) {
            console.error(err);
            alert("Erro ao carregar reserva para edição");
        }
    };

    const handleSave = async (payload) => {
        const url = selectedReserva
            ? `https://localhost:7181/api/Reservation/${selectedReserva.id}`
            : "https://localhost:7181/api/Reservation";
        const method = selectedReserva ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            await fetchReservas();
            setOpenModal(false);
        } else {
            alert("Erro ao salvar reserva");
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `https://localhost:7181/api/Reservation/${confirmDelete}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.ok) {
                setConfirmDelete(null);
                fetchReservas();
            } else {
                alert("Erro ao excluir reserva");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Lista de Reservas
            </Typography>

            {loading ? (
                <Typography>Carregando...</Typography>
            ) : reservas.length === 0 ? (
                <Typography>Nenhuma reserva encontrada.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sala</TableCell>
                                <TableCell>Responsável</TableCell>
                                <TableCell>Início</TableCell>
                                <TableCell>Término</TableCell>
                                <TableCell>Café?</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservas.map((reserva) => (
                                <TableRow key={reserva.id}>
                                    <TableCell>{reserva.roomName || "–"}</TableCell>
                                    <TableCell>{reserva.responsible}</TableCell>
                                    <TableCell>
                                        {new Date(reserva.startTime).toLocaleString("pt-BR")}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(reserva.endTime).toLocaleString("pt-BR")}
                                    </TableCell>
                                    <TableCell>{reserva.coffeeRequested ? "Sim" : "Não"}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Editar">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(reserva.id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton
                                                color="error"
                                                onClick={() => setConfirmDelete(reserva.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <FloatingButton text="Nova reserva" icon="+" onClick={handleNew} />

            {openModal && (
                <ReservationModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    salas={salas}
                    selectedReserva={selectedReserva}
                    onSave={handleSave}
                />
            )}

            <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
                <DialogTitle>Deseja realmente excluir esta reserva?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(null)}>Cancelar</Button>
                    <Button color="error" variant="contained" onClick={handleDelete}>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
