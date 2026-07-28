import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion, AnimatePresence } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const CREDITS_TEXT = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGNED & DEVELOPED BY          SAM JERISH D

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRONTEND                         HTML • CSS • JavaScript
BACKEND                          Python • Flask
PROGRAMMING                      TypeScript
3D DEVELOPMENT                   Blender
VERSION CONTROL                  Git • GitHub

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATIVE TOOLS                   Blender
                                 Adobe Premiere Pro
                                 Canva
                                 ChatGPT
                                 Gemini
                                 Antigravity

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPECIAL THANKS                   My Parents
                                 My Mentors & Faculty
                                 My Friends & Collaborators
                                 The Open Source Community

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUOTE                            "Every project begins with an idea.
                                 Every line of code brings it to life."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COPYRIGHT                        © 2026 SAM JERISH D
                                 All Rights Reserved

                         Thank You for Visiting
                                 See You in the Next Project

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

const SLIDES = CREDITS_TEXT.split('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━').map(s => s.trim()).filter(s => s.length > 0);

const Credits: React.FC<CreditsProps> = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, 6000); // Wait 6 seconds per slide
        return () => clearInterval(timer);
    }, []);

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
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 1.5 }}
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                width: '100%', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                position: 'absolute' 
                            }}
                        >
                            <pre style={{ 
                                whiteSpace: 'pre-wrap', 
                                textAlign: 'center', 
                                lineHeight: 2.0, 
                                fontFamily: 'monospace', 
                                fontSize: '18px' 
                            }}>
                                {SLIDES[currentIndex]}
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
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 600,
        alignSelf: 'center',
        marginBottom: 8,
    },
    section: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 64,
    },
    sectionTitle: {
        marginBottom: 24,
    },
    slideContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
};

export default Credits;
