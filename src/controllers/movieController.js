import * as model from '../models/movieModel.js';

import prisma from '../utils/prismaClient.js'; // Ajuste o import conforme seu projeto

export const getAll = async (req, res) => {
    try {
        const { title, genre } = req.query;

        const filters = {
            available: true,
        };

        if (title) {
            filters.title = {
                contains: title,
                mode: 'insensitive', // Essencial para Postgres ignorar Maiúsculas/Minúsculas
            };
        }

        if (genre) {
            filters.genre = genre;
        }

        const movies = await prisma.movie.findMany({
            where: filters,
            orderBy: { title: 'asc' },
        });

        // Se chegar aqui, a conexão na porta 7777 funcionou!
        res.json(movies.map((m) => ({ ...m, rating: Number(m.rating) })));
    } catch (error) {
        console.error('Erro detalhado:', error);
        res.status(500).json({ error: 'Erro ao conectar ao banco na porta 7777' });
    }
};

export const create = async (req, res) => {
    try {
        const { title, description, genre, duration, rating } = req.body;

        if (!title || !description || !genre || duration === undefined || rating === undefined) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        if (title.trim().length < 3) {
            return res.status(400).json({ error: 'O título deve ter no mínimo 3 caracteres.' });
        }

        if (description.trim().length < 10) {
            return res.status(400).json({ error: 'A descrição deve ter no mínimo 10 caracteres.' });
        }

        const durationInt = parseInt(duration);
        if (isNaN(durationInt) || durationInt <= 0) {
            return res
                .status(400)
                .json({ error: 'A duração deve ser um número inteiro positivo.' });
        }
        if (durationInt < 30) {
            return res.status(400).json({ error: 'A duração mínima permitida é de 30 minutos.' });
        }
        if (durationInt > 300) {
            return res
                .status(400)
                .json({ error: 'Filmes com mais de 300 minutos não podem ser cadastrados.' });
        }

        const generosPermitidos = [
            'Ação',
            'Drama',
            'Comédia',
            'Terror',
            'Romance',
            'Animação',
            'Ficção Científica',
            'Suspense',
        ];
        if (!generosPermitidos.includes(genre)) {
            return res
                .status(400)
                .json({ error: `Gênero inválido. Escolha entre: ${generosPermitidos.join(', ')}` });
        }

        const ratingFloat = parseFloat(rating);
        if (ratingFloat < 0 || ratingFloat > 10) {
            return res.status(400).json({ error: 'A nota (rating) deve estar entre 0 e 10.' });
        }

        if (genre === 'Terror' && ratingFloat > 8) {
            return res
                .status(400)
                .json({ error: 'Filmes de Terror não podem possuir nota superior a 8.' });
        }

        // Todo filme começa como true, exceto se a nota for inferior a 3
        let available = true;
        if (ratingFloat < 3) {
            available = false;
        }

        const data = await model.create({
            title,
            description,
            genre,
            duration: durationInt,
            rating: ratingFloat,
            available: available,
        });

        res.status(201).json({
            message: 'Filme cadastrado com sucesso!',
            data,
        });
    } catch (error) {
        if (error.code === 'P2002') {
            return res
                .status(400)
                .json({ error: 'Já existe um filme cadastrado com este título.' });
        }
        console.error(error);
        res.status(500).json({ error: 'Erro interno ao salvar o filme.' });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registro' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do filme!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        const data = await model.update(id, req.body);
        res.json({
            message: `O registro "${data.title}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await model.findById(id);

        if (!movie) {
            return res.status(404).json({ error: 'Filme não encontrado.' });
        }

        if (movie.rating >= 9) {
            return res.status(403).json({
                error: `Proibido! O filme "${movie.title}" tem nota ${movie.rating} e é considerado um clássico intocável.`,
            });
        }

        await model.remove(id);

        res.json({ message: 'Filme deletado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao tentar deletar o filme.' });
    }
};
