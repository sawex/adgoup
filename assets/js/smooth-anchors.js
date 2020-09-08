/**
 * Smooth scroll to an anchor target
 *
 * @version 1.0.2
 * @package Maximumstart
 */
const smoothAnchors = () => {
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const pageUrl = new URL(document.URL);
      const url = new URL(anchor.href);
      const { hash } = url;

      if (hash === '#') return;

      if (url.pathname === pageUrl.pathname) {
        const target = document.querySelector(hash);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
          });
        }
      } else {
        location = url.href;
      }
    });
  });
};

export default smoothAnchors;
