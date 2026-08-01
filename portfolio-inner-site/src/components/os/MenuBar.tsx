import React, { useEffect, useState } from 'react';
import Colors from '../../constants/colors';

export interface MenuBarProps {
    shutdown: () => void;
    activeApp?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ shutdown, activeApp }) => {
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const mins = minutes < 10 ? '0' + minutes : '' + minutes;
        return `${hours}:${mins} ${amPm}`;
    };

    const [time, setTime] = useState(getTime());
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTime(getTime()), 30000);
        return () => clearInterval(interval);
    }, []);

    const dispatchMenuAction = (action: string) => {
        setStartMenuOpen(false);
        if (action === 'Shut Down...') {
            shutdown();
        } else {
            window.dispatchEvent(new CustomEvent('windows_menu_action', { detail: { action } }));
        }
    };

    return (
        <div style={styles.taskbar}>
            {/* Start button & Menu */}
            <div style={{ position: 'relative' }}>
                <button
                    style={Object.assign({}, styles.startButton, startMenuOpen && styles.startButtonActive)}
                    onClick={() => setStartMenuOpen(!startMenuOpen)}
                >
                    <img
                        src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
                        alt="start"
                        style={{ width: 16, height: 16, marginRight: 4 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <strong>Start</strong>
                </button>
                
                {startMenuOpen && (
                    <div style={styles.startMenu}>
                        <div style={styles.startMenuSideBar}>
                            <span style={styles.startMenuSideBarText}>
                                <strong>Windows</strong> 98
                            </span>
                        </div>
                        <div style={styles.startMenuOptions}>
                            <div style={styles.startMenuItem} onClick={() => dispatchMenuAction('My Showcase')}>
                                <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-5.png" alt="Showcase" style={styles.startMenuIcon} />
                                My Showcase
                            </div>
                            <div style={styles.startMenuItem} onClick={() => dispatchMenuAction('Credits')}>
                                <img src="https://win98icons.alexmeub.com/icons/png/notepad-5.png" alt="Credits" style={styles.startMenuIcon} />
                                Credits
                            </div>
                            <div style={styles.startMenuDivider} />
                            <div style={styles.startMenuItem} onClick={() => dispatchMenuAction('Toggle Full Screen')}>
                                <img src="https://win98icons.alexmeub.com/icons/png/monitor_windows-0.png" alt="Full Screen" style={styles.startMenuIcon} />
                                Full Screen Mode
                            </div>
                            <div style={styles.startMenuDivider} />
                            <div style={styles.startMenuItem} onClick={() => dispatchMenuAction('Shut Down...')}>
                                <img src="https://win98icons.alexmeub.com/icons/png/shut_down_normal-2.png" alt="Shut down" style={styles.startMenuIcon} />
                                Shut Down...
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Divider */}
            <div style={styles.divider} />

            {/* Active app label */}
            {activeApp && (
                <div style={styles.activeApp}>{activeApp}</div>
            )}

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* System tray clock */}
            <div style={styles.tray}>
                <span style={styles.clock}>{time}</span>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    taskbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 28,
        backgroundColor: '#c0c0c0',
        boxShadow: 'inset 0 1px 0 #ffffff, inset 0 -1px 0 #808080',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px',
        zIndex: 100000,
        userSelect: 'none',
        gap: 2,
    },
    startButton: {
        display: 'flex',
        alignItems: 'center',
        height: 22,
        padding: '0 8px',
        backgroundColor: '#c0c0c0',
        border: 'none',
        boxShadow: 'inset -1px -1px #808080, inset 1px 1px #ffffff, inset -2px -2px #404040, inset 2px 2px #dfdfdf',
        cursor: 'pointer',
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#808080',
        boxShadow: '1px 0 0 #ffffff',
        margin: '0 2px',
    },
    activeApp: {
        height: 22,
        padding: '0 6px',
        backgroundColor: '#c0c0c0',
        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #ffffff',
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 11,
        color: '#000000',
    },
    tray: {
        height: 22,
        padding: '0 8px',
        backgroundColor: '#c0c0c0',
        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #ffffff',
        display: 'flex',
        alignItems: 'center',
    },
    clock: {
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 11,
        color: '#000000',
    },
    startButtonActive: {
        boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #808080, inset -2px -2px #dfdfdf, inset 2px 2px #404040',
        backgroundColor: '#d4d0c8',
        paddingTop: 2,
        paddingLeft: 10,
    },
    startMenu: {
        position: 'absolute',
        bottom: 28,
        left: 0,
        width: 220,
        backgroundColor: '#c0c0c0',
        boxShadow: 'inset -1px -1px #404040, inset 1px 1px #dfdfdf, inset -2px -2px #000000, inset 2px 2px #ffffff',
        display: 'flex',
        flexDirection: 'row',
        zIndex: 100002,
    },
    startMenuSideBar: {
        width: 24,
        background: 'linear-gradient(180deg, #000080 0%, #000000 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 8,
    },
    startMenuSideBarText: {
        color: '#c0c0c0',
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
        transform: 'rotate(-90deg)',
        transformOrigin: 'left bottom',
        whiteSpace: 'nowrap',
        marginLeft: 18,
        marginBottom: 10,
        letterSpacing: 1,
    },
    startMenuOptions: {
        flex: 1,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
    },
    startMenuItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px 8px 8px',
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 12,
        color: '#000000',
        cursor: 'pointer',
    },
    startMenuIcon: {
        width: 32,
        height: 32,
        marginRight: 10,
    },
    startMenuDivider: {
        height: 1,
        backgroundColor: '#808080',
        borderBottom: '1px solid #ffffff',
        margin: '4px 2px',
    },
};

export default MenuBar;
