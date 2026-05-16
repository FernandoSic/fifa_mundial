const prisma = require('../config/prisma')
const { validarGrupo, validarFormacionDeGrupos } = require('../validations/grupo.validation')

function mezclarArregloAleatoriamente(arreglo) {
    const copia = [...arreglo]

    for (let indice = copia.length - 1; indice > 0; indice -= 1) {
        const indiceAleatorio = Math.floor(Math.random() * (indice + 1))
        const temporal = copia[indice]
        copia[indice] = copia[indiceAleatorio]
        copia[indiceAleatorio] = temporal
    }

    return copia
}

function obtenerNombreGrupo(indice) {
    return `Grupo ${String.fromCharCode(65 + indice)}`
}

const generarGrupos= async (cantidadGrupos) => {
    const equipos = await prisma.equipo.findMany({
        orderBy: {
            id: 'asc',
        },
    })

    const { errores, datosSanitizados } = validarFormacionDeGrupos({
        cantidad_grupos: cantidadGrupos,
        equipos,
    })

    if (errores.length > 0) {
        throw new Error(`No se pueden generar los grupos: ${errores.join(', ')}`)
    }

    const equiposMezclados = mezclarArregloAleatoriamente(datosSanitizados.equipos)
    const cantidadEquiposPorGrupo = equiposMezclados.length / datosSanitizados.cantidad_grupos

    const grupos = []

    for (let indice = 0; indice < datosSanitizados.cantidad_grupos; indice += 1) {
        const inicio = indice * cantidadEquiposPorGrupo
        const fin = inicio + cantidadEquiposPorGrupo

        grupos.push({
            nombre: obtenerNombreGrupo(indice),
            equipos: equiposMezclados.slice(inicio, fin),
        })
    }

    return {
        cantidad_grupos: datosSanitizados.cantidad_grupos,
        cantidad_equipos: equiposMezclados.length,
        equipos_por_grupo: cantidadEquiposPorGrupo,
        grupos,
    }
}

const getGrupos = async () => {
    const grupos = await prisma.grupo.findMany({
        include: {
            equipos: true,
        },
    })
    return grupos
}

const getGrupoById = async (id) => {
    if (!Number.isInteger(Number(id))) {
        throw new Error('ID de grupo invalido')
    }
    const grupo = await prisma.grupo.findUnique({
        where: { id: Number(id) },
        include: {
            equipos: true,
        },
    })
    return grupo
}

const createGrupo = async (data) => {
    const { errores, datosSanitizados } = validarGrupo(data)

    if (errores.length > 0) {
        throw new Error(`Datos de grupo invalidos: ${errores.join(', ')}`)
    }

    return await prisma.grupo.create({
        data: {
            nombre: datosSanitizados.nombre,
            description: datosSanitizados.description,
        },
    })
}

const updateGrupo = async (id, data) => {
    if (!Number.isInteger(Number(id))) {
        throw new Error('ID de grupo invalido')
    }

    const { errores, datosSanitizados } = validarGrupo(data)

    if (errores.length > 0) {
        throw new Error(`Datos de grupo invalidos: ${errores.join(', ')}`)
    }

    return await prisma.grupo.update({
        where: { id: Number(id) },
        data: {
            nombre: datosSanitizados.nombre,
            description: datosSanitizados.description,
        },
    })
}

const deleteGrupo = async (id) => {
    if (!Number.isInteger(Number(id))) {
        throw new Error('ID de grupo invalido')
    }
    return await prisma.grupo.delete({
        where: { id: Number(id) },
    })
}

const saveGrupos = async (data) => {
    const { cantidad_grupos, grupos } = data

    if (!Array.isArray(grupos) || grupos.length === 0) {
        throw new Error('Debe enviar los grupos generados para guardar')
    }

    if (!Number.isInteger(Number(cantidad_grupos)) || Number(cantidad_grupos) !== grupos.length) {
        throw new Error('La cantidad de grupos no coincide con los grupos enviados')
    }

    await prisma.$transaction(async (tx) => {
        await tx.equipo.updateMany({
            data: { grupoId: null },
        })

        await tx.grupo.deleteMany()

        for (const grupo of grupos) {
            const grupoCreado = await tx.grupo.create({
                data: {
                    nombre: grupo.nombre,
                },
            })

            if (Array.isArray(grupo.equipos) && grupo.equipos.length > 0) {
                await tx.equipo.updateMany({
                    where: {
                        id: { in: grupo.equipos.map((e) => e.id) },
                    },
                    data: {
                        grupoId: grupoCreado.id,
                    },
                })
            }
        }
    })

    return await prisma.grupo.findMany({
        include: { equipos: true },
    })
}

module.exports = {
    generarGrupos,
    saveGrupos,
    createGrupo,
    getGrupos,
    getGrupoById,
    updateGrupo,
    deleteGrupo,
}
