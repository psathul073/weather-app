import Icons from '../icons/Icons';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/Theme-context';

const ThemeDropdown = ({isMobile}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('system');
    const { theme, setTheme } = useTheme();
    const dropdownRef = useRef();

    const options = [
        { value: 'system', label: 'System', icon: 'system' },
        { value: 'light', label: 'Light', icon: 'light' },
        { value: 'dark', label: 'Dark', icon: 'dark' },
    ];

    // Handle select and set values.
    const handleSelect = (value) => {
        // console.log(value, '--selected value');
        setSelected(value);
        setTheme(value);
        // setIsOpen(false);
    };

    // Close dropdown on outside click.
    useEffect(() => {
        const handleClickOutside = (event) => {
            // console.log(event.target);
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
               setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup fun.
        return () => document.removeEventListener('mousedown', handleClickOutside);

    },[]);

    useEffect(() => {
        setSelected(theme);
    }, [theme]);

    return (
        <div className='theme-container relative dark:text-white ' ref={dropdownRef}>
            <button className={`theme-toggle flex items-center gap-2 sm:rounded-full sm:text-xl max-sm:text-zinc-600  sm:bg-white  sm:dark:bg-zinc-900 sm:shadow p-1.5 textHover`} onClick={() => setIsOpen(!isOpen)}>
                <Icons name={selected} />
                {isMobile && <span className='text-base'>{options.find((obj) => obj.value === selected)?.label}</span>}
            </button>
            {isOpen && <ul className='theme-menu absolute top-[40px] right-0 w-fit rounded-xl p-1.5 bg-white dark:bg-black shadow-xs animate-down'>
                {
                    options.map((opt) => (
                        <li className='flex items-center gap-2 px-3 py-1.5 not-last:border-b border-zinc-400/10 textHover' key={opt.value} onClick={() => handleSelect(opt.value)}>
                            <Icons name={opt.icon} />
                            <span>{opt.label}</span>
                        </li>
                    ))
                }
            </ul>}
        </div>
    )
}

export default ThemeDropdown