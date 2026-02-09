// 1. Importa a instância do prisma que já configuramos com o adaptador Postgres
import prisma from '../utils/prismaClient.js';

async function main() {
    console.log('🚀 Limpando banco e gerando dados massivos...');

    // Deleta os filmes existentes para não dar erro de Título Duplicado (@unique)
    await prisma.movie.deleteMany();

   const movies = [
       {
           id: 1,
           title: 'Mad Max: Estrada da Fúria',
           description: 'Um futuro apocalíptico onde água é poder.',
           duration: 120,
           genre: 'Ação',
           rating: 8.1,
       },
       {
           id: 2,
           title: 'John Wick',
           description: 'Um ex-assassino sai da aposentadoria por vingança.',
           duration: 101,
           genre: 'Ação',
           rating: 7.4,
       },
       {
           id: 3,
           title: 'Top Gun: Maverick',
           description: 'Maverick treina um destacamento de graduados.',
           duration: 130,
           genre: 'Ação',
           rating: 8.3,
       },
       {
           id: 4,
           title: 'Missão Impossível 7',
           description: 'Ethan Hunt usa inteligência para salvar o mundo.',
           duration: 163,
           genre: 'Ação',
           rating: 7.8,
       },
       {
           id: 5,
           title: 'Batman: O Cavaleiro das Trevas',
           description: 'O herói enfrenta o Coringa em Gotham.',
           duration: 152,
           genre: 'Ação',
           rating: 9.0,
       },
       {
           id: 6,
           title: 'O Poderoso Chefão',
           description: 'A saga da família Corleone no crime organizado.',
           duration: 175,
           genre: 'Drama',
           rating: 9.2,
       },
       {
           id: 7,
           title: 'Cidade de Deus',
           description: 'A dura realidade na favela do Rio de Janeiro.',
           duration: 130,
           genre: 'Drama',
           rating: 9.0,
       },
       {
           id: 8,
           title: 'A Lista de Schindler',
           description: 'Um empresário salva judeus durante o holocausto.',
           duration: 195,
           genre: 'Drama',
           rating: 8.9,
       },
       {
           id: 9,
           title: 'Hereditário',
           description: 'Uma família lida com segredos ancestrais sombrios.',
           duration: 127,
           genre: 'Terror',
           rating: 7.3,
       },
       {
           id: 10,
           title: 'O Chamado',
           description: 'Uma fita de vídeo amaldiçoada causa mortes.',
           duration: 115,
           genre: 'Terror',
           rating: 7.1,
       },
       {
           id: 11,
           title: 'Invocação do Mal',
           description: 'Casos reais de investigadores paranormais.',
           duration: 112,
           genre: 'Terror',
           rating: 7.5,
       },
       {
           id: 12,
           title: 'Superbad',
           description: 'Amigos tentam comprar bebida para uma festa.',
           duration: 113,
           genre: 'Comédia',
           rating: 7.6,
       },
       {
           id: 13,
           title: 'Se Beber, Não Case',
           description: 'Uma despedida de solteiro que deu muito errado.',
           duration: 100,
           genre: 'Comédia',
           rating: 7.7,
       },
       {
           id: 14,
           title: 'Toy Story',
           description: 'Brinquedos ganham vida quando humanos saem.',
           duration: 81,
           genre: 'Animação',
           rating: 8.3,
       },
       {
           id: 15,
           title: 'Homem-Aranha: Através do Aranhaverso',
           description: 'Miles Morales viaja pelo multiverso.',
           duration: 140,
           genre: 'Animação',
           rating: 8.8,
       },
       {
           id: 16,
           title: 'Shrek',
           description: 'Um ogro tenta recuperar seu pântano.',
           duration: 90,
           genre: 'Animação',
           rating: 7.9,
       },
       {
           id: 17,
           title: 'Interestelar',
           description: 'Exploradores viajam por um buraco de minhoca.',
           duration: 169,
           genre: 'Ficção Científica',
           rating: 8.6,
       },
       {
           id: 18,
           title: 'Matrix',
           description: 'Um hacker descobre a natureza da realidade.',
           duration: 136,
           genre: 'Ficção Científica',
           rating: 8.7,
       },
       {
           id: 19,
           title: 'O Sexto Sentido',
           description: 'Um menino vê pessoas mortas em todo lugar.',
           duration: 107,
           genre: 'Suspense',
           rating: 8.1,
       },
       {
           id: 20,
           title: 'Garota Exemplar',
           description: 'O desaparecimento misterioso de uma esposa.',
           duration: 149,
           genre: 'Suspense',
           rating: 8.1,
       },
       {
           id: 21,
           title: 'Titanic',
           description: 'Um romance proibido em um navio condenado.',
           duration: 194,
           genre: 'Romance',
           rating: 7.9,
       },
       {
           id: 22,
           title: 'Questão de Tempo',
           description: 'Um jovem descobre que pode viajar no tempo.',
           duration: 123,
           genre: 'Romance',
           rating: 7.8,
       },
       {
           id: 23,
           title: 'Ameaça de Tubarão',
           description: 'Um filme genérico de tubarão muito mal feito.',
           duration: 85,
           genre: 'Ação',
           rating: 2.1,
       },
       {
           id: 24,
           title: 'O Ataque dos Tomates',
           description: 'Tomates assassinos aterrorizam a cidade.',
           duration: 90,
           genre: 'Comédia',
           rating: 1.5,
       },
   ];

    for (const m of movies) {
        await prisma.movie.create({
            data: {
                ...m,
                available: m.rating >= 3, // Lógica solicitada
            },
        });
    }

    console.log('✅ Banco populado com 24 filmes!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no Seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
