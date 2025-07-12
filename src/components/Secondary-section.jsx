import ThemeDropdown from "./Theme-dropdown";
import Icons from "../icons/Icons";
import Forecast from "./Forecast";
import TempTrend from "./Temp-trend";
import TodayHighlight from "./Today-highlight";

const SecondarySection = ({ forecast, unit, setUnit, tempSymbol, airQuality, weather }) => {
  return (

    <div className="container-2 w-full h-full0 p-6  max-sm:rounded-b-2xl sm:rounded-r-2xl bg-neutral-50 dark:text-white dark:bg-neutral-950 bg-green-20">

      <header className="relative w-full flex items-center justify-between bg-amber-3000 ">
        <h1 className="text-lg font-[500] border-b">Today</h1>

        {/* settings for desktop */}
        <div className="options hidden sm:flex flex-row items-center gap-4">
          {/* Unit selection */}
          <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")} className="bg-white dark:bg-zinc-900 p-1.5 rounded-full text-xl shadow  hover:text-sky-500 active:text-sky-500 duration-150 cursor-pointer">
            <Icons name={unit === "metric" ? "F" : "C"} />
          </button>
          {/* Theme selection */}
          <ThemeDropdown />
        </div>

      </header>

      {/* 5day forecast */}
      <Forecast forecast={forecast} tempSymbol={tempSymbol} />

      {/* Temperature trend graph */}
      <TempTrend forecast={forecast} />

      {/* Daily highlight */}
      <TodayHighlight weather={weather} airQuality={airQuality} unit={unit} />

    </div>

  );
};

export default SecondarySection;
