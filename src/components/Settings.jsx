import { useEffect } from 'react';
import ThemeDropdown from './Theme-dropdown';
import Icons from '../icons/Icons';
import { useRef } from 'react';

const Settings = ({ setSettingsMenu, unit, setUnit }) => {

  const isMobile = true;
  const settingsRef = useRef(null);

  // Close settings menu on outside click.
  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log(e.target);
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);

  return (
    <div className='overlay z-10 absolute top-0 left-0 right-0 p-2 sm:hidden flex justify-center '>

      <div ref={settingsRef} className='settings-menu relative w-xs  h-[277px] top-20 py-3 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 dark:text-white shadow-2xs '>

        <h2 className='title w-full inline-flex items-center justify-between text-[1.1em] pb-2 '>Settings <div onClick={() => setSettingsMenu(false)} className=' hover:text-red-500 active:text-red-500 cursor-pointer'><Icons name={'X'} /></div></h2>

        <ul className='options border-t border-zinc-400/40'>

          <li className='w-full inline-flex justify-between items-center my-2 '>
            Units
            <button onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")} className='inline-flex items-center justify-center gap-2 p-1.5 text-zinc-600 textHover'><Icons name={unit === "metric" ? "F" : "C"} /> {unit === "metric" ? "Fahrenheit" : "Celsius"} </button>
          </li>

          <li className='w-full inline-flex justify-between items-center my-2 border-t border-dotted border-zinc-500/40'>
            Theme
            <ThemeDropdown isMobile={isMobile} />
          </li>

        </ul>

      </div>

    </div>
  )
}

export default Settings