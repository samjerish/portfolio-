import React, { useEffect, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import { motion } from 'framer-motion';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    shutdown, // unused in dock, moved to menu bar
}) => {
    const [highestZIndex, setHighestZIndex] = useState(0);

    useEffect(() => {
        let max = 0;
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
            }
        });
        setHighestZIndex(max);
    }, [windows]);

    const hasWindows = Object.keys(windows).length > 0;

    return (
        <div style={styles.dockContainer}>
            {hasWindows && (
                <div style={styles.dock}>
                    {Object.keys(windows).map((key) => {
                        const isActive = windows[key].zIndex === highestZIndex && !windows[key].minimized;
                        return (
                            <motion.div
                                key={`dock-${key}`}
                                style={styles.dockItemContainer}
                                onClick={() => toggleMinimize(key)}
                                whileHover={{ scale: 1.2, margin: '0 10px' }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <div style={styles.dockItem}>
                                    <Icon
                                        style={styles.dockIcon}
                                        icon={windows[key].icon}
                                    />
                                </div>
                                <div style={Object.assign({}, styles.activeDot, isActive && styles.activeDotVisible)} />
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    dockContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 100000,
    },
    dock: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '10px 10px',
        backgroundColor: Colors.macOSDockBlur,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        pointerEvents: 'auto',
        minHeight: 60,
    },
    dockItemContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 5px',
        cursor: 'pointer',
        position: 'relative',
    },
    dockItem: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    dockIcon: {
        width: 32,
        height: 32,
    },
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginTop: 4,
        opacity: 0,
        transition: 'opacity 0.2s',
    },
    activeDotVisible: {
        opacity: 1,
    },
};

export default Toolbar;
