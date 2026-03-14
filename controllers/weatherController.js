import pool from "../config/db.js";
import { getCityWeather, getCityForecast } from "../services/weatherService.js";
import { calculateAnalytics } from "../utils/analytics.js";
import { success, error } from "../utils/responseHelper.js";

export const cityAnalytics = async (req, res) => {
    try {

        const { cities } = req.body;
        // console.log(cities);
        const weatherResults = [];

        for (const city of cities) {

            const data = await getCityWeather(city);

            weatherResults.push(data);

            const [rows] = await pool.query(
                "SELECT * FROM city_weather WHERE city = ?",
                [data.city]
            );


            if (rows.length > 0) {
                await pool.query(
                    "UPDATE city_weather SET temperature = ? WHERE city = ?",
                    [data.temperature, data.city]
                );
            }

            else {
                await pool.query(
                    "INSERT INTO city_weather (city, temperature) VALUES (?, ?)",
                    [data.city, data.temperature]
                );
            }
        }

        const analytics = calculateAnalytics(weatherResults);

        return success(res, analytics);

    } catch (err) {
        return error(res, err.message);
    }
};

export const singleCityAnalytics = async (req, res) => {
    try {

        const city = req.params.name;

        const current = await getCityWeather(city);

        const forecast = await getCityForecast(city);

        const temps = forecast.map(f => f.main.temp);

        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);

        let warning = null;

        if (current.temperature > 35) {
            warning = "Temperature exceeds 35°C";
        }

        const result = {
            city,
            currentTemperature: current.temperature,
            forecastMinTemp: minTemp,
            forecastMaxTemp: maxTemp,
            warning
        };

        return success(res, result);

    } catch (err) {
        return error(res, err.message);
    }
};
