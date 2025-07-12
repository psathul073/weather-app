import Icons from "../icons/Icons";

const TodayHighlight = ({ weather, unit, airQuality }) => {

    // Add humidity levels.
    const humidityLevel = (humidity) => {
        if (humidity <= 30) return "Dry 🌵";
        if (humidity <= 60) return "Comfortable 🙂";
        if (humidity <= 70) return "Sticky 😓";
        return "Humid 🥵";
    };

    // Add wind levels.
    const windLevel = (windSpeed) => {
        if (windSpeed <= 1) return "Calm 🌬️";
        if (windSpeed <= 5) return "Light Breeze 🍃";
        if (windSpeed <= 10) return "Breezy 💨";
        if (windSpeed <= 20) return "Windy 🌪️";
        return "Very Windy 🌀";
    };

    // Add air quality levels.
    const aqiLevel = ["Good 👍", "Fair 😊", "Moderate 😐", "Poor 😷", "Very Poor 😫"];

    // Add visibility levels.
    const visibilityLevel = (meters) => {

        const km = meters / 1000; // converted to kilometer.

        if (km > 10) return "Excellent 🌞";
        if (km > 6) return "Good 🙂";
        if (km > 3) return "Moderate 😐";
        if (km > 1) return "Poor 😷";
        return "Very Poor 🌫️";
    };

    // Format time,
    const formatTime = (unix) => {
        const date = new Date(unix * 1000) // Convert seconds to milliseconds.
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };

    return (
        <div className='th-container w-full mb-3'>

            <h2 className='my-3'>Today's Highlights</h2>

            {/* Highlight container */}
            <div className='highlights grid grid-cols-2 lg:grid-cols-3 gap-4 '>

                {/* humidity box */}
                <div className='humidity text-center content-center h-fit p-2.5 rounded-lg shadow bg-white dark:bg-zinc-900'>
                    <h3 className='text-sm text-zinc-400'>Humidity</h3>
                    <h1 className='font-medium text-2xl my-2' >{weather?.main.humidity || '000'}<span className='text-zinc-500 text-sm'>%</span> </h1>
                    <p className='text-xs sm:text-sm'>{humidityLevel(weather?.main.humidity)}</p>
                </div>
                {/* Wind speed box */}
                <div className='wind text-center content-center h-fit p-2.5 rounded-lg shadow bg-white dark:bg-zinc-900 '>
                    <h3 className='text-sm text-zinc-400'>Wind Status</h3>
                    <h1 className='font-medium text-2xl my-2' >{weather?.wind.speed || '00.0'} <span className='text-zinc-500 text-sm'>{unit === "metric" ? "m/s" : "mph"}</span></h1>
                    <p className='text-xs sm:text-sm' >{windLevel(weather?.wind.speed)}</p>
                </div>

                {/* Air quality box */}
                <div className='aqi text-center content-center h-fit p-2.5 rounded-lg shadow bg-white dark:bg-zinc-900'>
                    <h3 className='text-sm text-zinc-400'>Air Quality</h3>
                    <h1 className='font-medium text-2xl my-2' >{airQuality || 0}</h1>
                    <p className='text-xs sm:text-sm'>{aqiLevel[airQuality - 1] || 'Good 👍'}</p>
                </div>
                {/* Visibility box */}
                <div className='visibility text-center content-center h-fit p-2.5 rounded-lg shadow bg-white dark:bg-zinc-900'>
                    <h3 className='text-sm text-zinc-400'>Visibility</h3>
                    <h1 className='font-medium text-2xl my-2' >{(weather?.visibility / 1000) || '00'}<span className='text-zinc-500 text-sm'>km</span></h1>
                    <p className=' text-xs sm:text-sm'>{visibilityLevel(weather?.visibility)}</p>
                </div>
                {/* Sunset and sunrise box */}
                <div className='ss flex flex-col items-center h-fit p-2.5 rounded-lg shadow bg-white dark:bg-zinc-900'>
                    <h3 className='text-sm my-2 max-sm:text-xs text-zinc-400'>Sunrise & Sunset</h3>
                    <p className='inline-flex items-center gap-1.5 my-1 text-base'> <Icons name={'sunrise'} className={'text-amber-500'} /> {weather ? formatTime(weather?.sys?.sunrise) : '00:00 Am'}</p>
                    <p className='inline-flex items-center gap-1.5 text-sm'> <Icons name={'sunset'} className={'text-amber-500'} /> {weather ? formatTime(weather?.sys?.sunset) : '00:00 Pm'}</p>
                </div>

            </div>

        </div>
    )
}

export default TodayHighlight