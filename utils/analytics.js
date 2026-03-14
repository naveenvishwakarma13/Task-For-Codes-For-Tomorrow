export const calculateAnalytics = (weatherData, threshold = 30) => {

    const temps = weatherData.map(w => w.temperature);

    const averageTemperature =
        temps.reduce((a, b) => a + b, 0) / temps.length;

    let highest = weatherData[0];
    let lowest = weatherData[0];

    weatherData.forEach(w => {
        if (w.temperature > highest.temperature) highest = w;
        if (w.temperature < lowest.temperature) lowest = w;
    });

    const hotCities = weatherData
        .filter(w => w.temperature > threshold)
        .map(w => w.city);

    return {
        averageTemperature,
        highestTemperature: {
            city: highest.city,
            temp: highest.temperature
        },
        lowestTemperature: {
            city: lowest.city,
            temp: lowest.temperature
        },
        hotCities
    };
};