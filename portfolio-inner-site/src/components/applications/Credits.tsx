import React from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const CREDITS = [
    {
        title: 'Engineering & Design',
        rows: [['SAM JERISH D', 'All']],
    },
    {
        title: 'Modeling & Texturing',
        rows: [
            ['SAM JERISH D', 'Texturing, Composition, & UV'],
            ['Mickael Boitte', 'Computer Model'],
            ['Sean Nicolas', 'Environment Models'],
        ],
    },
    {
        title: 'Sound Design',
        rows: [
            ['SAM JERISH D', 'Mixing, Composition, & Foley'],
            ['Sound Cassette', 'Office Ambience'],
            ['Windows 95 Startup Sound', 'Microsoft'],
        ],
    },
    {
        title: 'Special Thanks',
        rows: [
            ['Bruno Simon', 'SimonDev'],
            ['Lorelei Kravinsky', 'Scott Bass'],
            ['Trey Briccetti', 'Mom, Dad & Angela'],
        ],
    },
    {
        title: 'Inspiration',
        rows: [
            ['Bruno Simon', 'Jesse Zhou'],
            ['Pink Yellow', 'Vivek Patel'],
        ],
    },
];

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
                        animate={{ y: -1500 }}
                        transition={{
                            duration: 25,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                        style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}
                    >
                        <h2 style={{ marginBottom: 16 }}>Credits</h2>
                        <p style={{ marginBottom: 64 }}>samjerishd.com, 2026</p>
                        
                        {CREDITS.map((credit, idx) => (
                            <div key={`section-${idx}`} style={styles.section}>
                                <h3 style={styles.sectionTitle}>{credit.title}</h3>
                                {credit.rows.map((row, i) => (
                                    <div key={`row-${i}`} style={styles.row}>
                                        <p>{row[0]}</p>
                                        <p>{row[1]}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
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
