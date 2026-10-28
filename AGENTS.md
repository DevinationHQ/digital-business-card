# Digital Business Card template — agent setup notes

Work within this repository. Read README.md, docs/SETUP.md, docs/AI-SETUP.md, docs/VIDEO-GUIDE.md, LICENSE, ASSETS.md and THIRD_PARTY_NOTICES.md before customising. Preserve existing work and repository history.

- The personal/default profile is data/card.json. Supplied demos remain under data/examples. Change the default, not a different example by accident.
- Put permitted photos in assets/photos and videos in assets/video. Use exact case-sensitive relative paths without a leading slash. A field containing a path does not upload media.
- Keep media originals untouched; create delivery copies when needed. Preserve required provider marks and a photo fallback. Do not generate paid media or send a likeness to a provider without user authorisation for that use.
- No passwords, API keys, tokens, private account IDs or contact databases belong in source or public media. Use only details intended for publication.
- Keep text/URL validation, local QR generation, muted playback, pause/play and reduced-motion handling. No analytics or visitor-contact collection is included.
- npm test checks behaviour and demo fixtures; npm run build prepares dist. npm run dev serves the HTTP preview. No npm install is required for this template.
- Do not publish because a preview works. Publish only when requested, to the user-specified owner/repository. Verify the real deployment URL and preserve its project subpath for sharing/QR. Never force-push or overwrite an unrelated project.
- Template code is MIT; retain its notices and third-party notices. Identity media and generated examples have separate terms in ASSETS.md. Do not imply endorsement or assume the real showcase identity is yours to reuse.
- A personal copy may remove the example navigation and optional Devination resource/community block. Keep the repository usable without membership.
- Hand off what changed, the actual checks/results and any phone-only verification still needed. Never call a test, capture, deployment or result completed if it was not observed.
