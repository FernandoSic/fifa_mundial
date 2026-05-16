const express = require('express')
const cors = require('cors')

const app = express()

const equipoRoutes = require('./routes/equipo.routes')
const grupoRoutes = require('./routes/grupo.routes')

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    })
)

app.use(express.json())

app.use('/equipos', equipoRoutes)
app.use('/grupos', grupoRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'FIFA Mundial API funcionando',
    })
})

module.exports = app
