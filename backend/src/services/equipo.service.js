const prisma = require('../config/prisma')
const { validarEquipo } = require('../validations/equipo.validation')

function construirDatosEquipo(datosSanitizados, esCreacion = false) {
    return {
        nombre: datosSanitizados.nombre,
        codigo_FIFA: datosSanitizados.codigo_FIFA,
        nombre_tecnico: datosSanitizados.nombre_tecnico,
        cantidad_jugadores: datosSanitizados.cantidad_jugadores,
        ranking_fifa: datosSanitizados.ranking_fifa,
        grupoId: esCreacion ? null : datosSanitizados.grupoId,
    }
}

const createEquipo = async (data) => {
    const { errores, datosSanitizados } = validarEquipo(data)

    if (errores.length > 0) {
        throw new Error(`Datos de equipo invalidos: ${errores.join(', ')}`)
    }

    const equipo = await prisma.equipo.create({
        data: construirDatosEquipo(datosSanitizados, true)
    })

    return equipo
}

const getEquipos = async () => {
    const equipos = await prisma.equipo.findMany({
        include: {
            grupo: true,
        },
    })
    return equipos
}

const getEquipoById = async (id) => {
    if (!Number.isInteger(Number(id))) {
        throw new Error('ID de equipo invalido')
    }
    const equipo = await prisma.equipo.findUnique({
        where: { id: Number(id) },
        include: {
            grupo: true,
        },
    })
    return equipo
}

const updateEquipo = async (id, data) => {
    const { errores, datosSanitizados } = validarEquipo(data)

    if (errores.length > 0) {
        throw new Error(`Datos de equipo invalidos: ${errores.join(', ')}`)
    }

    return await prisma.equipo.update({
        where: { id: Number(id) },
        data: construirDatosEquipo(datosSanitizados),
    })
}

const deleteEquipo = async (id) => {
    if (!Number.isInteger(Number(id))) {
        throw new Error('ID de equipo invalido')
    }
    return await prisma.equipo.delete({
        where: { id: Number(id) },
    })
}

module.exports = {
    createEquipo,
    getEquipos,
    getEquipoById,
    updateEquipo,
    deleteEquipo
}
