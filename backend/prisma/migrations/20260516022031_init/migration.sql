-- CreateTable
CREATE TABLE "Equipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo_FIFA" TEXT NOT NULL,
    "nombre_tecnico" TEXT NOT NULL,
    "cantidad_jugadores" INTEGER NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ranking_fifa" INTEGER NOT NULL,
    "grupoId" INTEGER,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "description" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_nombre_key" ON "Equipo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Equipo_codigo_FIFA_key" ON "Equipo"("codigo_FIFA");

-- CreateIndex
CREATE UNIQUE INDEX "Grupo_nombre_key" ON "Grupo"("nombre");

-- AddForeignKey
ALTER TABLE "Equipo" ADD CONSTRAINT "Equipo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
