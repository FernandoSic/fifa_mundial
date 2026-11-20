require('dotenv').config()

const prisma = require('../src/config/prisma')
const { validarEquipo } = require('../src/validations/equipo.validation')

// Datos de demostracion: selecciones clasificadas al Mundial 2026 con su tecnico
// a finales de 2025 y un ranking FIFA aproximado. No incluye los cupos de repechaje.
const equipos = [
    // Anfitriones
    { nombre: 'Estados Unidos', codigo_FIFA: 'USA', nombre_tecnico: 'Mauricio Pochettino', ranking_fifa: 14 },
    { nombre: 'Mexico', codigo_FIFA: 'MEX', nombre_tecnico: 'Javier Aguirre', ranking_fifa: 15 },
    { nombre: 'Canada', codigo_FIFA: 'CAN', nombre_tecnico: 'Jesse Marsch', ranking_fifa: 27 },

    // Concacaf
    { nombre: 'Panama', codigo_FIFA: 'PAN', nombre_tecnico: 'Thomas Christiansen', ranking_fifa: 30 },
    { nombre: 'Haiti', codigo_FIFA: 'HAI', nombre_tecnico: 'Sebastien Migne', ranking_fifa: 84 },
    { nombre: 'Curazao', codigo_FIFA: 'CUW', nombre_tecnico: 'Dick Advocaat', ranking_fifa: 82 },

    // Conmebol
    { nombre: 'Argentina', codigo_FIFA: 'ARG', nombre_tecnico: 'Lionel Scaloni', ranking_fifa: 2 },
    { nombre: 'Brasil', codigo_FIFA: 'BRA', nombre_tecnico: 'Carlo Ancelotti', ranking_fifa: 5 },
    { nombre: 'Colombia', codigo_FIFA: 'COL', nombre_tecnico: 'Nestor Lorenzo', ranking_fifa: 13 },
    { nombre: 'Uruguay', codigo_FIFA: 'URU', nombre_tecnico: 'Marcelo Bielsa', ranking_fifa: 16 },
    { nombre: 'Ecuador', codigo_FIFA: 'ECU', nombre_tecnico: 'Sebastian Beccacece', ranking_fifa: 23 },
    { nombre: 'Paraguay', codigo_FIFA: 'PAR', nombre_tecnico: 'Gustavo Alfaro', ranking_fifa: 37 },

    // UEFA
    { nombre: 'Espana', codigo_FIFA: 'ESP', nombre_tecnico: 'Luis de la Fuente', ranking_fifa: 1 },
    { nombre: 'Francia', codigo_FIFA: 'FRA', nombre_tecnico: 'Didier Deschamps', ranking_fifa: 3 },
    { nombre: 'Inglaterra', codigo_FIFA: 'ENG', nombre_tecnico: 'Thomas Tuchel', ranking_fifa: 4 },
    { nombre: 'Portugal', codigo_FIFA: 'POR', nombre_tecnico: 'Roberto Martinez', ranking_fifa: 6 },
    { nombre: 'Paises Bajos', codigo_FIFA: 'NED', nombre_tecnico: 'Ronald Koeman', ranking_fifa: 7 },
    { nombre: 'Belgica', codigo_FIFA: 'BEL', nombre_tecnico: 'Rudi Garcia', ranking_fifa: 8 },
    { nombre: 'Alemania', codigo_FIFA: 'GER', nombre_tecnico: 'Julian Nagelsmann', ranking_fifa: 9 },
    { nombre: 'Croacia', codigo_FIFA: 'CRO', nombre_tecnico: 'Zlatko Dalic', ranking_fifa: 10 },
    { nombre: 'Suiza', codigo_FIFA: 'SUI', nombre_tecnico: 'Murat Yakin', ranking_fifa: 17 },
    { nombre: 'Austria', codigo_FIFA: 'AUT', nombre_tecnico: 'Ralf Rangnick', ranking_fifa: 24 },
    { nombre: 'Noruega', codigo_FIFA: 'NOR', nombre_tecnico: 'Stale Solbakken', ranking_fifa: 29 },
    { nombre: 'Escocia', codigo_FIFA: 'SCO', nombre_tecnico: 'Steve Clarke', ranking_fifa: 36 },

    // CAF
    { nombre: 'Marruecos', codigo_FIFA: 'MAR', nombre_tecnico: 'Walid Regragui', ranking_fifa: 11 },
    { nombre: 'Senegal', codigo_FIFA: 'SEN', nombre_tecnico: 'Pape Thiaw', ranking_fifa: 19 },
    { nombre: 'Egipto', codigo_FIFA: 'EGY', nombre_tecnico: 'Hossam Hassan', ranking_fifa: 32 },
    { nombre: 'Argelia', codigo_FIFA: 'ALG', nombre_tecnico: 'Vladimir Petkovic', ranking_fifa: 35 },
    { nombre: 'Tunez', codigo_FIFA: 'TUN', nombre_tecnico: 'Sami Trabelsi', ranking_fifa: 40 },
    { nombre: 'Costa de Marfil', codigo_FIFA: 'CIV', nombre_tecnico: 'Emerse Fae', ranking_fifa: 41 },
    { nombre: 'Sudafrica', codigo_FIFA: 'RSA', nombre_tecnico: 'Hugo Broos', ranking_fifa: 60 },
    { nombre: 'Cabo Verde', codigo_FIFA: 'CPV', nombre_tecnico: 'Pedro Leitao Brito', ranking_fifa: 68 },
    { nombre: 'Ghana', codigo_FIFA: 'GHA', nombre_tecnico: 'Otto Addo', ranking_fifa: 72 },

    // AFC
    { nombre: 'Japon', codigo_FIFA: 'JPN', nombre_tecnico: 'Hajime Moriyasu', ranking_fifa: 18 },
    { nombre: 'Iran', codigo_FIFA: 'IRN', nombre_tecnico: 'Amir Ghalenoei', ranking_fifa: 20 },
    { nombre: 'Corea del Sur', codigo_FIFA: 'KOR', nombre_tecnico: 'Hong Myung-bo', ranking_fifa: 22 },
    { nombre: 'Australia', codigo_FIFA: 'AUS', nombre_tecnico: 'Tony Popovic', ranking_fifa: 26 },
    { nombre: 'Uzbekistan', codigo_FIFA: 'UZB', nombre_tecnico: 'Fabio Cannavaro', ranking_fifa: 52 },
    { nombre: 'Catar', codigo_FIFA: 'QAT', nombre_tecnico: 'Julen Lopetegui', ranking_fifa: 53 },
    { nombre: 'Arabia Saudita', codigo_FIFA: 'KSA', nombre_tecnico: 'Herve Renard', ranking_fifa: 59 },
    { nombre: 'Jordania', codigo_FIFA: 'JOR', nombre_tecnico: 'Jamal Sellami', ranking_fifa: 64 },

    // OFC
    { nombre: 'Nueva Zelanda', codigo_FIFA: 'NZL', nombre_tecnico: 'Darren Bazeley', ranking_fifa: 86 },
]

async function main() {
    for (const equipo of equipos) {
        const { errores, datosSanitizados } = validarEquipo({ ...equipo, cantidad_jugadores: 26 })

        if (errores.length > 0) {
            throw new Error(`Equipo ${equipo.codigo_FIFA} invalido: ${errores.join(', ')}`)
        }

        // upsert por codigo FIFA: la semilla se puede ejecutar varias veces sin duplicar
        // y no cambia el grupo que ya tenga asignado el equipo
        const { grupoId, ...datos } = datosSanitizados

        await prisma.equipo.upsert({
            where: { codigo_FIFA: datos.codigo_FIFA },
            update: datos,
            create: datos,
        })
    }

    console.log(`Semilla completada: ${equipos.length} equipos`)
}

main()
    .catch((error) => {
        console.error('Error al ejecutar la semilla:', error)
        process.exitCode = 1
    })
    .finally(() => prisma.$disconnect())
