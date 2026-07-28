import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion, AnimatePresence } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const SLIDES = [
`CREDITS

DESIGNED & DEVELOPED BY

SAM JERISH D`,

`DEVELOPMENT

FRONTEND

HTML • CSS • JavaScript

BACKEND

Python • Flask

PROGRAMMING

TypeScript

3D DEVELOPMENT

Blender

VERSION CONTROL

Git • GitHub`,

`CREATIVE TOOLS

Blender

Adobe Premiere Pro

Canva

ChatGPT

Gemini

Antigravity`,

`SPECIAL THANKS

MY PARENTS

For their unwavering support.

MY MENTORS & FACULTY

For their guidance,
encouragement,
and belief in me.

MY FRIENDS & COLLABORATORS

For every challenge,
every idea,
and every shared success.

THE OPEN SOURCE COMMUNITY

For building the technologies
that inspire innovation.`,

`"EVERY PROJECT BEGINS WITH AN IDEA.

EVERY LINE OF CODE BRINGS IT TO LIFE."`,

`© 2026 SAM JERISH D

ALL RIGHTS RESERVED


THANK YOU FOR VISITING


SEE YOU IN THE NEXT PROJECT`
];

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
