import React from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const CREDITS_TEXT = `=========================================================
                    END OF PORTFOLIO
=========================================================

DIRECTOR
SAM JERISH D

DESIGN & DEVELOPMENT
SAM JERISH D

UI / UX DESIGN
SAM JERISH D

FRONTEND DEVELOPMENT
HTML • CSS • JavaScript

BACKEND & DATABASE
Python • Flask • Firebase

3D & VISUAL DESIGN
Blender • Spline

MULTIMEDIA
Photography
Videography
Video Editing
Graphic Design

SPECIAL THANKS

My Parents
For their endless support and encouragement.

Karunya Institute of Technology and Sciences
For providing opportunities to learn and grow.

Matrix – AIML Students Association
For trusting me as Joint Multimedia Coordinator
and recognizing me as Best Media Coordinator.

Every Mentor, Faculty Member & Friend
Who inspired, guided, and challenged me.

OPEN SOURCE COMMUNITY
GitHub
Stack Overflow
MDN Web Docs

POWERED BY

Visual Studio Code
Git & GitHub
Figma
Canva
Adobe Photoshop
Adobe Premiere Pro
ChatGPT

MISSION

Building intelligent solutions where
Creativity meets Technology.

STATUS
Portfolio Successfully Executed.

UPTIME
Learning Never Stops.

FINAL MESSAGE

Thank you for visiting.

See you in the next project...

> exit

Connection closed.`;

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
