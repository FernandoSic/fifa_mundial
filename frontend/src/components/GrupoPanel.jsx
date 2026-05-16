import { useState } from 'react'
import { gruposAPI } from '../api'

export default function GrupoPanel({ equipos, onSaved }) {
  const [cantidad, setCantidad] = useState('')
  const [preview, setPreview] = useState(null)
  const [generando, setGenerando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleGenerar() {
    setError('')
    setSuccess('')
    setPreview(null)

    const num = Number(cantidad)
    if (!Number.isInteger(num) || num < 2) {
      setError('La cantidad de grupos debe ser un numero entero mayor a 1')
      return
    }

    try {
      setGenerando(true)
      const { data } = await gruposAPI.generar(num)
      setPreview(data)
    } catch (err) {
      setError(
        err.response?.data?.message ??
        err.response?.data?.error ??
        'Error al generar los grupos'
      )
    } finally {
      setGenerando(false)
    }
  }

  async function handleGuardar() {
    if (!preview) return

    try {
      setGuardando(true)
      setError('')
      await gruposAPI.save(preview)
      setSuccess('Grupos guardados correctamente')
      setPreview(null)
      setCantidad('')
      onSaved()
    } catch (err) {
      setError(
        err.response?.data?.message ??
        err.response?.data?.error ??
        'Error al guardar los grupos'
      )
    } finally {
      setGuardando(false)
    }
  }

  const puedeGenerar = equipos.length >= 2

  return (
    <section className="rounded-card border border-line-subtle bg-card p-6 shadow-sm">
      <h2 className="mb-4 font-display text-lg font-semibold tracking-tight text-ink">
        Generar Grupos
      </h2>

      {error ? (
        <div className="mb-4 rounded-input border border-danger/30 bg-danger/5 px-4 py-2 text-sm text-danger">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mb-4 rounded-input border border-success/30 bg-success/5 px-4 py-2 text-sm text-success">
          {success}
        </div>
      ) : null}

      <div className="flex items-end gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-ink-dim">
            Cantidad de grupos
          </label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ej: 4"
            min={2}
            disabled={!puedeGenerar}
            className="w-36 rounded-input border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-ghost focus:ring-2 focus:ring-ring/30 focus:border-ring focus:outline-none transition-colors disabled:opacity-40"
          />
        </div>
        <button
          onClick={handleGenerar}
          disabled={generando || !puedeGenerar || !cantidad}
          className="rounded-input bg-pitch px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-pitch/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60"
        >
          {generando ? 'Generando...' : 'Generar'}
        </button>
      </div>

      {!puedeGenerar ? (
        <p className="mt-2 text-xs text-ink-ghost">
          Necesitas al menos 2 equipos para generar grupos
        </p>
      ) : null}

      {preview ? (
        <div className="mt-6">
          <p className="mb-3 text-xs text-ink-ghost">
            {preview.cantidad_grupos} grupos de {preview.equipos_por_grupo} equipos cada uno
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {preview.grupos.map((grupo, i) => (
              <div
                key={i}
                className="rounded-card border border-line-subtle bg-whistle p-4"
              >
                <h3 className="mb-3 font-display text-sm font-semibold text-pitch">
                  {grupo.nombre}
                </h3>
                <ul className="space-y-1.5">
                  {grupo.equipos.map((equipo, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-ink-dim">
                      <span className="flex h-5 w-5 items-center justify-center rounded-badge bg-pitch text-[10px] font-bold text-white font-display">
                        {equipo.ranking_fifa}
                      </span>
                      {equipo.nombre}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className="rounded-input bg-success px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60"
            >
              {guardando ? 'Guardando...' : 'Guardar Grupos'}
            </button>
            <button
              onClick={handleGenerar}
              disabled={generando}
              className="rounded-input border border-line px-5 py-2 text-sm font-medium text-ink-dim transition-colors hover:bg-line-subtle focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              Volver a generar
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
