const { PrismaClient } = require('../../generated/prisma')
const { Pool } = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
})

module.exports = prisma
