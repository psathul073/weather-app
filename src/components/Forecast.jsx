import React from 'react'

const Forecast = ({ forecast, tempSymbol }) => {
    return (
        <div className="forecast-container">

            <h2 className="text-sm font-semibold py-3">5-Day Forecast</h2>

            <div className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-3">
                {
                    forecast.length > 2 ?
                        forecast.map((day, index) => (
                            <div
                                key={index}
                                className=" w-full bg-white dark:bg-zinc-900 rounded-lg p-2 text-center snap-center shadow"
                            >
                                <h3 className="text-sm font-medium">{new Date(day.dt_txt).toLocaleDateString("en-us", {
                                    weekday: "long",
                                }).slice(0, 3)}</h3>
                                <img src={day ? `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` : `/02.png`} alt="weather icon" className="w-8 h-8 mx-auto my-1" />
                                <p className="text-sm text-gray-600">{day ? Math.round(day.main.temp) + tempSymbol : '00' + tempSymbol}</p>
                            </div>
                        ))
                        :
                        [1, 2, 3, 4, 5].map((key) => (
                            <div
                                key={key}
                                className=" w-full bg-white dark:bg-zinc-900 rounded-lg p-2 text-center snap-center shadow"
                            >
                                <h3 className="text-sm font-medium">{'day'}</h3>
                                <img src="/02.png" alt="weather icon" className="w-8 h-8 mx-auto my-1" />
                                <p className="text-sm text-gray-600">00&nbsp;°C</p>
                            </div>
                        ))
                }
            </div>

        </div>

    )
}

export default Forecast