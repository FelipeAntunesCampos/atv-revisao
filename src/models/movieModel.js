import prisma from '../utils/prismaClient.js';

export const create = async (movieData) => {
    return await prisma.movie.create({
        data: movieData,
    });
};
export const findAll = async (where = {}) => {
    return prisma.movies.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.movie.findUnique({
        where: { id: parseInt(id) },
    });
};

export const update = async (id, data) => {
    return await prisma.movie.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.movie.delete({
        where: { id: parseInt(id) },
    });
};
