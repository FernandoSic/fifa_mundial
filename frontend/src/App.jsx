import { useState, useEffect, useCallback } from 'react'
import { equiposAPI, gruposAPI } from './api'
import EquipoForm from './components/EquipoForm'
import EquipoList from './components/EquipoList'
import GrupoPanel from './components/GrupoPanel'
import GrupoList from './components/GrupoList'

export default function App() {
  const [equipos, setEquipos] = useState([])
  const [gruposBD, setGruposBD] = useState([])
  const [editingEquipo, setEditingEquipo] = useState(null)
  const [loadingEquipos, setLoadingEquipos] = useState(true)
  const [loadingGrupos, setLoadingGrupos] = useState(true)
  const [errorGrupos, setErrorGrupos] = useState('')

  const fetchData = useCallback(async () => {
    try {
      setLoadingEquipos(true)
      const equiposRes = await equiposAPI.getAll()
      setEquipos(equiposRes.data)
    } catch (err) {
      console.error('Error al cargar equipos:', err)
    } finally {
      setLoadingEquipos(false)
    }
  }, [])

  const fetchGrupos = useCallback(async () => {
    try {
      setLoadingGrupos(true)
      setErrorGrupos('')
      const gruposRes = await gruposAPI.getAll()
      setGruposBD(gruposRes.data)
    } catch (err) {
      setErrorGrupos('Error al cargar los grupos guardados')
    } finally {
      setLoadingGrupos(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    fetchGrupos()
  }, [fetchData, fetchGrupos])

  const handleCreate = useCallback(async (data) => {
    try {
      await equiposAPI.create(data)
      await fetchData()
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear el equipo'
      throw new Error(msg)
    }
  }, [fetchData])

  const handleUpdate = useCallback(async (data) => {
    if (!editingEquipo) return
    try {
      await equiposAPI.update(editingEquipo.id, data)
      setEditingEquipo(null)
      await fetchData()
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al actualizar el equipo'
      throw new Error(msg)
    }
  }, [editingEquipo, fetchData])

  const handleDelete = useCallback(async (id) => {
    try {
      await equiposAPI.remove(id)
      setEquipos((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }, [])

  const handleEdit = useCallback((equipo) => {
    setEditingEquipo(equipo)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleCancelEdit = useCallback(() => {
    setEditingEquipo(null)
  }, [])

  const handleGruposSaved = useCallback(() => {
    fetchData()
    fetchGrupos()
    setEditingEquipo(null)
  }, [fetchData, fetchGrupos])

  return (
    <div className="min-h-screen bg-whistle">
      <header className="border-b border-line-subtle bg-card">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="font-display text-xl font-bold tracking-tight text-ink">
            FIFA Mundial
            <span className="ml-2 text-sm font-normal text-ink-ghost">Generador de Grupos</span>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-6">
        <EquipoForm
          key={editingEquipo?.id ?? 'new'}
          onSubmit={editingEquipo ? handleUpdate : handleCreate}
          editingEquipo={editingEquipo}
          onCancel={handleCancelEdit}
        />

        <EquipoList
          equipos={equipos}
          loading={loadingEquipos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <GrupoPanel
          equipos={equipos}
          onSaved={handleGruposSaved}
        />

        <GrupoList
          grupos={gruposBD}
          loading={loadingGrupos}
          error={errorGrupos}
        />
      </main>
    </div>
  )
}
