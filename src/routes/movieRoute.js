import express from 'express';
import * as controller from '../controllers/movieController.js';

const router = express.Router();

router.get('/filmes', controller.getAll);
router.post('/filmes', controller.create);
router.get('/filmes/:id', controller.getById);
router.put('/filmes/:id', controller.update);
router.delete('/filmes/:id', controller.remove);

export default router;
