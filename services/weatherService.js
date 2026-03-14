import axios from "axios";

const API_KEY = "f818bf6381b25f28390d952ba1fa8e75";
export const getCityWeather = async (city) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    return {
        city,
        temperature: response.data.main.temp
    };
};

export const getCityForecast = async (city) => {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);

    return response.data.list;
}; 