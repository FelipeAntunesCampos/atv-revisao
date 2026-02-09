import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

// 1. Cria a conexão com o banco de dados via Driver nativo (pg)
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

// 2. Cria o adaptador que o Prisma 7 exige
const adapter = new PrismaPg(pool);

// 3. Instancia o Prisma usando o adaptador
const prisma = new PrismaClient({ adapter });

export default prisma;
