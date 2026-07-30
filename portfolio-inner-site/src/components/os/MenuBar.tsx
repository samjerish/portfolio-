import React, { useEffect, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';

export interface MenuBarProps {
    shutdown: () => void;
    activeApp?: string;
}

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
    const [appleMenuOpen, setAppleMenuOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime());
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.menuBar}>
            <div style={styles.leftSection}>
                <div 
                    style={Object.assign({}, styles.menuItem, appleMenuOpen && styles.menuItemActive)}
                    onClick={() => setAppleMenuOpen(!appleMenuOpen)}
                >
                    <span style={{ fontSize: 16 }}></span>
                </div>
                {appleMenuOpen && (
                    <div style={styles.appleMenu}>
                        <div style={styles.appleMenuItem} onClick={shutdown}>
                            Shut Down...
                        </div>
                    </div>
                )}
                
                <div style={Object.assign({}, styles.menuItem, { fontWeight: 700 })}>
                    {activeApp || 'Finder'}
                </div>
                <div style={styles.menuItem}>File</div>
                <div style={styles.menuItem}>Edit</div>
                <div style={styles.menuItem}>View</div>
                <div style={styles.menuItem}>Go</div>
                <div style={styles.menuItem}>Window</div>
                <div style={styles.menuItem}>Help</div>
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
    appleMenu: {
        position: 'absolute',
        top: 24,
        left: 10,
        backgroundColor: 'rgba(30, 30, 30, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        borderRadius: 6,
        padding: 4,
        minWidth: 200,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    },
    appleMenuItem: {
        padding: '4px 12px',
        cursor: 'pointer',
        borderRadius: 4,
        color: Colors.white,
    },
};

export default MenuBar;
