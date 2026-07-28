import React from 'react';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';
import me from '../../assets/images/1st_photo.png';
import camera from '../../assets/images/png.jpeg';
import igIcon from '../../assets/images/contact-ig.svg';

export interface AboutProps { }

const About: React.FC<AboutProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>I'm SAM JERISH D</h3>
            <br />


            <div className="text-block">
                <p>
                    I’m an AI & ML Engineering student currently pursuing my 3rd year at <span style={{ fontSize: '0.85em' }}>Karunya Institute of Science and Technology</span>. I’m passionate about building innovative software solutions that solve real-world problems.
                </p>
                <br />
                <p>
                    Thank you for taking the time to check out my portfolio. If you have any questions or comments, feel
                    free to contact me using{' '}
                    <Link to="/contact">this form</Link> or shoot me an email at{' '}
                    <a href="mailto:samjerishd@gmail.com">
                        samjerishd@gmail.com
                    </a>.
                </p>
            </div>

            <ResumeDownload />

            <div className="text-block">
                <h3>About Me</h3>
                <br />
                <div style={{ textAlign: 'justify', lineHeight: 1.6 }}>
                    <p style={{ marginBottom: 32 }}>
                        From a young age, I’ve been fascinated by computers and curious about how technology works. That curiosity gradually turned into a passion for coding, problem-solving, and building innovative software. I enjoy learning new technologies and turning ideas into real-world applications.
                    </p>

                </div>
                <div className="captioned-image" style={{ width: '100%', maxWidth: 400, marginTop: 24 }}>
                    <img src={me} style={{ width: '100%', borderRadius: 8 }} alt="Sam Jerish D" />
                    <p style={{ marginTop: 16, textAlign: 'center', fontStyle: 'italic', opacity: 0.8 }}>
                        <b>Fig 1:</b> Childhood photo of using computer
                    </p>
                </div>
                <div style={{ textAlign: 'justify', lineHeight: 1.6, marginTop: 48, marginBottom: 32, padding: '16px 24px', backgroundColor: 'rgba(128, 128, 128, 0.1)', borderLeft: '4px solid #888', borderRadius: '0 8px 8px 0' }}>
                    <p style={{ margin: 0, fontSize: '1.1em' }}>
                        <b>Vision:</b> To combine creativity and technology to solve real-world problems.<br /><br />
                        <b>Mission:</b> To learn, innovate, and build impactful AI-driven solutions that make a difference.
                    </p>
                </div>
                <br />
                <h3>Technical Skills</h3>
                <br />
                <ul>
                    <li>
                        <b>Programming Languages:</b> Python, Java
                    </li>
                    <li>
                        <b>Web Development:</b> HTML, CSS, JavaScript, React
                    </li>
                    <li>
                        <b>Database & Tools:</b> SQL, GitHub
                    </li>
                    <li>
                        <b>Design & Modeling:</b> Photoshop, Blender, After Effects
                    </li>
                    <li>
                        <b>Media:</b> Photography, Video Editing
                    </li>
                    <li>
                        <b>Common Skills:</b> Decision Making, Team Work, Leadership, Creativity
                    </li>
                </ul>
            </div>

            <div className="text-block" style={{ marginTop: 48, clear: 'both' }}>
                <h3>Hobbies & Interests</h3>
                <br />
                <div className="captioned-image" style={{ width: '100%', maxWidth: 350, marginTop: 8, marginBottom: 16, float: 'right', marginLeft: 32 }}>
                    <img src={camera} style={{ width: '100%', borderRadius: 8 }} alt="Photography Hobby" />
                    <p style={{ marginTop: 12, textAlign: 'center', fontStyle: 'italic', opacity: 0.8 }}>
                        <b>Fig 2:</b> Capturing moments
                    </p>
                </div>
                <p style={{ textAlign: 'justify', lineHeight: 1.6, marginBottom: 16 }}>
                    Beyond the screen, I have a deep passion for <b>photography</b> and <b>video editing</b>, capturing moments and transforming them into meaningful visual stories that have strengthened my creativity and eye for design. This passion led me to be recognized as <b>Best Media Coordinator</b> for delivering high-quality media content, producing 30K+ visuals, creating 20+ videos, and overseeing technical system control across 10+ events.
                </p>
                <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{ fontWeight: 'bold' }}>Click to view my works:</span>
                    <a rel="noreferrer" target="_blank" href="https://www.instagram.com/samjerishd/" style={{ display: 'flex', alignItems: 'center' }} title="Check out my Instagram page">
                        <img src={igIcon} alt="Instagram" style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#fff' }} />
                    </a>
                </div>
                <p style={{ textAlign: 'justify', lineHeight: 1.6 }}>
                    During the COVID-19 lockdown, when most of my time was spent at home, I began exploring photography and video editing out of curiosity. What started as experimenting with a mobile camera and simple editing software soon turned into a genuine passion. I spent countless hours learning composition, color grading, storytelling, and editing techniques through practice and online resources. As my skills grew, so did my confidence, eventually allowing me to contribute to school and college events, where I produced thousands of visuals and videos. That journey transformed a lockdown hobby into one of my strongest creative skills, complementing my passion for technology and design.
                </p>
            </div>
        </div>
    );
};

export default About;
