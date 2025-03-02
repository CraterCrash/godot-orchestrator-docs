import React from 'react';
import clsx from 'clsx';
export default function FooterLayout({style, links, logo, copyright}) {
  return (
      <footer
          className={clsx('footer', {
              'footer--dark': style === 'dark',
          })}>
          <div className="footer-separator"></div>
          <div className="footer-wrapper">
              <div className="footer-links">
                  <a href="https://cratercrash.space/legal/webterms/">Terms</a>|
                  <a href="https://cratercrash.space/legal/webprivacy/">Privacy</a>|
                  <a href="https://cratercrash.space/legal/webcookies/">Cookie</a>|
                  <a href="https://cratercrash.space/legal/imprint">Imprint</a>|
                  <a href="https://cratercrash.space/legal/disclaimer/">Disclaimer</a>|
                  <a href="https://cratercrash.space/legal/">Legal</a>
              </div>
              <div className="copyright">Copyright <span className="symbol">&copy;</span> 2025 Crater Crash Studios, LLC. All Rights Reserved.</div>
              <div className="socials">
                  <a href="https://bsky.app/profile/cratercrash.space"><img src="https://gravity.cratercrash.space/227-fsn/i/505as.png" alt="A pink and purple polka-dotted circular icon featuring a stylized butterfly within a rounded square, representing the BlueSky logo, set against a transparent background."/></a>
                  <a href="https://youtube.com/@cratercrash"><img src="https://gravity.cratercrash.space/227-fsn/i/504as.png" alt="A pink and purple polka-dotted circular icon featuring a rounded rectangle with a play button in the center, representing the YouTube logo, set against a transparent background."/></a>
                  <a href="https://github.com/cratercrash"><img src="https://gravity.cratercrash.space/227-fsn/i/501as.png" alt="A pink and purple polka-dotted circular icon resembling the silhouette of a cat with pointed ears and a curved tail, representing the GitHub logo, set against a transparent background."/></a>
                  <a href="https://discord.gg/wYQpvuYDhT"><img src="https://gravity.cratercrash.space/227-fsn/i/500as.png" alt="A pink and purple polka-dotted circular icon resembling a stylized smiling face with two large eyes and a curved mouth, representing the Discord logo, set against a transparent background."/></a>
              </div>
          </div>
      </footer>
  );
}
