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
import RoomModal from "../components/RoomModal";

export default function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const token = localStorage.getItem("token");

    const fetchRooms = async () => {
        try {
            const res = await fetch("https://localhost:7181/api/Room", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erro ao carregar salas");
            const data = await res.json();
            setRooms(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLocations = async () => {
        try {
            const res = await fetch("https://localhost:7181/api/Location", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setLocations(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRooms();
        fetchLocations();
    }, []);

    const handleNew = () => {
        setSelectedRoom(null);
        setOpenModal(true);
    };

    const handleEdit = (room) => {
        setSelectedRoom(room);
        setOpenModal(true);
    };

    const handleSave = async (payload) => {
        const url = selectedRoom
            ? `https://localhost:7181/api/Room/${selectedRoom.id}`
            : "https://localhost:7181/api/Room";
        const method = selectedRoom ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            await fetchRooms();
            setOpenModal(false);
        } else {
            alert("Erro ao salvar sala");
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `https://localhost:7181/api/Room/${confirmDelete}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.ok) {
                setConfirmDelete(null);
                fetchRooms();
            } else {
                alert("Erro ao excluir sala");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Lista de Salas
            </Typography>

            {loading ? (
                <Typography>Carregando...</Typography>
            ) : rooms.length === 0 ? (
                <Typography>Nenhuma sala encontrada.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Localização</TableCell>
                                <TableCell>Capacidade</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms.map((room) => (
                                <TableRow key={room.id}>
                                    <TableCell>{room.name}</TableCell>
                                    <TableCell>{room.locationName}</TableCell>
                                    <TableCell>{room.capacity}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Editar">
                                            <IconButton color="primary" onClick={() => handleEdit(room)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton color="error" onClick={() => setConfirmDelete(room.id)}>
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

            <FloatingButton text="Nova sala" icon="+" onClick={handleNew} />

            {openModal && (
                <RoomModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    selectedRoom={selectedRoom}
                    locations={locations}
                    onSave={handleSave}
                />
            )}

            <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
                <DialogTitle>Deseja realmente excluir esta sala?</DialogTitle>
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
