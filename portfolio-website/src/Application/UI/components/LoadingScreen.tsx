import React, { useCallback, useEffect, useState } from 'react';
import eventBus from '../EventBus';

type LoadingProps = {};

const LoadingScreen: React.FC<LoadingProps> = () => {
    const [progress, setProgress] = useState(0);
    const [displayProgress, setDisplayProgress] = useState(0);
    const [toLoad, setToLoad] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [overlayOpacity, setLoadingOverlayOpacity] = useState(1);
    const [loadingTextOpacity, setLoadingTextOpacity] = useState(1);
    const [startPopupOpacity, setStartPopupOpacity] = useState(0);
    const [firefoxPopupOpacity, setFirefoxPopupOpacity] = useState(0);
    const [webGLErrorOpacity, setWebGLErrorOpacity] = useState(0);

    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [disclaimerText, setDisclaimerText] = useState('');

    const [showBiosInfo, setShowBiosInfo] = useState(false);
    const [showLoadingResources, setShowLoadingResources] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);
    const [webGLError, setWebGLError] = useState(false);
    const [counter, setCounter] = useState(0);
    const [resources] = useState<string[]>([]);
    const [mobileWarning, setMobileWarning] = useState(window.innerWidth < 768);

    const onResize = () => {
        if (window.innerWidth < 768) {
            setMobileWarning(true);
        } else {
            setMobileWarning(false);
        }
    };

    window.addEventListener('resize', onResize);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('debug')) {
            start();
        } else if (!detectWebGLContext()) {
            setWebGLError(true);
        } else {
            setShowBiosInfo(true);
        }
    }, []);

    useEffect(() => {
        eventBus.on('loadedSource', (data) => {
            setProgress(data.progress);
            setToLoad(data.toLoad);
            setLoaded(data.loaded);
            resources.push(
                `Loaded ${data.sourceName}${getSpace(
                    data.sourceName
                )} ... ${Math.round(data.progress * 100)}%`
            );
            if (resources.length > 8) {
                resources.shift();
            }
        });
    }, []);

    useEffect(() => {
        setShowLoadingResources(true);
        setCounter(counter + 1);
    }, [loaded]);

    useEffect(() => {
        if (displayProgress < progress) {
            const timer = setInterval(() => {
                setDisplayProgress((prev) => {
                    const next = prev + 0.015;
                    if (next >= progress) {
                        return progress;
                    }
                    return next;
                });
            }, 30);
            return () => clearInterval(timer);
        }
    }, [displayProgress, progress]);

    useEffect(() => {
        if (displayProgress >= 1 && !webGLError) {
            setDoneLoading(true);
        }
    }, [displayProgress, webGLError]);

    useEffect(() => {
        if (webGLError) {
            setTimeout(() => {
                setWebGLErrorOpacity(1);
            }, 500);
        }
    }, [webGLError]);

    useEffect(() => {
        if (showDisclaimer) {
            let i = 0;
            const fullText = "Welcome to my portfolio";
            const timer = setInterval(() => {
                setDisclaimerText(fullText.substring(0, i + 1));
                i++;
                if (i === fullText.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setLoadingOverlayOpacity(0);
                        eventBus.dispatch('loadingScreenDone', {});
                        const ui = document.getElementById('ui');
                        if (ui) {
                            ui.style.pointerEvents = 'none';
                        }
                    }, 1500);
                }
            }, 100);
            return () => clearInterval(timer);
        }
    }, [showDisclaimer]);

    const start = useCallback(() => {
        setShowDisclaimer(true);
    }, []);

    const getSpace = (sourceName: string) => {
        let spaces = '';
        for (let i = 0; i < 24 - sourceName.length; i++) spaces += '\xa0';
        return spaces;
    };

    const getCurrentDate = () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        // add leading zero
        const monthFormatted = month < 10 ? `0${month}` : month;
        const dayFormatted = day < 10 ? `0${day}` : day;
        return `${monthFormatted}/${dayFormatted}/${year}`;
    };

    const detectWebGLContext = () => {
        var canvas = document.createElement('canvas');

        // Get WebGLRenderingContext from canvas element.
        var gl =
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl');
        // Report the result.
        if (gl && gl instanceof WebGLRenderingContext) {
            return true;
        }
        return false;
    };

    return (
        <div
            style={Object.assign({}, styles.overlay, {
                opacity: overlayOpacity,
                transform: `scale(${overlayOpacity === 0 ? 1.1 : 1})`,
            })}
        >
            {startPopupOpacity === 0 && loadingTextOpacity === 0 && (
                <div style={styles.blinkingContainer}>
                    <span className="blinking-cursor" />
                </div>
            )}
            {!webGLError && !showDisclaimer && (
                <div
                    style={Object.assign({}, styles.overlayText, {
                        opacity: loadingTextOpacity,
                    })}
                >
                    <div style={styles.body} className="loading-screen-body">
                        <div style={{ whiteSpace: 'pre-wrap', color: 'white', fontFamily: 'inherit', lineHeight: 1.3, fontSize: '16px', padding: '24px' }}>
                            {`SAM JERISH D OS v3.0
Portfolio Edition

$ boot --portfolio${
displayProgress >= 0.1 ? '\n\n[00:00.231] Initializing System.......................OK' : ''}${
displayProgress >= 0.2 ? '\n[00:00.547] Loading Details.........................OK' : ''}${
displayProgress >= 0.3 ? '\n[00:00.914] Loading Portfolio........................OK' : ''}${
displayProgress >= 0.4 ? '\n[00:01.283] Loading Projects.........................OK' : ''}${
displayProgress >= 0.5 ? '\n[00:01.602] Loading Experience.......................OK' : ''}${
displayProgress >= 0.6 ? '\n[00:01.948] Connecting GitHub........................OK' : ''}${
displayProgress >= 0.7 ? '\n[00:02.201] Loading Creative Assets..................OK' : ''}${
displayProgress >= 0.8 ? `\n[00:02.413] System ready.............................OK` : ''}${
displayProgress >= 1.0 ? '\n\nLaunching portfolio...\n\nReady.' : ''}`}
                        </div>

                        {doneLoading && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '32px',
                                    right: '32px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    backgroundColor: 'black',
                                    padding: '8px'
                                }}
                            >
                                <p>Click start to begin{'\xa0'}</p>
                                <span className="blinking-cursor" />
                                <div className="bios-start-button" onClick={start} style={{ marginLeft: '16px' }}>
                                    <p>START</p>
                                </div>
                            </div>
                        )}
                        {!doneLoading && <span className="blinking-cursor" />}
                    </div>
                    <div
                        style={styles.footer}
                        className="loading-screen-footer"
                    >
                        <p>{getCurrentDate()}</p>
                    </div>
                </div>
            )}

            {showDisclaimer && (
                <div style={{
                    width: '100%', height: '100%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontSize: '24px', fontFamily: 'inherit',
                    position: 'absolute', top: 0, left: 0
                }}>
                    <p>{disclaimerText}<span className="blinking-cursor" /></p>
                </div>
            )}

            {webGLError && (
                <div
                    style={Object.assign({}, styles.popupContainer, {
                        opacity: webGLErrorOpacity,
                    })}
                >
                    <div style={styles.startPopup}>
                        <p>
                            <b style={{ color: 'red' }}>CRITICAL ERROR:</b> No
                            WebGL Detected
                        </p>
                        <div style={styles.spacer} />
                        <div style={styles.spacer} />

                        <p>WebGL is required to run this site.</p>
                        <p>
                            Please enable it or switch to a browser which
                            supports WebGL
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    overlay: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        transition: 'opacity 0.2s, transform 0.2s',
        MozTransition: 'opacity 0.2s, transform 0.2s',
        WebkitTransition: 'opacity 0.2s, transform 0.2s',
        OTransition: 'opacity 0.2s, transform 0.2s',
        msTransition: 'opacity 0.2s, transform 0.2s',

        transitionTimingFunction: 'ease-in-out',
        MozTransitionTimingFunction: 'ease-in-out',
        WebkitTransitionTimingFunction: 'ease-in-out',
        OTransitionTimingFunction: 'ease-in-out',
        msTransitionTimingFunction: 'ease-in-out',

        boxSizing: 'border-box',
        fontSize: 16,
        letterSpacing: 0.8,
    },

    spacer: {
        height: 16,
    },
    header: {
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
    },
    popupContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warning: {
        color: 'yellow',
    },
    blinkingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        boxSizing: 'border-box',
        padding: 48,
    },
    startPopup: {
        backgroundColor: '#000',
        padding: 24,
        border: '7px solid #fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 500,
        // alignItems: 'center',
    },
    headerInfo: {
        marginLeft: 64,
    },
    red: {
        color: '#00ff00',
    },
    link: {
        // textDecoration: 'none',
        color: '#4598ff',
        cursor: 'pointer',
    },
    overlayText: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    body: {
        flex: 1,
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        flexDirection: 'column',
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    resourcesLoadingList: {
        display: 'flex',
        paddingLeft: 32,
        paddingBottom: 32,
        flexDirection: 'column',
    },
    logoImage: {
        width: 64,
        height: 42,
        imageRendering: 'pixelated',
        marginRight: 16,
    },
    footer: {
        boxSizing: 'border-box',
        width: '100%',
    },
};

export default LoadingScreen;
