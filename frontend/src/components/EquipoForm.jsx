import { useState } from 'react'

const INITIAL = {
  nombre: '',
  codigo_FIFA: '',
  nombre_tecnico: '',
  cantidad_jugadores: '',
  ranking_fifa: '',
}

export default function EquipoForm({ onSubmit, editingEquipo, onCancel }) {
  const [form, setForm] = useState(() => {
    if (editingEquipo) {
      return {
        nombre: editingEquipo.nombre,
        codigo_FIFA: editingEquipo.codigo_FIFA,
        nombre_tecnico: editingEquipo.nombre_tecnico,
        cantidad_jugadores: String(editingEquipo.cantidad_jugadores),
        ranking_fifa: String(editingEquipo.ranking_fifa),
      }
    }
    return { ...INITIAL }
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio'
    if (!form.codigo_FIFA.trim()) {
      errs.codigo_FIFA = 'El código FIFA es obligatorio'
    } else if (form.codigo_FIFA.trim().length !== 3) {
      errs.codigo_FIFA = 'El código FIFA debe tener 3 caracteres'
    }
    if (!form.nombre_tecnico.trim()) errs.nombre_tecnico = 'El nombre del técnico es obligatorio'
    const jugadores = parseInt(form.cantidad_jugadores, 10)
    if (isNaN(jugadores) || jugadores < 23 || jugadores > 26) {
      errs.cantidad_jugadores = 'Debe ser entre 23 y 26 jugadores'
    }
    const ranking = parseInt(form.ranking_fifa, 10)
    if (isNaN(ranking) || ranking <= 0) {
      errs.ranking_fifa = 'El ranking debe ser un número positivo'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      await onSubmit({
        nombre: form.nombre.trim(),
        codigo_FIFA: form.codigo_FIFA.trim().toUpperCase(),
        nombre_tecnico: form.nombre_tecnico.trim(),
        cantidad_jugadores: parseInt(form.cantidad_jugadores, 10),
        ranking_fifa: parseInt(form.ranking_fifa, 10),
      })
      setForm({ ...INITIAL })
      setErrors({})
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Error al guardar el equipo'
      setErrors({ general: msg })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setForm({ ...INITIAL })
    setErrors({})
    if (onCancel) onCancel()
  }

  const isEditing = editingEquipo !== null && editingEquipo !== undefined

  return (
    <div className="rounded-card border border-line bg-card p-6 shadow-sm">
      <h2 className="mb-4 font-display text-lg font-semibold tracking-tight text-ink">
        {isEditing ? 'Editar Equipo' : 'Registrar Equipo'}
      </h2>

      {errors.general ? (
        <div className="mb-4 rounded-input border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
          {errors.general}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink-dim">País</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`w-full rounded-input border bg-card px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring/30 focus:border-ring ${
                errors.nombre ? 'border-danger' : 'border-line-strong'
              }`}
              placeholder="Brasil"
            />
            {errors.nombre ? <p className="mt-1 text-xs text-danger">{errors.nombre}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink-dim">Código FIFA</label>
            <input
              type="text"
              name="codigo_FIFA"
              value={form.codigo_FIFA}
              onChange={handleChange}
              maxLength={3}
              className={`w-full rounded-input border bg-card px-3 py-2 font-mono text-sm uppercase tracking-wider outline-none transition-colors focus:ring-2 focus:ring-ring/30 focus:border-ring ${
                errors.codigo_FIFA ? 'border-danger' : 'border-line-strong'
              }`}
              placeholder="BRA"
            />
            {errors.codigo_FIFA ? <p className="mt-1 text-xs text-danger">{errors.codigo_FIFA}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink-dim">Nombre del Técnico</label>
            <input
              type="text"
              name="nombre_tecnico"
              value={form.nombre_tecnico}
              onChange={handleChange}
              className={`w-full rounded-input border bg-card px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring/30 focus:border-ring ${
                errors.nombre_tecnico ? 'border-danger' : 'border-line-strong'
              }`}
              placeholder="Tite"
            />
            {errors.nombre_tecnico ? <p className="mt-1 text-xs text-danger">{errors.nombre_tecnico}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink-dim">Cantidad de Jugadores</label>
            <input
              type="number"
              name="cantidad_jugadores"
              value={form.cantidad_jugadores}
              onChange={handleChange}
              min={23}
              max={26}
              className={`w-full rounded-input border bg-card px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring/30 focus:border-ring ${
                errors.cantidad_jugadores ? 'border-danger' : 'border-line-strong'
              }`}
              placeholder="26"
            />
            {errors.cantidad_jugadores ? <p className="mt-1 text-xs text-danger">{errors.cantidad_jugadores}</p> : null}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-ink-dim">Ranking FIFA</label>
            <input
              type="number"
              name="ranking_fifa"
              value={form.ranking_fifa}
              onChange={handleChange}
              min={1}
              className={`w-full rounded-input border bg-card px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring/30 focus:border-ring sm:max-w-[240px] ${
                errors.ranking_fifa ? 'border-danger' : 'border-line-strong'
              }`}
              placeholder="1"
            />
            {errors.ranking_fifa ? <p className="mt-1 text-xs text-danger">{errors.ranking_fifa}</p> : null}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-input bg-pitch px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-pitch/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Equipo'}
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer rounded-input border border-line-strong bg-card px-5 py-2 text-sm font-medium text-ink-dim transition-colors hover:bg-pitch-light focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              Cancelar
            </button>
          ) : null}
        </div>
      </form>
    </div>
  )
}
