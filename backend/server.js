require('dotenv').config()

const app = require('./src/app')
const prisma = require('./src/config/prisma')

const PORT = process.env.PORT || 3000

async function main() {
    try {
        await prisma.$connect()
        console.log('Conexion a la base de datos exitosa')

        app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`)
        })
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error)
    }
}

main()