import express from "express";
import { cityAnalytics, singleCityAnalytics } from "../controllers/weatherController.js";
import { validateCities } from "../middleware/cityValidation.js";

const router = express.Router();

router.post("/analytics/cities", validateCities,cityAnalytics);

router.get("/analytics/city/:name", singleCityAnalytics);

export default router;