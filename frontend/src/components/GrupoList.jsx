export default function GrupoList({ grupos, loading, error }) {
  if (error) {
    return (
      <section className="rounded-[--radius-card] border border-line-subtle bg-card p-6 shadow-sm">
        <h2 className="mb-2 font-display text-lg font-semibold tracking-tight text-ink">
          Grupos Formados
        </h2>
        <p className="text-sm text-danger">{error}</p>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="rounded-[--radius-card] border border-line-subtle bg-card p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="mb-4 h-6 w-40 rounded bg-line" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-[--radius-card] border border-line-subtle bg-whistle p-4">
                <div className="mb-3 h-4 w-20 rounded bg-line" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-line" />
                  <div className="h-3 w-3/4 rounded bg-line" />
                  <div className="h-3 w-5/6 rounded bg-line" />
                  <div className="h-3 w-2/3 rounded bg-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!grupos || grupos.length === 0) return null

  const totalEquipos = grupos.reduce((sum, g) => sum + (g.equipos?.length ?? 0), 0)

  return (
    <section className="rounded-[--radius-card] border border-line-subtle bg-card p-6 shadow-sm">
      <h2 className="mb-4 font-display text-lg font-semibold tracking-tight text-ink">
        Grupos Formados
        <span className="ml-2 text-sm font-normal text-ink-ghost">
          ({grupos.length} grupos - {totalEquipos} equipos)
        </span>
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {grupos.map((grupo) => (
          <div
            key={grupo.id}
            className="rounded-[--radius-card] border border-line-subtle bg-whistle p-4"
          >
            <h3 className="mb-3 font-display text-sm font-semibold text-pitch">
              {grupo.nombre}
            </h3>
            <ul className="space-y-1.5">
              {grupo.equipos?.map((equipo) => (
                <li key={equipo.id} className="flex items-center gap-2 text-sm text-ink-dim">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pitch text-[10px] font-bold text-white font-display">
                    {equipo.ranking_fifa}
                  </span>
                  {equipo.nombre}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
