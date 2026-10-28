# Devination Digital Business Card Kit

A digital business card you can make your own: three themes, an approved name/media showcase and fictional example profiles, a browser editor, contact downloads and QR sharing. Static files, your hosting, no runtime package installation.

**[View the live examples](https://devinationhq.github.io/digital-business-card/) · [Use this template](https://github.com/DevinationHQ/digital-business-card/generate) · [Easy setup guide](https://devinationhq.github.io/digital-business-card/guide.html)**

## Try it locally

You need Node.js 20 or later. Open a terminal in this folder:

```sh
npm run dev
```

Open the printed address (normally http://127.0.0.1:4173/). Choose **Make yours**, edit a profile and download `card.json`. Replace `data/card.json` in your copy. Do not open `index.html` directly as a file: the browser must load JSON through the local server.

No `npm install` is required. Port busy? Use `npm run dev -- --port 4174`.

## The examples

| Profile | Theme | Feel |
| --- | --- | --- |
| Approved showcase | Forest | Owner-approved display name, image and video; demonstration contacts. |
| Theo Mercer | Cobalt | Creative developer, sharp shapes, electric blue and warm accents. |
| Mira Vale | Ivory | Ceramic designer, warm paper colours and softer forms. |

The first profile includes only the owner-approved display name, image and video. Its email, phone, messaging and project links are demonstration data. Theo and Mira are fictional generated examples. No real phone numbers, email addresses, address, collected contacts, credentials or private account data are included. The neutral starter remains available in the editor.

## Beginner setup

Follow the [browser setup guide](https://devinationhq.github.io/digital-business-card/guide.html) or [SETUP.md](docs/SETUP.md). Both explain how to add your own images and videos.

You can do the whole setup in your browser:

1. Choose **Use this template → Create a new repository** and create your public copy.
2. In **Settings → Pages**, choose **GitHub Actions**. Run **Publish card to GitHub Pages** from Actions and wait for success.
3. Upload your photo to `assets/photos/` and optional MP4 to `assets/video/` using **Add file → Upload files**, then commit.
4. Open your own published website, choose **Make yours**, enter your details and the uploaded file paths, preview, then download `card.json`.
5. Replace the full contents of your repository's `data/card.json` with that downloaded text and commit. Wait for deployment, check your phone, then download your QR.

**Typing an image/video path does not upload the file.** The [step-by-step setup guide](docs/SETUP.md) explains every upload, edit and publish step. The [video guide](docs/VIDEO-GUIDE.md) includes generation prompts and implementation instructions. No installation is needed for the browser route.

## What you can customise

- Profile, project links, theme, portrait paths and introduction: **Make yours**, or `data/card.json`.
- Colours, typography, shape and layout: `card.css` and `themes.css`.
- Public words and structure: `index.html`, `make.html`, `guide.html` and the two matching `.mjs` scripts.
- Hero video: add an MP4/WebM and set its path. Choose muted automatic playback or visitor-initiated playback. Reduced motion prevents autoplay; pause/play and an image fallback are included. See video-guide.html and docs/VIDEO-GUIDE.md.
- For a personal card, remove the example navigation from `index.html` if you do not want to offer the demo profiles to visitors. Attribution in the visible interface is optional; retain the MIT copyright/licence notices in source copies.

The browser editor changes a local draft. **It does not update a hosted website**, and is not a private admin panel. Export JSON and commit it to publish. Drafts use this tab's session storage; download before closing the tab. A public `make.html` does not grant anyone write access to the repository.

## Sharing and privacy

QR codes are generated locally with the bundled encoder; no external QR service, analytics or visitor contact-storage endpoint is included. The host can log visits. Any external portrait URL or project link is a separate request to its operator. For the simplest privacy model, keep portrait files in this repository.

The kit does not install an app or create a Wallet pass. Your phone browser may offer an Add to Home Screen shortcut. NFC tags can hold the URL; no direct phone-to-phone NFC sharing is promised.

## Checks and build

```sh
npm test
npm run build
```

The build validates the supplied profiles and copies public files to `dist/`. It does not publish. The GitHub workflow uploads `dist/`, not the source repository or internal review evidence.

The QR runtime is bundled and its editable upstream source is included under `vendor-src/`. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for provenance, licences and the optional rebuild command. It requires no API key.

## Scope and support

This portable edition contains an approved name/image/video showcase, two fictional examples and a neutral starter. Private account details, collected contacts, real contact data and original app credentials are excluded.

Devination leads learning and adaptable community resources. Circul8tion Systems handles separately scoped business implementations and support. No unlimited support, hosting service or commercial results are promised by downloading this kit.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Use synthetic details in examples and reports. See [SECURITY.md](SECURITY.md) for safe reporting. Questions and improvements: use [GitHub Issues](https://github.com/DevinationHQ/digital-business-card/issues). Explore [Devination](https://devination.net/) for more learning and builds.

## Licence

First-party code and documentation: [MIT](LICENSE), copyright 2026 Circul8tion Ltd. Bundled third-party code retains its notices. See [ASSETS.md](ASSETS.md) for fictional portrait provenance and brand boundaries. MIT permits commercial use, modification and redistribution; it does not require visible credit, membership or publication of your changes.

Devination — a Circul8tion Systems venture.

## Hero-video examples

Theo and Mira’s generated work videos are included. Read [the video guide](docs/VIDEO-GUIDE.md) and [prompts](docs/VIDEO-PROMPTS.md). Video generation is not performed by this kit. Call and Message fields are editable; Message can open SMS or WhatsApp. Empty contact fields hide their buttons.
