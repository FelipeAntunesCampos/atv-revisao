import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
    schema: 'src/prisma/schema.prisma',
    migrations: {
        // ✅ Adicione esta linha aqui:
        seed: 'node src/prisma/seed.js',
    },
    datasource: {
        url: process.env.DATABASE_URL,
    },
});
