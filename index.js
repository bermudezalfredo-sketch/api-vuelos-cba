const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Endpoint de AA2000 para Córdoba (COR)
const AA2000_API = 'https://vuelos.aa2000.com.ar/api/v1/vuelos/COR';

app.get('/vuelos', async (req, res) => {
    try {
        const response = await axios.get(AA2000_API, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        // La API de AA2000 devuelve un objeto con 'arribos' y 'partidas'
        const { arribos, partidas } = response.data;
        
        // Si el usuario pide /vuelos?tipo=partidas, filtramos, si no mandamos todo
        const tipo = req.query.tipo;
        if (tipo === 'arribos') return res.json(arribos);
        if (tipo === 'partidas') return res.json(partidas);

        res.json({ arribos, partidas });
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener la información de vuelos" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));