import { useState } from 'react'

function JerseyBadge({ number }) {
  return (
    <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-badge bg-fifa-blue font-display text-sm font-bold tracking-tighter text-gold">
      {number}
    </span>
  )
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-line-subtle">
      <td className="px-4 py-3"><div className="h-9 w-9 rounded-badge bg-line" /></td>
      <td className="px-4 py-3"><div className="h-4 w-28 rounded bg-line" /></td>
      <td className="px-4 py-3"><div className="h-4 w-10 rounded bg-line" /></td>
      <td className="px-4 py-3"><div className="h-4 w-8 rounded bg-line" /></td>
      <td className="px-4 py-3"><div className="h-4 w-8 rounded bg-line" /></td>
      <td className="px-4 py-3"><div className="h-4 w-12 rounded bg-line" /></td>
      <td className="px-4 py-3"><div className="flex gap-2"><div className="h-7 w-14 rounded bg-line" /><div className="h-7 w-14 rounded bg-line" /></div></td>
    </tr>
  )
}

export default function EquipoList({ equipos, onEdit, onDelete, loading }) {
  const [confirmId, setConfirmId] = useState(null)

  const handleDelete = (id) => {
    setConfirmId(id)
  }

  const confirmDelete = () => {
    if (confirmId !== null) {
      onDelete(confirmId)
      setConfirmId(null)
    }
  }

  if (loading) {
    return (
      <div className="rounded-card border border-line bg-card shadow-sm">
        <div className="border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">Equipos Registrados</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-line text-left text-xs font-medium uppercase tracking-wider text-ink-faint">
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">País</th>
              <th className="px-4 py-3">FIFA</th>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Jug.</th>
              <th className="px-4 py-3">Grupo</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </tbody>
        </table>
      </div>
    )
  }

  if (equipos.length === 0) {
    return (
      <div className="rounded-card border border-line bg-card p-10 shadow-sm">
        <div className="text-center">
          <p className="text-lg font-medium text-ink-ghost">No hay equipos registrados</p>
          <p className="mt-1 text-sm text-ink-ghost">Registra equipos usando el formulario superior</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-card border border-line bg-card shadow-sm">
      <div className="border-b border-line px-6 py-4">
        <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
          Equipos Registrados
          <span className="ml-2 text-sm font-normal text-ink-ghost">({equipos.length})</span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line text-left text-xs font-medium uppercase tracking-wider text-ink-faint">
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">País</th>
              <th className="px-4 py-3">FIFA</th>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Jug.</th>
              <th className="px-4 py-3">Grupo</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((equipo) => (
              <tr key={equipo.id} className="border-b border-line-subtle transition-colors hover:bg-pitch-light/50">
                <td className="px-4 py-3">
                  <JerseyBadge number={equipo.ranking_fifa} />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-ink">{equipo.nombre}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">{equipo.codigo_FIFA}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm tabular-nums text-ink-dim">#{equipo.ranking_fifa}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm tabular-nums text-ink-dim">{equipo.cantidad_jugadores}</span>
                </td>
                <td className="px-4 py-3">
                  {equipo.grupo ? (
                    <span className="inline-flex items-center gap-1 rounded-input border border-pitch/30 bg-pitch-light px-2 py-0.5 font-display text-xs font-semibold text-pitch">
                      {equipo.grupo.nombre}
                    </span>
                  ) : (
                    <span className="text-xs text-ink-ghost">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(equipo)}
                      className="cursor-pointer rounded-input border border-line-strong px-3 py-1 text-xs font-medium text-ink-dim transition-colors hover:bg-pitch-light hover:text-ink focus:outline-none focus:ring-2 focus:ring-ring/40"
                    >
                      Editar
                    </button>
                    {confirmId === equipo.id ? (
                      <>
                        <button
                          onClick={confirmDelete}
                          className="cursor-pointer rounded-input bg-danger px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-danger/90 focus:outline-none focus:ring-2 focus:ring-ring/40"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="cursor-pointer rounded-input border border-line-strong px-3 py-1 text-xs font-medium text-ink-faint transition-colors hover:bg-pitch-light focus:outline-none focus:ring-2 focus:ring-ring/40"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleDelete(equipo.id)}
                        className="cursor-pointer rounded-input border border-danger/20 px-3 py-1 text-xs font-medium text-danger/70 transition-colors hover:bg-danger/10 focus:outline-none focus:ring-2 focus:ring-ring/40"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
