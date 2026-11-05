# travismbrown.com

My personal portfolio site: who I am, where I've worked, the projects I've built, and a way to get in touch. It's styled like a terminal session, with project cards, build logs, and an `ls -la` style project history.

Live at [www.travismbrown.com](https://www.travismbrown.com/).

## What's on it

- **Homepage** (`index.html`): about, experience (work plus clubs and teams), primary projects, a project history list, and a contact form.
- **Build logs**: a deeper page for each main project, with photos, specs, and notes from the build.
  - `fixed-wing-drone.html`: autonomous fixed-wing flight controller, with a board revision timeline, flight log, and todo list
  - `chip8-handheld.html`, `weather-buddy.html`, `minimap.html`
- **Octo demo** (`octo-menu-viewer.html`): my Chip-8 menu ROM running in the browser.

The red, yellow, and green dots on the terminal windows are clickable: red shakes the window, yellow spins the photo, and green opens the photo full-screen.

## How it's built

- Plain HTML and CSS, plus one small vanilla JavaScript file (`window-controls.js`) for the window dots. No framework and no build step.
- Hosted on GitHub Pages with a custom domain (`CNAME`).
- `assets/TB_Resume.pdf` is updated automatically by a GitHub Action in my resume repo whenever the resume changes.
- The contact form posts to [Web3Forms](https://web3forms.com/), which redirects to `thanks.html`.

## Author

Built by Travis Brown. I started this as my first website and my first time writing HTML and CSS, and have since reworked and extended it with help from Claude Code.
