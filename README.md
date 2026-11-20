# Techplement

A responsive e-learning website built with plain HTML, CSS, and JavaScript. No build step or package installation is required.

## Pages

- `index.html` — home, learning categories, searchable course catalog, about, and contact form
- `web-dev.html`, `data-science.html`, `ai-ml.html`, `uiux.html`, `cyber-security.html`, `cloud-computing.html` — searchable topic catalogs
- `signup.html` and `login.html` — account creation and sign-in demo
- `profile.html` — learner profile and enrolled courses

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. For example:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Push the contents of this folder to the repository's default branch.
2. In GitHub, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select the default branch and the repository root (`/`), then save.
4. Wait for the Pages deployment and open the URL GitHub provides.

All site links and bundled assets use relative paths, so the site works from a GitHub Pages project subpath as well as a custom domain.

## Demo account behavior

Account creation, sign-in, and course enrollments are browser-only demonstrations using `localStorage`; they are not connected to a server and do not sync across browsers or devices. Passwords are hashed in the browser, but this is not a substitute for server-side authentication. Do not use real or reused passwords. The contact form is also a front-end demonstration and needs an email service or backend to deliver messages.

## Credits

Created by Saurabh Patill.
