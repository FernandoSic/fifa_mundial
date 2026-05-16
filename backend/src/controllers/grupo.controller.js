const { generarGrupos, createGrupo, getGrupos, getGrupoById, updateGrupo, deleteGrupo, saveGrupos } = require('../services/grupo.service')

const generate = async (req, res) => {
    try {
        const resultado = await generarGrupos(req.body.cantidad_grupos)
        res.json(resultado)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const save = async (req, res) => {
    try {
        const resultado = await saveGrupos(req.body)
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const create = async (req, res) => {
    try {
        const grupo = await createGrupo(req.body)
        res.status(201).json(grupo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const grupo = await updateGrupo(req.params.id, req.body)
        res.json({
            message: 'Grupo actualizado exitosamente',
            grupo,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const remove = async (req, res) => {
    try {
        const grupo = await deleteGrupo(req.params.id)
        res.json({
            message: 'Grupo eliminado exitosamente',
            grupo,
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAll = async (req, res) => {
    try {
        const grupos = await getGrupos()
        res.json(grupos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getById = async (req, res) => {
    try {
        const grupo = await getGrupoById(req.params.id)
        res.json(grupo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = {
    generate,
    save,
    create,
    update,
    remove,
    getAll,
    getById,
}
