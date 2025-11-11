import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate("/dashboard");
        } else {
            alert("Usuário ou senha incorretos");
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
                <Typography variant="h5" mb={2}>Login</Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TextField
                        label="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </form>
            </Paper>
        </Box>
    );
}

export default LoginPage;
