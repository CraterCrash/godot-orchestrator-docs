import React from 'react';
import clsx from 'clsx';
export default function FooterLayout({style, links, logo, copyright}) {
  return (
      <footer
          className={clsx('footer', {
              'footer--dark': style === 'dark',
          })}>
          <div className="vs-footer">
              <div className="vs-logo">
                  <img className="vs-logo-image"
                       src="https://cdn.vahera.cloud/utG8NiO3oN8sfXvI2ZZ0zg/30dd22ef-b3bf-4fa3-70a9-af8c8cf45b00/public"/>
              </div>
              <div className="footer-links">
                  <a className="footer-link" href="https://www.vahera.com/about/">About</a>
                  <a className="footer-link" href="https://forums.vahera.com">Support</a>
                  <a className="footer-link" href="https://www.vahera.com/legal/index.html">Legal</a>
              </div>
              <div className="footer-terms terms-copyright">&copy; 2022-2024 Vahera Studios, LLC. All Rights Reserved.
              </div>
              <div className="footer-terms terms-trademark">All trademarks referenced herein are the properties of
                  their respective owners.
              </div>
              <div className="footer-terms terms-trademark">Vahera Studios is not affiliated with Godot Engine.
              </div>
              <div className="footer-sublinks">
                  <a className="footer-link" href="https://www.vahera.com/legal/webterms.html">Terms</a>
                  <a className="footer-link" href="https://www.vahera.com/legal/webprivacy.html">Privacy</a>
                  <a className="footer-link" href="https://www.vahera.com/legal/webcookies.html">Cookie Policy</a>
              </div>
          </div>
      </footer>
  );
}
