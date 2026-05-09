const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// CORRECCIÓN 1: Configuración de CORS total para evitar bloqueos en el navegador
app.use(cors({
    origin: '*',
    methods: ['GET']
}));

const AA2000_API = 'https://vuelos.aa2000.com.ar/api/v1/vuelos/COR';

// CORRECCIÓN 2: Usar la ruta raíz '/' para que sea más fácil de llamar desde la App
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(AA2000_API, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });
        
        // Enviamos los datos tal cual vienen de la fuente oficial
        res.json(response.data);
    } catch (error) {
        console.error("Error al obtener datos:", error.message);
        res.status(500).json({ error: "No se pudo conectar con la fuente oficial" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));
