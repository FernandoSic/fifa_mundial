const { getEquipoById, createEquipo, getEquipos, deleteEquipo, updateEquipo } = require('../services/equipo.service')

const create = async (req, res) => {
    try {
        const equipo = await createEquipo(req.body)
        res.status(201).json(equipo)
    } catch (error) {
        console.error('Error en create equipo:', error)
        res.status(400).json({ message: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const equipos = await getEquipos()
        res.json(equipos)
    } catch (error) {
        console.error('Error en getAll equipos:', error)
        res.status(500).json({ message: error.message })
    }
}

const getById = async (req, res) => {
    try {
        const equipo = await getEquipoById(req.params.id)
        res.json(equipo)
    } catch (error) {
        console.error('Error en getById equipo:', error)
        res.status(404).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const equipo = await updateEquipo(req.params.id, req.body)
        res.json({
            message: 'Equipo actualizado exitosamente',
            equipo,
        })
    } catch (error) {
        console.error('Error en update equipo:', error)
        res.status(400).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        const equipo = await deleteEquipo(req.params.id)
        res.json({
            message: 'Equipo eliminado exitosamente',
            equipo,
        })
    } catch (error) {
        console.error('Error en remove equipo:', error)
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
}