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
                  <a href="https://cratercrash.com/webterms/">Terms</a>|
                  <a href="https://cratercrash.com/webprivacy/">Privacy</a>|
                  <a href="https://cratercrash.com/webcookies/">Cookie</a>|
                  <a href="https://cratercrash.com/legal/">Legal</a>
              </div>
              <div className="copyright">Copyright <span className="symbol">&copy;</span> 2024 Crater Crash Studios, LLC. All Rights Reserved.</div>
              <div className="trademark"><i>All trademarks referenced herein are the properties of their respective owners.</i></div>
              <div className="affiliation"><i>Crater Crash Studios, LLC is not affiliated with Godot Engine.</i></div>
              <div className="socials">
                  <a href="https://vahera.social"><img src="https://cdn.cratercrash.space/utG8NiO3oN8sfXvI2ZZ0zg/addade82-9749-4bf1-7955-c46430bb6500/public"/></a>
                  <a href="https://youtube.com/@cratercrash"><img src="https://cdn.cratercrash.space/utG8NiO3oN8sfXvI2ZZ0zg/e167618d-a0fb-4b7b-f054-646049373800/public"/></a>
                  <a href="https://github.com/Vahera/"><img src="https://cdn.cratercrash.space/utG8NiO3oN8sfXvI2ZZ0zg/b2b53ec8-e3e3-403c-69e3-0298f4ee3c00/public"/></a>
                  <a href="https://discord.gg/J3UWtzWSkT"><img src="https://cdn.cratercrash.space/utG8NiO3oN8sfXvI2ZZ0zg/b40f7b61-e809-40e5-9461-9bd50af72400/public"/></a>
              </div>
          </div>
      </footer>
  );
}
