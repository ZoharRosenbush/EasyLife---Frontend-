import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { storageService } from '../services/async-storage.service.js'
import { socketService } from '../services/socket.service.js';

import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';




export function AppHeader() {

    const [isMenuOpen, setMenuState] = useState(false)
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        loadThemeFromStorage()
        socketService.setup()
    },[])

    const toggleMenu = () => {
        setMenuState(!isMenuOpen)
    }

    const loadThemeFromStorage = () => {
        const themeFromStorage = storageService.loadFromStorage('theme')
        themeFromStorage === 'dark' ? setIsDark(true) : setIsDark(false)
    }

    useEffect(() => {
        isDark ? document.body.classList.add('dark') : document.body.classList.remove('dark')
        isDark ? storageService.saveToStorage('theme', 'dark') : storageService.saveToStorage('theme', 'bright')
    }, [isDark])

    const onToggleDarkMode = () => {
        setIsDark(!isDark)
    }

    return (
        <header className='app-header flex wrap align-center justify-between full'>
            {isMenuOpen && <div className='screen-overlay' onClick={() => {
                toggleMenu()
            }}></div>}
            <section className='header-content flex justify-between align-center'>
                <NavLink className='logo' to='/transaction'>Easy Life</NavLink>
                <div className='right-side-header flex align-center'>
                    
                    <nav className='nav-container'>
                        <ul className={`nav-links clean-list ${(isMenuOpen) ? 'open' : ''}`}>
                            <NavLink to='/transaction'> <li>Transactions</li></NavLink>
                            <NavLink to='/Customer'> <li>Customers</li></NavLink>
                        </ul>
                    </nav>

                    {isDark && <BsFillSunFill className='toggle-darkmode-icon sun' onClick={() => {onToggleDarkMode()}} />}
                    {!isDark && <BsMoonStarsFill className='toggle-darkmode-icon moon' onClick={() => {onToggleDarkMode()}} />}
                    <button className='hamburger-btn' onClick={() => {toggleMenu()}}>
                        <GiHamburgerMenu style={{ marginLeft: '10px' }} className='hamburger-icon' />
                    </button>
                </div>
            </section>
        </header>
    );
}
