import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <span className="footer-text">© 2024 <a href="https://foodybro.vercel.app/">FoodyBro</a> All Rights Reserved.</span>
                <ul className="footer-links">
                    <li>
                        <a href="https://linkedin.com/in/rajputshashank">LinkedIn</a>
                    </li>
                    <li>
                        <a href="https://github.com/rajputshashank003">GitHub</a>
                    </li>
                    <li>
                        <a href="https://github.com/rajputshashank003/FoodyBro">Project Repository</a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/rajputshashank">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
