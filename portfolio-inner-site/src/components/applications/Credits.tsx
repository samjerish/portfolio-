import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion, AnimatePresence } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const INTRO_TEXT = `DESIGNED & DEVELOPED BY

SAM JERISH D`;

const ROLLING_TEXT = `DEVELOPMENT

FRONTEND

HTML • CSS • JavaScript

BACKEND

Python • Flask

PROGRAMMING

TypeScript

3D DEVELOPMENT

Blender

VERSION CONTROL

Git • GitHub

CREATIVE TOOLS

Blender

Adobe Premiere Pro

Canva

ChatGPT

Gemini

Antigravity

SPECIAL THANKS

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

that inspire innovation.

"EVERY PROJECT BEGINS
WITH AN IDEA.

EVERY LINE OF CODE
BRINGS IT TO LIFE."

© 2026 SAM JERISH D

ALL RIGHTS RESERVED


THANK YOU FOR VISITING


SEE YOU IN THE NEXT PROJECT`;

const Credits: React.FC<CreditsProps> = (props) => {
    const [phase, setPhase] = useState<'intro' | 'rolling'>('intro');

    useEffect(() => {
        // Show intro for 4 seconds, then transition to rolling phase
        const timer = setTimeout(() => {
            setPhase('rolling');
        }, 4000);
        return () => clearTimeout(timer);
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
                        {phase === 'intro' && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
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
                                    fontWeight: 'bold'
                                }}>
                                    {INTRO_TEXT}
                                </pre>
                            </motion.div>
                        )}

                        {phase === 'rolling' && (
                            <motion.div
                                key="rolling"
                                initial={{ y: 800, opacity: 1 }}
                                animate={{ y: -3500, opacity: 1 }}
                                transition={{ duration: 45, ease: 'linear' }}
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    width: '100%', 
                                    alignItems: 'center', 
                                    justifyContent: 'flex-start',
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
                                    {ROLLING_TEXT}
                                </pre>
                            </motion.div>
                        )}
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
