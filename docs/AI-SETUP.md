# Set up your Digital Business Card with an AI agent

For the simplest start, [watch the28.5-second guide and copy the repository link plus setup prompt](https://devination.net/guides/digital-business-card-ai-setup). Your agent needs internet, terminal and project-file access. Review its local preview before publishing.

You can ask an AI coding agent to customise this template for you. It needs access to your copy of the files to edit them. A chat-only assistant can prepare the JSON and instructions, but cannot update your computer or GitHub unless it has the necessary tools and permissions.

## Change more than your details

The browser editor is a convenient starting point. Your own source files are fully customisable: an AI coding agent with access to the project can edit its words, colours, typography, layout, media, sections, links, interactions and features. Describe the result you want in normal language; you do not need to know the filename. The agent can inspect and change the relevant HTML, CSS, JavaScript and JSON.

Try one change at a time, review the local result, then refine it:

```text
Make it warm and editorial. Put my projects before the contact buttons.
```

```text
Use fresh green, lead with my video and add a booking link to [MY BOOKING URL].
```

```text
Remove the video, add a services section with [MY SERVICES], and make contacting me the priority.
```

```text
Make the name larger, reduce the spacing, and show me the result at phone width.
```

Add this instruction to a larger redesign:

```text
You may edit any source file needed for this change, including index.html,
card.css, themes.css, card.mjs, lib.mjs and data/card.json. Build on my
existing project. Preserve my public details, working contact download,
share/QR, validation, accessibility, media controls and licence notices.
Update the build file if you add new assets or styles. Check the actual
browser result at phone and desktop widths, run relevant tests and build,
and explain what changed. Keep the result local for review.
```

Some new features depend on external services, accounts or hosting. Your agent should explain what needs connecting; a conversational request alone does not connect those services. A chat-only assistant without file tools can provide code and instructions, while an agent in your project can apply them.

## 1. Give the agent your own copy

Create a repository with **Use this template**, then open that repository or its downloaded folder in your agent’s workspace. Tell it which folder to use. If you already have a copy, use that copy rather than starting over. Do not give the agent passwords, tokens or private contact lists.

Start with public details, a portrait and an optional short video you have permission to publish. A paid AI or video account is not required by this template; your chosen agent/provider may have its own plan and usage costs.

## 2. Copy the setup prompt

Replace the square-bracket fields, remove details you do not want published, then paste this into your agent. File paths are examples: give it your actual media files.

```text
Help me customise my copy of the Devination Digital Business Card template.

Work only in this project: [MY PROJECT FOLDER OR REPOSITORY].
Read AGENTS.md, README.md, docs/SETUP.md, docs/VIDEO-GUIDE.md,
LICENSE, ASSETS.md and THIRD_PARTY_NOTICES.md first. Inspect the
existing files and preserve work already there.

Use these details, all intended for public display:
Name: [NAME]
Role: [ROLE]
Short introduction: [BIO]
Location: [OPTIONAL PUBLIC LOCATION]
Theme: [cobalt, ivory or forest]
Email: [PUBLIC EMAIL OR LEAVE EMPTY]
Call number: [PUBLIC NUMBER OR LEAVE EMPTY]
Message number/channel: [PUBLIC NUMBER + SMS/WHATSAPP OR LEAVE EMPTY]
Project links: [TITLES, SHORT DESCRIPTIONS AND FULL URLS]
Portrait: [FILE I HAVE PROVIDED, OR INITIALS ONLY]
Video: [FILE I HAVE PROVIDED, OR NONE]

Update data/card.json with my details. Build on this template. If I ask for
a new layout, design or feature, edit the relevant source files too. Copy permitted media into assets/photos and assets/video,
use exact relative paths without a leading slash, and keep a fallback
image for video. Do not invent my details, testimonials or projects.

Set example=false for my personal card. Keep video muted with pause/play
and reduced-motion support. Remove optional demo navigation and the
Devination community promotion block from my personal site if I do not
want them; do not change licence/dependency notices. Keep example assets
until you have checked whether anything still uses them.

Run npm test and npm run build, then open a local HTTP preview with
npm run dev. Check my profile, media, links, contact download and QR URL.
Explain any checks you cannot perform. A local QR is not ready to print.

Prepare the finished files for review. Do not publish or make a new
public repository until I explicitly request that step. Ask only for
missing details that prevent the work, and give me a concise result.
```

The repository tests check the supplied example profiles. Keep synthetic examples intact and edit your personal profile in data/card.json. The example-contact test accepts a real customised default profile; only the supplied example files must retain demo contacts.

## 3. Optional: add or improve your media

```text
In this Digital Business Card project, use the photo/video files I have
provided. Inspect their format, dimensions and size. Keep my originals
unchanged. Prepare small delivery copies if useful, preserving required
provider marks. Put the photo under assets/photos and the video under
assets/video. Update data/card.json to match the exact filenames.
Use the photo as the fallback. Verify portrait crop, muted playback,
pause/play and reduced-motion behaviour in the real local preview.

If I have not supplied a video, leave it empty and give me a tailored
image-to-video prompt based on my permitted photo and actual work.
Do not buy/generate media, clone a voice or upload my likeness to another
service without my explicit instruction for that service and use.
```

For generation, use this starting brief in the provider you choose:

```text
Use my attached permitted reference image as the identity reference.
Create one hyperrealistic portrait 9:16 shot of [PERSON] doing
[ONE SMALL BELIEVABLE ACTION] in [ACTUAL OR CLEARLY ILLUSTRATIVE WORKSPACE].
Keep the face, clothing and objects consistent. Use [LIGHTING] and one
slow [CAMERA MOVE]. Keep the face and action central for a mobile crop.
About 8 seconds if supported. No added captions, dialogue or soundtrack.
Preserve required provider labels. Do not depict invented client work
as a real completed project.
```

Model/account controls and generation charges vary. See the video guide for worked Theo/Mira prompts and checks for hands, faces, objects and looping.

## 4. When ready, ask the agent to publish

Review the preview first. Then replace the fields in this separate prompt. Public means the repository and uploaded media can be read by anyone.

```text
I have reviewed my Digital Business Card and want to publish this exact
project to my GitHub account/organisation: [OWNER].
Repository name: [REPOSITORY]. Visibility: public.
Use my existing authenticated GitHub connection; do not ask me to paste
a password or token. Confirm the signed-in account and intended owner.
If the repository already exists, inspect it and preserve its history
and other files. Do not overwrite an unrelated project or force-push.

Publish the reviewed files to this repository, enable GitHub Pages using
the included GitHub Actions workflow, and wait for the actual result.
If account policy blocks Pages, report the real error and suggest a
suitable static host. Do not create a paid service or domain purchase.

Check the deployed page, image/video paths, contact routes and share/QR
address including the repository subpath. Leave publicUrl blank to use
the actual page, or set it to the verified published address. Do not
call localhost a live deployment. Give me the repository and website
links, the deployment result and any checks still requiring my phone.
```

For a commercial site that primarily facilitates sales/transactions or commercial SaaS, use a suitable host rather than GitHub Pages. The kit can build to dist for another static host. Check GitHub’s Pages policy for your use case.

## 5. If something is not working

```text
Diagnose this problem in my existing Digital Business Card copy:
[WHAT I EXPECTED, WHAT HAPPENED, AND ANY ERROR MESSAGE].
Inspect the current files and actual browser result. Trace the smallest
cause, preserve my details and media, and make a focused fix. Check exact
filename case, relative asset paths, data/card.json validity, deployment
status and the main URL without an example query where relevant.
Do not replace the whole project or disable validation to hide an error.
Run the relevant checks and show the actual fixed result, with any limits.
```

## One editable card. Yours to keep.

You receive editable source under the included MIT code licence. Keep your own copy and change it over time; Devination membership is optional. Keep the copyright/licence and dependency notices. Hosting, domain names and chosen AI/video services have their own availability and terms. The founder likeness and example media have separate permissions in ASSETS.md; use your own permitted identity media for your personal card.
