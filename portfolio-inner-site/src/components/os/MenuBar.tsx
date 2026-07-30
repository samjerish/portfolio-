import React, { useEffect, useState, useRef } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';

export interface MenuBarProps {
    shutdown: () => void;
    activeApp?: string;
}

const MENUS = {
    apple: ['About This Mac', 'Shut Down...'],
    File: ['New Window', 'Close Window'],
    Edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Select All'],
    View: ['Toggle Full Screen'],
    Go: ['My Showcase', 'Credits', 'Computer'],
    Window: ['Minimize', 'Zoom'],
    Help: ['Portfolio Help'],
};

const MenuBar: React.FC<MenuBarProps> = ({ shutdown, activeApp }) => {
    const getTime = () => {
        const date = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const dayName = days[date.getDay()];
        const month = months[date.getMonth()];
        const day = date.getDate();
        
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        
        return `${dayName} ${month} ${day}  ${hours}:${mins} ${amPm}`;
    };

    const [time, setTime] = useState(getTime());
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuAction = (action: string) => {
        setActiveMenu(null);
        if (action === 'Shut Down...') {
            shutdown();
            return;
        }
        
        if (['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Select All'].includes(action)) {
            // Mock functions for Edit menu
            return;
        }

        if (action === 'About This Mac' || action === 'Portfolio Help') {
            alert(`SAM JERISH D PORTFOLIO OS\nVersion 1.0\n\nA React-based macOS clone.`);
            return;
        }
        
        // Dispatch event for Desktop to handle
        window.dispatchEvent(new CustomEvent('macOS_menu_action', { detail: { action } }));
    };

    const toggleMenu = (menuName: string) => {
        if (activeMenu === menuName) {
            setActiveMenu(null);
        } else {
            setActiveMenu(menuName);
        }
    };

    const renderMenu = (menuName: string, label: string | JSX.Element, isApple: boolean = false) => {
        const isOpen = activeMenu === menuName;
        const options = MENUS[menuName as keyof typeof MENUS] || [];

        return (
            <div style={{ position: 'relative', height: '100%' }}>
                <div 
                    style={Object.assign({}, styles.menuItem, isOpen && styles.menuItemActive)}
                    onClick={() => toggleMenu(menuName)}
                >
                    {label}
                </div>
                {isOpen && (
                    <div style={styles.dropdownMenu}>
                        {options.map((option, idx) => (
                            <div 
                                key={idx} 
                                style={styles.dropdownMenuItem} 
                                onClick={() => handleMenuAction(option)}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.backgroundColor = Colors.blue;
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={styles.menuBar} ref={menuRef}>
            <div style={styles.leftSection}>
                {renderMenu('apple', <span style={{ fontSize: 16 }}></span>, true)}
                
                <div style={Object.assign({}, styles.menuItem, { fontWeight: 700 })}>
                    {activeApp || 'Finder'}
                </div>
                
                {renderMenu('File', 'File')}
                {renderMenu('Edit', 'Edit')}
                {renderMenu('View', 'View')}
                {renderMenu('Go', 'Go')}
                {renderMenu('Window', 'Window')}
                {renderMenu('Help', 'Help')}
            </div>
            
            <div style={styles.rightSection}>
                <div style={styles.menuItem}>
                    <Icon icon="volumeOn" size={14} style={{ filter: 'invert(1)' }} />
                </div>
                <div style={styles.menuItem}>
                    {time}
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    menuBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 24,
        backgroundColor: Colors.macOSMenuBlur,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${Colors.macOSMenuBorder}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        color: Colors.white,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: 13,
        fontWeight: 500,
        zIndex: 100000,
        userSelect: 'none',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    menuItem: {
        padding: '0 10px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.1s',
        borderRadius: 4,
    },
    menuItemActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 24,
        left: 0,
        backgroundColor: 'rgba(30, 30, 30, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        borderRadius: 6,
        padding: 4,
        minWidth: 200,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    },
    dropdownMenuItem: {
        padding: '4px 12px',
        cursor: 'pointer',
        borderRadius: 4,
        color: Colors.white,
        transition: 'background-color 0.1s',
    },
};

export default MenuBar;
