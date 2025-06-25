import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
});
const API_KEY = import.meta.env.VITE_API_KEY;

const FetchWeatherData = async (cityName, unit, lat, lon) => {
    try {
        if (lat && lon) {
            const weatherRes = await API.get(`/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
            return weatherRes.data;
        } else {
            const weatherRes = await API.get(`/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`);
            return weatherRes.data;
        }
    } catch (error) {
        console.warn('Weather fetching error.', error);
        return null;
    }

};

const FetchForecastData = async (cityName, unit, lat, lon) => {
    try {
        if (lat & lon) {
            const forecastRes = await API.get(`/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
            return forecastRes.data;
        } else {
            const forecastRes = await API.get(`/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`);
            return forecastRes.data;
        }

    } catch (error) {
        console.warn('Forecast fetching error.', error);
        return null;
    }

};

const FetchAirPollutionData = async (lat, lon) => {
    try {
        const airRes = await API.get(`/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        return airRes.data;

    } catch (error) {
        console.warn('Air pollution data fetching error.', error);
        return null;
    }

};


export { FetchWeatherData, FetchForecastData, FetchAirPollutionData };