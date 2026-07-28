import React from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const CREDITS_TEXT = `  CREDITS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                 DESIGNED & DEVELOPED BY

                     SAM JERISH D

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                      DEVELOPMENT

FRONTEND

HTML • CSS • JAVASCRIPT

BACKEND

PYTHON • FLASK

PROGRAMMING

TYPESCRIPT

3D DEVELOPMENT

BLENDER

VERSION CONTROL

GIT • GITHUB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    CREATIVE TOOLS

BLENDER

ADOBE PREMIERE PRO

CANVA

CHATGPT

GEMINI

ANTIGRAVITY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    SPECIAL THANKS

MY PARENTS

For their unwavering support.

MY MENTORS & FACULTY

For their guidance, encouragement,

and belief in me.

MY FRIENDS & COLLABORATORS

For every challenge, every idea,

and every shared success.

THE OPEN SOURCE COMMUNITY

For building the technologies

that inspire innovation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                 "EVERY PROJECT BEGINS

                     WITH AN IDEA.

                  EVERY LINE OF CODE

                 BRINGS IT TO LIFE."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                  © 2026 SAM JERISH D

                  ALL RIGHTS RESERVED.

                THANK YOU FOR VISITING.

              SEE YOU IN THE NEXT PROJECT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

const Credits: React.FC<CreditsProps> = (props) => {
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
                    <motion.div
                        initial={{ y: 800 }}
                        animate={{ y: -2500 }}
                        transition={{
                            duration: 40,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                        style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}
                    >
                        <pre style={{ 
                            whiteSpace: 'pre-wrap', 
                            textAlign: 'center', 
                            lineHeight: 1.8, 
                            fontFamily: 'monospace', 
                            fontSize: '16px' 
                        }}>
                            {CREDITS_TEXT}
                        </pre>
                    </motion.div>
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
