import { useState, useEffect } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Tooltip, Dialog, DialogTitle, DialogActions, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FloatingButton from "../components/FloatingButton";
import LocationModal from "../components/LocationModal";

export default function LocationsPage() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const token = localStorage.getItem("token");

    const fetchLocations = async () => {
        try {
            const res = await fetch("https://localhost:7181/api/Location", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erro ao carregar localizações");
            const data = await res.json();
            setLocations(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleNew = () => {
        setSelectedLocation(null);
        setOpenModal(true);
    };

    const handleEdit = (location) => {
        setSelectedLocation(location);
        setOpenModal(true);
    };

    const handleSave = async (payload) => {
        const url = selectedLocation
            ? `https://localhost:7181/api/Location/${selectedLocation.id}`
            : "https://localhost:7181/api/Location";
        const method = selectedLocation ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            await fetchLocations();
            setOpenModal(false);
        } else {
            alert("Erro ao salvar localização");
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `https://localhost:7181/api/Location/${confirmDelete}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (res.ok) {
                setConfirmDelete(null);
                fetchLocations();
            } else {
                alert("Erro ao excluir localização");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Lista de Localizações</Typography>

            {loading ? (
                <Typography>Carregando...</Typography>
            ) : locations.length === 0 ? (
                <Typography>Nenhuma localização encontrada.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {locations.map((loc) => (
                                <TableRow key={loc.id}>
                                    <TableCell>{loc.name}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Editar">
                                            <IconButton color="primary" onClick={() => handleEdit(loc)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                            <IconButton color="error" onClick={() => setConfirmDelete(loc.id)}>
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

            <FloatingButton text="Nova Localização" icon="+" onClick={handleNew} />

            {openModal && (
                <LocationModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    selectedLocation={selectedLocation}
                    onSave={handleSave}
                />
            )}

            <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
                <DialogTitle>Deseja realmente excluir esta localização?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(null)}>Cancelar</Button>
                    <Button color="error" variant="contained" onClick={handleDelete}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
