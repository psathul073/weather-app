import { useEffect, useRef, useState } from "react"
import Icons from "../icons/Icons"
import Settings from "./Settings";

const SearchBox = ({ handleInputChange, city, unit, setUnit, fetchGeoWeather }) => {

    const [searchBox, setSearchBox] = useState(false);
    const [settingsMenu, setSettingsMenu] = useState(false);
    const searchTriggerRef = useRef();
    const searchDropdownRef = useRef();

    // Close search box on outside click.
    useEffect(() => {
        const handleClickOutside = (e) => {
            // console.log(e.target);
            const clickedOutsideButtons = searchTriggerRef.current && !searchTriggerRef.current.contains(e.target);
            const clickedOutsideDropdown = searchDropdownRef.current && !searchDropdownRef.current.contains(e.target);

            if (clickedOutsideButtons && clickedOutsideDropdown) {
                setSearchBox(false);
            }
        };
        document.addEventListener('pointerdown', handleClickOutside);
        return () => document.removeEventListener('pointerdown', handleClickOutside);

    }, []);

    return (
        <>
            {/* Search box container */}
            <div className="search-box-1 w-full hidden sm:flex flex-row items-center text-xl dark:text-white">
                <button className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 "><Icons name={'search'} /></button>
                <input type="text" className=" w-full p-1.5 outline-0 text-base" placeholder="Search for places..." value={city} onChange={(e) => handleInputChange(e.target.value)} />
                <button onClick={() => fetchGeoWeather()} className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 textHover"><Icons name={'location'} /></button>
            </div>

            {/* For mobile devices */}
            <div ref={searchTriggerRef} className="search-section relative w-full sm:hidden text-2xl flex flex-row items-center justify-between dark:text-white ">
                <button className=" bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 textHover" onClick={() => setSearchBox(!searchBox)}><Icons name={'add'} /></button>

                <button className="bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 textHover" onClick={() => { setSettingsMenu(true); setSearchBox(false) }}><Icons name={'settings'} /></button>

                {searchBox &&
                    <div ref={searchDropdownRef} className="search-box-2 z-20 absolute top-11 px-2 py-2 right-0 w-full sm:hidden flex flex-row items-center rounded-sm shadow-2xl bg-stone-100 dark:bg-stone-950">
                        <button ><Icons name={'search'} /></button>
                        <input autoFocus type="text" id="cityName" className=" w-full p-1.5 outline-0 text-base" placeholder='Search for places...' value={city} onChange={(e) => handleInputChange(e.target.value)} />
                        <button onClick={() => fetchGeoWeather()} className='textHover'><Icons name={'location'} /></button>
                    </div>
                }
            </div>

            {
                settingsMenu && <Settings setSettingsMenu={setSettingsMenu} unit={unit} setUnit={setUnit} />
            }
        </>
    )
}

export default SearchBox