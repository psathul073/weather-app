import { useEffect, useState } from "react";
import PrimarySection from "./components/Primary-section";
import SecondarySection from "./components/Secondary-section";
import { FetchAirPollutionData, FetchForecastData, FetchWeatherData } from "./api/weather-api";
import { FetchCityImg } from './api/city-image-api';
import { cleanExpiredCache } from './utils/cacheHelpers';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [cityImg, setCityImg] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cache, setCache] = useState(() => {
    const savedData = localStorage.getItem("weatherCache");
    return savedData ? JSON.parse(savedData) : {};
  });
  const EXPIRY_DURATION = 30 * 60 * 1000; // 30 minutes.
  const tempSymbol = unit === "metric" ? "°C" : "°F"; // Units.


  // Set weather cache data on load.
  useEffect(() => {
    localStorage.setItem("weatherCache", JSON.stringify(cache));
  }, [cache]);

  // Fetch air quality data.
  const fetchExtraDetails = async (lat, lon) => {
    try {
      const res = await FetchAirPollutionData(lat, lon);
      // console.log(res, '--Air quality--');
      setAirQuality(res.list[0].main.aqi)
    } catch {
      setAirQuality(null);
    }
  };

  // Fetch weather data.
  const fetchWeather = async (cityName) => {

    setLoading(true);
    if (!cityName) return;

    const cacheKey = `${cityName}-${unit}`;
    const cached = cache[cacheKey];

    // Check weather data cache expiry.
    if (cached) {
      const isExpired = Date.now() - cached.timestamp > EXPIRY_DURATION;

      if (!isExpired) {
        const { weatherData, forecastData, cityImgUrl } = cached;

        setWeather(weatherData);
        setForecast(forecastData);
        setCityImg(cityImgUrl);
        fetchExtraDetails(weatherData.coord.lat, weatherData.coord.lon);
        setLoading(false);
        return;

      } else {
        // Remove expire data.
        setCache((prev) => {
          const updated = { ...prev };
          delete updated[cacheKey];
          return updated;
        });
      }
    };

    try {
      const weatherRes = await FetchWeatherData(cityName.toLowerCase().trim(), unit);
      const forecastRes = await FetchForecastData(cityName.toLowerCase().trim(), unit);
      const cityImgUrl = await FetchCityImg(cityName.toLowerCase());
      const daily = forecastRes.list.filter((_, i) => i % 8 === 0); // Set 5 entries (one per day)..
      
      setWeather(weatherRes);

      fetchExtraDetails(weatherRes.coord.lat, weatherRes.coord.lon);

      setForecast(daily);
      setCityImg(cityImgUrl);

      setCache((prev) => ({
        ...prev,
        [cacheKey]: {
          weatherData: weatherRes,
          forecastData: daily,
          cityImgUrl: cityImgUrl,
          timestamp: Date.now(),
        },

      }));

      setLoading(false);

    } catch {
      setLoading(false);
      console.warn("City not found or network error.");
    };

  };

  // Fetch weather by geolocation.
  const fetchGeoWeather = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const weatherRes = await FetchWeatherData(city, unit, latitude, longitude);
        const cityImgUrl = await FetchCityImg(weatherRes?.name);
        const forecastRes = await FetchForecastData(weatherRes?.name, unit, latitude, longitude);

        setCity(weatherRes?.name);
        setWeather(weatherRes);
        setCityImg(cityImgUrl);
        
        const daily = forecastRes.list.filter((_, i) => i % 8 === 0); // Set 5 entries (one per day)..
        setForecast(daily);
        fetchExtraDetails(latitude, longitude);
        setLoading(false);

      } catch {
        setLoading(false);
        console.warn("City not found or network error.");
      };

    });
  };

  // Clean expired data.
  useEffect(() => {
    // Clean cache once on load...
    const cleaned = cleanExpiredCache(cache, EXPIRY_DURATION);
    // Update cache with only valid entries.
    if (Object.keys(cleaned).length !== Object.keys(cache).length) {
      setCache(cleaned);
    }
  }, []);

  // Fetch current weather on load...
  useEffect(() => {
    // Run once on load.
    if (!city) {
      fetchGeoWeather();
    }
  }, []);

  return (

    <section className=" min-h-screen w-full content-center p-2 bg-zinc-300 dark:bg-zinc-800 font-poppins overflow-x-hidden overflow-y-auto scroll-smooth">

      <div className=" max-w-[1160px] w-full h-fit relative left-1/2 -translate-x-1/2 rounded-3xl0 flex flex-col sm:flex-row bg-white0 dark:bg-zinc-9000 transition duration-200">

        <PrimarySection city={city} setCity={setCity} fetchWeather={fetchWeather} weather={weather} tempSymbol={tempSymbol} cityImg={cityImg} unit={unit} setUnit={setUnit} fetchGeoWeather={fetchGeoWeather} loading={loading} />

        <SecondarySection weather={weather} airQuality={airQuality} forecast={forecast} unit={unit} setUnit={setUnit} tempSymbol={tempSymbol} />

      </div>

    </section>

  );
}

export default App;
