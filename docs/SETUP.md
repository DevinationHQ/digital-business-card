# Make and publish your Digital Business Card

You need a free GitHub account and a web browser. You do not need to install anything for this route. A repository is simply your own copy of the website files.

## 1. Copy the template

Open the [Devination template repository](https://github.com/DevinationHQ/digital-business-card). Choose **Use this template → Create a new repository**. Choose your account as Owner, name the copy `my-digital-business-card`, choose **Public**, and create it. Public means anyone can read the files: include only details and media you want public.

## 2. Put your copy online

In your new repository, open **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**. Open **Actions → Publish card to GitHub Pages → Run workflow**, choose `main`, and run it. Wait for the green success tick. **Settings → Pages** shows your website address, usually `https://YOUR-ACCOUNT.github.io/my-digital-business-card/`.

## 3. Upload your image and video

In your repository's **Code** tab, open `assets`, then `photos`. Choose **Add file → Upload files**, drop in your portrait (for example `my-photo.jpg`), and choose **Commit changes** to `main`. For video, open `assets/video` and repeat with `my-hero.mp4`.

Use simple lowercase filenames without spaces. A portrait image and portrait 9:16 MP4 work well. Keep a fallback photo even if using video. A short H.264 MP4 around 1–3 MB is a practical starting point. Keep browser uploads below 25 MB per file; compress a delivery copy if necessary. Do not upload your huge original export.

Wait for the next green Actions run. Images/videos must be uploaded to your own copy: typing a file path in the editor does not upload a file. See [VIDEO-GUIDE.md](VIDEO-GUIDE.md) for generating a video and choosing a fallback image.

## 4. Add your details

Open your published website and select **Make yours**. Choose a starting profile and theme. Replace the name, introduction, email, phone, message number and project links. Leave unwanted contact fields empty.

Enter the exact paths to your uploaded files:

- **Portrait file path:** `assets/photos/my-photo.jpg`
- **Hero video file path:** `assets/video/my-hero.mp4`
- **Video playback:** choose automatic muted playback or visitor-initiated playback.

Leave either media field empty if you do not want it. Choose **Preview my card**, check the result, then use your browser's Back button to return. If custom media do not appear, check the filenames, upload location and deployment status.

## 5. Save and publish your changes

Choose **Download card JSON**. Open that downloaded `card.json` with a text editor and copy all its text. In GitHub, open `data/card.json`, choose the pencil, select all existing text and replace it with your downloaded text. Choose **Commit changes** to `main`.

Do not upload it beside the existing file or rename it `card (1).json`. The exact destination is `data/card.json`. Wait for the green Actions tick, then refresh your website. The editor creates a temporary draft; downloading JSON alone does not update the live card.

## 6. Test and share

Open the main website address without `?example=theo` or `?example=mira`. Check your photo/video, all links, Call and Message. Save the contact file on your phone. Use **Show QR → Download QR image** and scan it on a second device before printing.

The optional published-link setting should contain the actual website address, including the repository path. Leaving it blank shares the current page. Never print a QR created from a local preview.

Download JSON before closing the editor tab. Import it later to resume. For local editing instead, install Node.js 20+, run `npm run dev` in the extracted repository folder, and open the printed address. No `npm install` is needed.

## Common fixes

- **Loading/fetch error:** use `npm run dev` and open its HTTP address, not a `file://` URL.
- **Port 4173 is busy:** use `npm run dev -- --port 4174`.
- **Portrait missing:** check exact filename/case, upload location and path. GitHub is case-sensitive. The path should start `assets/`, with no leading slash, so project sites work.
- **Workflow missing:** ensure your copy includes `.github/workflows/pages.yml`, and Actions are enabled. ZIP uploads can hide dotfolders in your file browser; use GitHub's template feature when available.
- **Deployment denied:** check Pages source is GitHub Actions, repository policy permits Pages and the github-pages environment allows `main`. Consult GitHub's actual error; do not add personal access tokens to fix a Pages workflow.
- **Downloaded QR works on the laptop only:** you used a local preview link. Open the published site and generate a fresh QR.
- **An old address opens:** check `publicUrl`, clear it or replace it with the current hosted URL, commit, and regenerate your QR.
- **My card still shows the example:** make sure you replaced `data/card.json`, not a file beside it, and open the main URL without `?example=theo` or `?example=mira`.

For another static host, run `npm run build` and upload `dist/`. Do not upload credentials, private source notes or an existing app database. A custom domain is optional and configured with your hosting provider.

Official GitHub references (checked 28 October 2026):

- https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Hero video and contact actions

Read VIDEO-GUIDE.md for generating, inspecting and implementing a hero video. The first showcase’s name/image/video are included by permission; all other media are fictional. All contact data are demonstrations. Theo and Mira’s clips are included; replace them with your own permitted media when making a personal card. Call and Message buttons appear when their numbers are supplied. Message can open SMS or WhatsApp. Reserved example mobile numbers and example.com email actions are intercepted as demonstrations; enter your own public details to activate real contact routes. Ofcom source checked 28 October 2026: https://www.ofcom.org.uk/phones-and-broadband/phone-numbers/numbers-for-drama
