const { PrismaClient } = require('../../generated/prisma')
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')

// SSL para bases en la nube (Neon, Render); PostgreSQL local no lo soporta
const esBaseLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(process.env.DATABASE_URL ?? '')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: esBaseLocal ? false : { rejectUnauthorized: false },
})

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
})

module.exports = prisma
