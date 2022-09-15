import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const router = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);
const bikeId = '/motorcycles/:id';

router.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
router.get(bikeId, (req, res) => motorcycleController.readOne(req, res));
router.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
router.put(bikeId, (req, res) => motorcycleController.update(req, res));
router.delete(bikeId, (req, res) => motorcycleController.delete(req, res));

export default router;