import { error } from "../utils/responseHelper.js";

export const validateCities = (req, res, next) => {

    const { cities } = req.body;

    if (!cities) {
        return error(res, "cities field is required", 400);
    }

    if (!Array.isArray(cities)) {
        return error(res, "cities must be an array", 400);
    }

    if (cities.length === 0) {
        return error(res, "cities array cannot be empty", 400);
    }

    for (let city of cities) {
        if (typeof city !== "string" || city.trim() === "") {
            return error(res, "each city must be a valid string", 400);
        }
    }

    next();
};