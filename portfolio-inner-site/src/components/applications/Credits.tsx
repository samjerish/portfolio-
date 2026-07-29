import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion, AnimatePresence } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const CREDITS_SEQUENCE = [
    `DESIGNED & DEVELOPED BY\nSAM JERISH D`,
    `DEVELOPMENT\nHTML • CSS • JavaScript • Python • Flask\nTypeScript • Blender • Git • GitHub`,
    `CREATIVE TOOLS\nBlender • Adobe Premiere Pro • Canva • ChatGPT\nAntigravity`,
    `SPECIAL THANKS\n\nMY PARENTS\nFor their unwavering support.`,
    `MY MENTORS & FACULTY\nFor their guidance, encouragement, and belief in me.`,
    `MY FRIENDS & COLLABORATORS\nFor every challenge, every idea, and every shared success.`,
    `THE OPEN SOURCE COMMUNITY\nFor building the technologies that inspire innovation.`,
    `"EVERY PROJECT BEGINS\nWITH AN IDEA.\n\nEVERY LINE OF CODE\nBRINGS IT TO LIFE."`,
    `© 2026 SAM JERISH D\nALL RIGHTS RESERVED\n\nTHANK YOU FOR VISITING\n\nSEE YOU IN THE NEXT PROJECT`
];

const Credits: React.FC<CreditsProps> = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (currentSlide < CREDITS_SEQUENCE.length - 1) {
            // Show each slide for a total of 4.5 seconds
            const timer = setTimeout(() => {
                setCurrentSlide((prev) => prev + 1);
            }, 4500);
            return () => clearTimeout(timer);
        }
    }, [currentSlide]);

    return (
        <Window
            top={48}
            left={48}
            width={1100}
            height={800}
            windowTitle="Credits"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2026 SAM JERISH D'}
        >
            <div
                className="site-page"
                style={styles.credits}
            >
                <div style={styles.slideContainer}>
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.5 }}
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                width: '100%', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                position: 'absolute',
                                height: '100%'
                            }}
                        >
                            <pre style={{ 
                                whiteSpace: 'pre-wrap', 
                                textAlign: 'center', 
                                lineHeight: 2.0, 
                                fontFamily: 'monospace', 
                                fontSize: '24px',
                                fontWeight: currentSlide === 0 ? 'bold' : 'normal'
                            }}>
                                {CREDITS_SEQUENCE[currentSlide]}
                            </pre>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    credits: {
        width: '100%',
        backgroundColor: 'black',
        paddingTop: 0,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 0,
        color: 'white',
        overflow: 'hidden',
        height: '100%',
        position: 'relative'
    },
    slideContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
    },
};

export default Credits;
