import { useEffect, useRef, useState } from "react";
import Icons from "../icons/Icons";
import Settings from "./Settings";

const SearchBox = ({
  city,
  setCity,
  unit,
  setUnit,
  fetchGeoWeather,
  fetchWeather,
  loading,
}) => {
  const [searchBox, setSearchBox] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const searchTriggerRef = useRef();
  const searchDropdownRef = useRef();

  // Close search box on outside click.
  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log(e.target);
      const clickedOutsideButtons =
        searchTriggerRef.current &&
        !searchTriggerRef.current.contains(e.target);
      const clickedOutsideDropdown =
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target);

      if (clickedOutsideButtons && clickedOutsideDropdown) {
        setSearchBox(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Search box container */}
      <div className="search-box-1 w-full hidden sm:flex flex-row items-center px-1.5 py-1 rounded-xl text-xl dark:text-white bg-zinc-100 dark:bg-zinc-900">
        <Icons name={"globeSearch"} />

        <input
          type="text"
          className=" w-full p-1.5 outline-0 text-base"
          placeholder="Search for places..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <>
          {city.length > 0 ? (
            <button
              disabled={loading}
              onClick={() => fetchWeather(city)}
              className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 cursor-pointer "
            >
              <Icons name={loading ? "loading" : "search"} />
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={() => fetchGeoWeather()}
              className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 textHover"
            >
              <Icons name={loading ? "loading" : "location"} />
            </button>
          )}
        </>
      </div>

      {/* For mobile devices */}
      <div
        ref={searchTriggerRef}
        className="search-section relative w-full sm:hidden text-2xl flex flex-row items-center justify-between dark:text-white z-10 "
      >
        <button
          className=" bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 textHover"
          onClick={() => setSearchBox(!searchBox)}
        >
          <Icons name={"add"} />
        </button>

        <button
          className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 textHover"
          onClick={() => {
            setSettingsMenu(true);
            setSearchBox(false);
          }}
        >
          <Icons name={"settings"} />
        </button>

        {searchBox && (
          <div
            ref={searchDropdownRef}
            className="search-box-2 absolute top-11 px-2 py-2 right-0 w-full sm:hidden flex flex-row items-center rounded-xl shadow-2xl bg-zinc-100 dark:bg-zinc-900 animate-down "
          >
            <Icons name={"globeSearch"} />

            <input
              type="text"
              className=" w-full p-1.5 outline-0 text-base"
              placeholder="Search for places..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <>
              {city.length > 0 ? (
                <button
                  disabled={loading}
                  onClick={() => fetchWeather(city)}
                  className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-0.5 transition hover:text-blue-500 active:text-blue-500 cursor-pointer "
                >
                  <Icons name={loading ? "loading" : "search"} />
                </button>
              ) : (
                <button
                  disabled={loading}
                  onClick={() => fetchGeoWeather()}
                  className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 textHover"
                >
                  <Icons name={loading ? "loading" : "location"} />
                </button>
              )}
            </>
          </div>
        )}
      </div>

      {settingsMenu && (
        <Settings
          setSettingsMenu={setSettingsMenu}
          unit={unit}
          setUnit={setUnit}
        />
      )}
    </>
  );
};

export default SearchBox;
