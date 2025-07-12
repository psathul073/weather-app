import { useRef } from 'react';
import SearchBox from './Search-box';

const PrimarySection = ({ weather, fetchWeather, city, setCity, tempSymbol, cityImg, unit, setUnit, fetchGeoWeather }) => {

  const debounceRef = useRef(null);
  let date = new Date();
  let day = date.toLocaleString('en-us', { weekday: 'long' });

  // For city search.
  const handleInputChange = (value) => {
    setCity(value);
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchWeather(value);
    }, 500);
  };

  return (

    <div className='container-1 relative p-6 w-full h-full0 sm:w-sm  max-sm:rounded-t-3xl sm:rounded-l-3xl bg-white dark:bg-black'>

      <SearchBox handleInputChange={handleInputChange} city={city} unit={unit} setUnit={setUnit} fetchGeoWeather={fetchGeoWeather} />

      {/* dynamic Icons and time*/}
      <div className='temp flex flex-col items-center dark:text-white'>
        <img src={weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : "/02.png"} alt="icon" className='w-60 high-quality object-center object-cover drop-shadow-2xl' loading='lazy' />
        <h1 className=' text-6xl font-light self-start'>{weather ? Math.round(weather?.main.temp) : '00'} <span>{tempSymbol}</span></h1>
        <h2 className='self-start mt-2'>
          {day}, <span className='text-zinc-400'>{`${date.getHours()} : ${date.getMinutes()}`}</span>
        </h2>
      </div>

      <div className='h-fit text-center border-t border-zinc-500/30 my-6 '>

        {/* Description */}
        <div className='relative w-full h-auto inline-flex items-center justify-center gap-2 my-6 p-2 dark:text-white '>
          <img src={weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : "/02.png"} alt="icon" className='w-8 h-8 object-contain' />
          <p className='text-base'>{weather?.weather[0].description ?? 'No result'}</p>
        </div>

        {/* Dynamic city image */}
        <div className=' place-img relative w-56 mx-auto max-sm:w-10/12 h-32 rounded-3xl border border-zinc-300/20'>
          <img src={cityImg ? cityImg : "/ktym.jpg"} alt="city image" className='h-full w-full rounded-3xl object-center object-cover' />
          <p className=' absolute top-1/2 left-1/2 -translate-1/2 text-white px-3 py-0.5 rounded-2xl backdrop-blur-xs '>{city ?? 'No name'}</p>
        </div>

      </div>

    </div>
  )
}

export default PrimarySection