import React from 'react';
import ResumeDownload from './ResumeDownload';
import certImg from '../../assets/images/hackathon_certificate.jpg';
import prizeImg from '../../assets/images/hackathon_prize.jpg';
import mediaPhoto from '../../assets/images/media_coordinator.jpg';
import mediaCert from '../../assets/images/media_certificate.png';
import mediaScreen1 from '../../assets/images/screenshot_media_1.png';
import mediaScreen2 from '../../assets/images/screenshot_media_2.png';

export interface EducationProps {}

const Education: React.FC<EducationProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Karunya Institute of Technology and Sciences</h1>
                        <h3 style={{ margin: 0, fontWeight: 500, opacity: 0.9 }}>B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)</h3>
                        <p style={{ margin: 0, fontWeight: 'bold', opacity: 0.7 }}>2024 - 2028</p>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    <b>Specialization:</b> Artificial Intelligence & Machine Learning
                </p>
                <br />
                <p>
                    <b>Location:</b> Coimbatore
                </p>
                <br />
                <p>
                    <b>Relevant Coursework:</b>
                </p>
                <ul>
                    <li>
                        <p>Data Structures & Algorithms</p>
                    </li>
                    <li>
                        <p>Object-Oriented Programming</p>
                    </li>
                    <li>
                        <p>Database Management Systems</p>
                    </li>
                    <li>
                        <p>Operating Systems</p>
                    </li>
                    <li>
                        <p>Computer Networks</p>
                    </li>
                    <li>
                        <p>Artificial Intelligence</p>
                    </li>
                    <li>
                        <p>Machine Learning</p>
                    </li>
                    <li>
                        <p>Probability & Statistics</p>
                    </li>
                </ul>
                <br />
                <br />
                <h3>Awards</h3>
                <br />
                <p style={{ textAlign: 'justify', lineHeight: 1.6, marginBottom: 16 }}>
                    Secured 2nd Place in the Ideathon Competition at Karunya University (2024) by presenting an AI-driven solution to enhance tribal farming practices.
                </p>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: 16, alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 300px', maxWidth: '45%' }}>
                        <img src={prizeImg} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }} alt="Ideathon Prize" />
                    </div>
                    <div style={{ flex: '1 1 300px', maxWidth: '45%' }}>
                        <img src={certImg} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }} alt="Ideathon Certificate" />
                    </div>
                </div>
                <br />
                <p style={{ textAlign: 'justify', lineHeight: 1.6, marginTop: 16 }}>
                    Beyond the classroom, I lead the creative and digital presence of the AIML Department at Karunya University. From serving as the Joint Multimedia Coordinator of Matrix Karunya to being promoted as the Department Media Coordinator, I have managed the department’s Instagram and LinkedIn platforms, documented 27+ events, created over 30K visuals and 20+ videos, coordinated system control for 10+ events, and earned recognition as the <b>Best Media Coordinator</b>.
                </p>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: 16, alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 300px', maxWidth: '45%' }}>
                        <img src={mediaCert} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }} alt="Media Coordinator Certificate" />
                    </div>
                    <div style={{ flex: '1 1 300px', maxWidth: '45%' }}>
                        <img src={mediaScreen2} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }} alt="Media Output" />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: 24, alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 300px', maxWidth: '45%' }}>
                        <img src={mediaScreen1} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }} alt="Media Output 1" />
                    </div>
                    <div style={{ flex: '1 1 300px', maxWidth: '45%' }}>
                        <img src={mediaPhoto} style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }} alt="Best Media Coordinator" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    header: {
        marginBottom: 48,
        width: '100%',
        paddingBottom: 24,
        borderBottom: '1px solid black',
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
};

export default Education;
