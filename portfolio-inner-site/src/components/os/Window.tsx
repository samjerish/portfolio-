import React, { useEffect, useRef, useState } from 'react';
import { IconName } from '../../assets/icons';
import Colors from '../../constants/colors';
import DragIndicator from './DragIndicator';
import ResizeIndicator from './ResizeIndicator';

export interface WindowProps {
    closeWindow: () => void;
    minimizeWindow: () => void;
    onInteract: () => void;
    width: number;
    height: number;
    top: number;
    left: number;
    windowTitle?: string;
    bottomLeftText?: string; // Kept for compatibility but might not be shown
    rainbow?: boolean;
    windowBarColor?: string;
    windowBarIcon?: IconName; // Kept for compatibility
    onWidthChange?: (width: number) => void;
    onHeightChange?: (height: number) => void;
    children?: React.ReactNode;
}

const Window: React.FC<WindowProps> = (props) => {
    const windowRef = useRef<any>(null);
    const dragRef = useRef<any>(null);
    const contentRef = useRef<any>(null);

    const dragProps = useRef<{
        dragStartX: any;
        dragStartY: any;
    }>();

    const resizeRef = useRef<any>(null);

    const [top, setTop] = useState(props.top);
    const [left, setLeft] = useState(props.left);

    const lastClickInside = useRef(false);

    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);

    const [contentWidth, setContentWidth] = useState(props.width);
    const [contentHeight, setContentHeight] = useState(props.height);

    const [windowActive, setWindowActive] = useState(true);

    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxSize, setPreMaxSize] = useState({
        width,
        height,
        top,
        left,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const startResize = (event: any) => {
        event.preventDefault();
        setIsResizing(true);
        window.addEventListener('mousemove', onResize, false);
        window.addEventListener('mouseup', stopResize, false);
    };

    const onResize = ({ clientX, clientY }: any) => {
        const curWidth = clientX - left;
        const curHeight = clientY - top;
        if (curWidth > 320) resizeRef.current.style.width = `${curWidth}px`;
        if (curHeight > 220) resizeRef.current.style.height = `${curHeight}px`;
        resizeRef.current.style.opacity = 1;
    };

    const stopResize = () => {
        setIsResizing(false);
        setWidth(parseFloat(resizeRef.current.style.width));
        setHeight(parseFloat(resizeRef.current.style.height));
        resizeRef.current.style.opacity = 0;
        window.removeEventListener('mousemove', onResize, false);
        window.removeEventListener('mouseup', stopResize, false);
    };

    const startDrag = (event: any) => {
        const { clientX, clientY } = event;
        setIsDragging(true);
        event.preventDefault();
        dragProps.current = {
            dragStartX: clientX,
            dragStartY: clientY,
        };
        window.addEventListener('mousemove', onDrag, false);
        window.addEventListener('mouseup', stopDrag, false);
    };

    const onDrag = ({ clientX, clientY }: any) => {
        let { x, y } = getXYFromDragProps(clientX, clientY);
        dragRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dragRef.current.style.opacity = 1;
    };

    const stopDrag = ({ clientX, clientY }: any) => {
        setIsDragging(false);
        const { x, y } = getXYFromDragProps(clientX, clientY);
        setTop(y);
        setLeft(x);
        window.removeEventListener('mousemove', onDrag, false);
        window.removeEventListener('mouseup', stopDrag, false);
    };

    const getXYFromDragProps = (
        clientX: number,
        clientY: number
    ): { x: number; y: number } => {
        if (!dragProps.current) return { x: 0, y: 0 };
        const { dragStartX, dragStartY } = dragProps.current;

        const x = clientX - dragStartX + left;
        const y = clientY - dragStartY + top;

        return { x, y };
    };

    useEffect(() => {
        dragRef.current.style.transform = `translate(${left}px, ${top}px)`;
    });

    useEffect(() => {
        props.onWidthChange && props.onWidthChange(contentWidth);
    }, [props.onWidthChange, contentWidth]);

    useEffect(() => {
        props.onHeightChange && props.onHeightChange(contentHeight);
    }, [props.onHeightChange, contentHeight]);

    useEffect(() => {
        if (contentRef.current) {
            setContentWidth(contentRef.current.getBoundingClientRect().width);
        }
    }, [width]);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.getBoundingClientRect().height);
        }
    }, [height]);

    const maximize = () => {
        if (isMaximized) {
            setWidth(preMaxSize.width);
            setHeight(preMaxSize.height);
            setTop(preMaxSize.top);
            setLeft(preMaxSize.left);
            setIsMaximized(false);
        } else {
            setPreMaxSize({
                width,
                height,
                top,
                left,
            });
            setWidth(window.innerWidth);
            setHeight(window.innerHeight - 80); // leave space for dock and menu
            setTop(24); // leave space for menu bar
            setLeft(0);
            setIsMaximized(true);
        }
    };

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setWindowActive(true);
        } else {
            setWindowActive(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onWindowInteract = () => {
        props.onInteract();
        setWindowActive(true);
        lastClickInside.current = true;
    };

    return (
        <div onMouseDown={onWindowInteract} style={styles.container}>
            <div
                style={Object.assign({}, styles.window, {
                    width,
                    height,
                    top,
                    left,
                    boxShadow: windowActive
                        ? '0 20px 60px rgba(0, 0, 0, 0.4)'
                        : '0 10px 30px rgba(0, 0, 0, 0.2)',
                })}
                ref={windowRef}
            >
                <div
                    style={styles.dragHitbox}
                    onMouseDown={startDrag}
                ></div>
                <div
                    style={Object.assign(
                        {},
                        styles.topBar,
                        !windowActive && { opacity: 0.7 }
                    )}
                >
                    <div style={styles.windowTopButtons}>
                        <div
                            style={{ ...styles.trafficLight, backgroundColor: Colors.trafficLightRed }}
                            onClick={props.closeWindow}
                        />
                        <div
                            style={{ ...styles.trafficLight, backgroundColor: Colors.trafficLightYellow }}
                            onClick={props.minimizeWindow}
                        />
                        <div
                            style={{ ...styles.trafficLight, backgroundColor: Colors.trafficLightGreen }}
                            onClick={maximize}
                        />
                    </div>
                    <div style={styles.windowHeader}>
                        <p style={Object.assign({}, styles.titleText, !windowActive && { color: Colors.darkGray })}>
                            {props.windowTitle}
                        </p>
                    </div>
                    <div style={styles.rightSpacer} />
                </div>
                <div style={styles.contentOuter}>
                    <div style={styles.content} ref={contentRef}>
                        {props.children}
                    </div>
                </div>
                <div
                    onMouseDown={startResize}
                    style={styles.resizeHitbox}
                ></div>
            </div>

            <div
                style={
                    !isResizing
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'nwse-resize',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <ResizeIndicator
                    top={top}
                    left={left}
                    width={width}
                    height={height}
                    resizeRef={resizeRef}
                />
            </div>
            <div
                style={
                    !isDragging
                        ? {
                              zIndex: -10000,
                              pointerEvents: 'none',
                          }
                        : {
                              zIndex: 1000,
                              cursor: 'move',
                              mixBlendMode: 'difference',
                          }
                }
            >
                <DragIndicator
                    width={width}
                    height={height}
                    dragRef={dragRef}
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Let clicks fall through to desktop
    },
    window: {
        backgroundColor: Colors.macOSWindowLight,
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        position: 'absolute',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255,255,255,0.3)',
        pointerEvents: 'auto', // Catch clicks on the window
        transition: 'box-shadow 0.2s',
    },
    dragHitbox: {
        position: 'absolute',
        width: '100%',
        height: 36,
        zIndex: 10000,
        top: 0,
        left: 0,
        cursor: 'default', // macOS uses default cursor for drag
    },
    resizeHitbox: {
        position: 'absolute',
        width: 16,
        height: 16,
        bottom: 0,
        right: 0,
        cursor: 'nwse-resize',
        zIndex: 10001,
    },
    topBar: {
        width: '100%',
        height: 36,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(255,255,255,0.4)', // Slightly more opaque for the header
    },
    contentOuter: {
        flexGrow: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto', // Allow scrolling
        backgroundColor: Colors.white,
    },
    windowTopButtons: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: 60, // Fixed width to help center the title
        zIndex: 10001, // Above drag hitbox
    },
    trafficLight: {
        width: 12,
        height: 12,
        borderRadius: '50%',
        cursor: 'pointer',
    },
    windowHeader: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none', // Allow dragging through title
    },
    titleText: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: 13,
        fontWeight: 600,
        color: '#333',
        margin: 0,
        padding: 0,
        userSelect: 'none',
    },
    rightSpacer: {
        width: 60, // Balance the left buttons for perfect centering
    }
};

export default Window;
