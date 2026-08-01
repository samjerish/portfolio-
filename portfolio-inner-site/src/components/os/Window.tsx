import React, { useEffect, useRef, useState } from 'react';
import { IconName } from '../../assets/icons';
import { Icon } from '../general';
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
    bottomLeftText?: string;
    rainbow?: boolean;
    windowBarColor?: string;
    windowBarIcon?: IconName;
    onWidthChange?: (width: number) => void;
    onHeightChange?: (height: number) => void;
    children?: React.ReactNode;
}

const Window: React.FC<WindowProps> = (props) => {
    const windowRef = useRef<any>(null);
    const dragRef = useRef<any>(null);
    const contentRef = useRef<any>(null);
    const dragProps = useRef<{ dragStartX: any; dragStartY: any }>();
    const resizeRef = useRef<any>(null);

    const [width, setWidth] = useState(() => Math.min(props.width, window.innerWidth));
    const [height, setHeight] = useState(() => Math.min(props.height, window.innerHeight - 56));
    const [top, setTop] = useState(() => {
        const h = Math.min(props.height, window.innerHeight - 56);
        return Math.max(0, Math.min(props.top, window.innerHeight - h - 28));
    });
    const [left, setLeft] = useState(() => {
        const w = Math.min(props.width, window.innerWidth);
        return Math.max(0, Math.min(props.left, window.innerWidth - w));
    });

    const lastClickInside = useRef(false);
    const [contentWidth, setContentWidth] = useState(() => Math.min(props.width, window.innerWidth));
    const [contentHeight, setContentHeight] = useState(() => Math.min(props.height, window.innerHeight - 56));
    const [windowActive, setWindowActive] = useState(true);
    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxSize, setPreMaxSize] = useState({ width, height, top, left });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const startResize = (event: any) => {
        event.preventDefault();
        setIsResizing(true);
        window.addEventListener('mousemove', onResize, false);
        window.addEventListener('mouseup', stopResize, false);
    };

    const onResize = ({ clientX, clientY }: any) => {
        let curWidth = clientX - left;
        let curHeight = clientY - top;
        curWidth = Math.min(curWidth, window.innerWidth - left);
        curHeight = Math.min(curHeight, window.innerHeight - top - 28);
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
        dragProps.current = { dragStartX: clientX, dragStartY: clientY };
        window.addEventListener('mousemove', onDrag, false);
        window.addEventListener('mouseup', stopDrag, false);
    };

    const onDrag = ({ clientX, clientY }: any) => {
        const { x, y } = getXY(clientX, clientY);
        dragRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dragRef.current.style.opacity = 1;
    };

    const stopDrag = ({ clientX, clientY }: any) => {
        setIsDragging(false);
        const { x, y } = getXY(clientX, clientY);
        setTop(y);
        setLeft(x);
        window.removeEventListener('mousemove', onDrag, false);
        window.removeEventListener('mouseup', stopDrag, false);
    };

    const getXY = (clientX: number, clientY: number) => {
        if (!dragProps.current) return { x: 0, y: 0 };
        const { dragStartX, dragStartY } = dragProps.current;
        const x = Math.max(0, Math.min(clientX - dragStartX + left, window.innerWidth - width));
        const y = Math.max(0, Math.min(clientY - dragStartY + top, window.innerHeight - height - 28));
        return { x, y };
    };

    useEffect(() => { dragRef.current.style.transform = `translate(${left}px, ${top}px)`; });
    useEffect(() => { props.onWidthChange && props.onWidthChange(contentWidth); }, [props.onWidthChange, contentWidth]);
    useEffect(() => { props.onHeightChange && props.onHeightChange(contentHeight); }, [props.onHeightChange, contentHeight]);
    useEffect(() => { if (contentRef.current) setContentWidth(contentRef.current.getBoundingClientRect().width); }, [width]);
    useEffect(() => { if (contentRef.current) setContentHeight(contentRef.current.getBoundingClientRect().height); }, [height]);

    const maximize = () => {
        if (isMaximized) {
            setWidth(preMaxSize.width);
            setHeight(preMaxSize.height);
            setTop(preMaxSize.top);
            setLeft(preMaxSize.left);
            setIsMaximized(false);
        } else {
            setPreMaxSize({ width, height, top, left });
            setWidth(window.innerWidth);
            setHeight(window.innerHeight - 28);
            setTop(0);
            setLeft(0);
            setIsMaximized(true);
        }
    };

    const onCheckClick = () => {
        setWindowActive(!!lastClickInside.current);
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => window.removeEventListener('mousedown', onCheckClick, false);
    }, []);

    const onWindowInteract = () => {
        props.onInteract();
        setWindowActive(true);
        lastClickInside.current = true;
    };

    const titleBarColor = windowActive ? '#000080' : '#808080';

    return (
        <div onMouseDown={onWindowInteract} style={styles.container}>
            <div
                style={Object.assign({}, styles.window, { width, height, top, left })}
                ref={windowRef}
            >
                {/* Drag hitbox — sits over title bar */}
                <div style={styles.dragHitbox} onMouseDown={startDrag} />

                {/* Windows 98 title bar */}
                <div style={Object.assign({}, styles.titleBar, { background: titleBarColor })}>
                    {props.windowBarIcon && (
                        <Icon icon={props.windowBarIcon} style={styles.titleIcon} />
                    )}
                    <span style={styles.titleText}>
                        {props.windowTitle || 'Window'}
                    </span>
                    <div style={styles.titleButtons}>
                        <button style={styles.titleBtn} onClick={props.minimizeWindow} title="Minimize">_</button>
                        <button style={styles.titleBtn} onClick={maximize} title="Maximize">□</button>
                        <button style={Object.assign({}, styles.titleBtn, styles.closeBtn)} onClick={props.closeWindow} title="Close">✕</button>
                    </div>
                </div>

                {/* Menu bar area (visual only) */}
                <div style={styles.menuStrip}>
                    <span style={styles.menuItem}>File</span>
                    <span style={styles.menuItem}>Edit</span>
                    <span style={styles.menuItem}>View</span>
                    <span style={styles.menuItem}>Help</span>
                </div>

                {/* Content */}
                <div style={styles.contentOuter}>
                    <div style={styles.content} ref={contentRef}>
                        {props.children}
                    </div>
                </div>

                {/* Status bar */}
                {props.bottomLeftText && (
                    <div style={styles.statusBar}>
                        <span>{props.bottomLeftText}</span>
                    </div>
                )}

                {/* Resize grip */}
                <div onMouseDown={startResize} style={styles.resizeHitbox} />
            </div>

            <div style={!isResizing ? { zIndex: -10000, pointerEvents: 'none' } : { zIndex: 1000, cursor: 'nwse-resize', mixBlendMode: 'difference' }}>
                <ResizeIndicator top={top} left={left} width={width} height={height} resizeRef={resizeRef} />
            </div>
            <div style={!isDragging ? { zIndex: -10000, pointerEvents: 'none' } : { zIndex: 1000, cursor: 'move', mixBlendMode: 'difference' }}>
                <DragIndicator width={width} height={height} dragRef={dragRef} />
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
        pointerEvents: 'none',
    },
    window: {
        backgroundColor: '#c0c0c0',
        position: 'absolute',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        // Classic Windows raised border
        boxShadow: 'inset -1px -1px #808080, inset 1px 1px #ffffff, inset -2px -2px #404040, inset 2px 2px #dfdfdf',
        pointerEvents: 'auto',
    },
    dragHitbox: {
        position: 'absolute',
        width: '100%',
        height: 20,
        zIndex: 10000,
        top: 0,
        left: 0,
        cursor: 'default',
    },
    titleBar: {
        width: '100%',
        height: 20,
        display: 'flex',
        alignItems: 'center',
        padding: '0 3px',
        boxSizing: 'border-box',
        flexShrink: 0,
        gap: 4,
        background: '#000080',
    },
    titleIcon: {
        width: 14,
        height: 14,
        flexShrink: 0,
    },
    titleText: {
        flex: 1,
        color: '#ffffff',
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 11,
        fontWeight: 'bold',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    titleButtons: {
        display: 'flex',
        gap: 2,
        flexShrink: 0,
    },
    titleBtn: {
        width: 16,
        height: 14,
        backgroundColor: '#c0c0c0',
        border: 'none',
        boxShadow: 'inset -1px -1px #808080, inset 1px 1px #ffffff',
        cursor: 'pointer',
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 9,
        fontWeight: 'bold',
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        lineHeight: 1,
    },
    closeBtn: {
        marginLeft: 2,
    },
    menuStrip: {
        display: 'flex',
        backgroundColor: '#c0c0c0',
        padding: '2px 4px',
        flexShrink: 0,
        borderBottom: '1px solid #808080',
        gap: 2,
    },
    menuItem: {
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 11,
        padding: '1px 6px',
        color: '#000000',
        cursor: 'pointer',
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
    statusBar: {
        display: 'flex',
        alignItems: 'center',
        height: 18,
        padding: '0 4px',
        backgroundColor: '#c0c0c0',
        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #ffffff',
        fontFamily: 'MSSerif, "MS Sans Serif", sans-serif',
        fontSize: 11,
        color: '#000000',
        flexShrink: 0,
    },
    contentOuter: {
        flexGrow: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        margin: 2,
        boxShadow: 'inset 1px 1px #808080, inset -1px -1px #ffffff',
    },
    content: {
        flex: 1,
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
    },
};

export default Window;
