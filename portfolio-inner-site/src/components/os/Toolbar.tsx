import React, { useEffect, useState } from 'react';
import { Icon } from '../general';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ windows, toggleMinimize }) => {
    const [highestZIndex, setHighestZIndex] = useState(0);

    useEffect(() => {
        let max = 0;
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) max = windows[key].zIndex;
        });
        setHighestZIndex(max);
    }, [windows]);

    return (
        <div style={styles.taskbarApps}>
            {Object.keys(windows).map((key) => {
                const isActive =
                    windows[key].zIndex === highestZIndex &&
                    !windows[key].minimized;
                return (
                    <button
                        key={`tb-${key}`}
                        style={Object.assign(
                            {},
                            styles.taskbarApp,
                            isActive && styles.taskbarAppActive
                        )}
                        onClick={() => toggleMinimize(key)}
                    >
                        <Icon
                            icon={windows[key].icon}
                            style={styles.taskbarIcon}
                        />
                        <span style={styles.taskbarLabel}>
                            {windows[key].name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

const styles: StyleSheetCSS = {
    taskbarApps: {
        position: 'absolute',
        bottom: 0,
        left: 130, // After the Start button + divider (~130px)
        right: 80,  // Leave space for the clock tray
        height: 28,
        display: 'flex',
        alignItems: 'center',
        padding: '3px 2px',
        zIndex: 100001, // above MenuBar (100000)
        gap: 2,
    },
    taskbarApp: {
        display: 'flex',
        alignItems: 'center',
        height: 22,
        minWidth: 100,
        maxWidth: 180,
        padding: '0 6px',
        backgroundColor: '#c0c0c0',
        border: 'none',
        boxShadow: 'inset -1px -1px #808080, inset 1px 1px #ffffff, inset -2px -2px #404040, inset 2px 2px #dfdfdf',
        cursor: 'pointer',
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 11,
        color: '#000000',
        gap: 4,
        overflow: 'hidden',
        pointerEvents: 'auto',
    },
    taskbarAppActive: {
        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #ffffff, inset 2px 2px #404040, inset -2px -2px #dfdfdf',
        backgroundColor: '#b0b0b0',
    },
    taskbarIcon: {
        width: 14,
        height: 14,
        flexShrink: 0,
    },
    taskbarLabel: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 11,
    },
};

export default Toolbar;
