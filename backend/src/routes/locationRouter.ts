import express from 'express';
import { addLocation, deleteLocation, fetchLocationHistory } from '../controllers/locationController';
const router = express.Router();

router.post('/addLocation', addLocation as any);
router.get('/fetchLocations', fetchLocationHistory as any);
router.delete('/deleteLocation', deleteLocation as any);

export default router;