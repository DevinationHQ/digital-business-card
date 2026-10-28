# Generate and add your hero video

A short video can show the person behind the Digital Business Card at work. Keep a still image as the fallback and keep the clip short enough for a mobile page.

## 1. Make a good reference image

Use a photo or image you have permission to use. Show one person, a clear face and a believable work setting. Keep the face and main action near the centre with room around them: the card crops the video to fit different screens.

For the supplied fictional characters, start with `assets/photos/theo-work.webp` or `assets/photos/mira-work.webp`. These are deliberately composed as opening frames. Full-resolution references are also in the separate video-generation handoff.

## 2. Generate in Gemini

Open Gemini's video-creation option, attach the matching reference image and paste the appropriate prompt from [VIDEO-PROMPTS.md](VIDEO-PROMPTS.md). Choose portrait 9:16 and request a single roughly 8-second shot where those options are available. Model, plan, region and output controls can vary; use the controls actually offered in your account.

A useful prompt specifies: the exact person; one small work action; one slow camera movement; realistic lighting; a continuous shot; stable objects and anatomy; a quiet start/end; and no added dialogue, captions or soundtrack. The card plays videos muted. More complex movement often needs extra attempts; a prompt cannot guarantee identity, hands or loop continuity.

Official guidance, checked 28 October 2026:

- https://support.google.com/gemini/answer/16126339
- https://deepmind.google/models/veo/prompt-guide/

## 3. Check the result before using it

Look at the face throughout the shot, fingers, tools, pottery/model geometry, clothing, unwanted text and abrupt camera motion. Watch it repeat a few times. Ask for a smaller action or simpler camera move if objects change shape. Avoid representing synthetic footage as documentary evidence of a real job or client.

Download the generated file rather than recording its playback. Keep any provider-required labels/watermarks. For a real person, only use their likeness with their permission. Generation costs or limits belong to the provider/account; the template itself does not generate videos or need an API key.

## 4. Add the file to your copy

In your GitHub repository, open `assets/video`, choose **Add file → Upload files**, select your MP4 (for example `my-hero.mp4`), then **Commit changes** to `main`. Upload a fallback image the same way inside `assets/photos`, for example `my-poster.jpg`. Wait for the next successful Actions deployment. Keep each browser-uploaded file below 25 MB; a small delivery copy loads faster.

Open **Make yours on your own published website**, then:

1. Set **Portrait file path** to `assets/photos/my-poster.jpg`.
2. Set **Hero video file path** to `assets/video/my-hero.mp4`.
3. Choose **Video playback**: muted automatic play or visitor-initiated playback.
4. Preview, export JSON, and replace the full contents of `data/card.json` in your repository. Commit to `main`, wait for a successful deployment, then refresh your main website.

The path fields do not upload files. If you preview from Devination’s demo instead of your own copy, it cannot see media uploaded only to your repository.

You can instead edit JSON directly:

```json
{
  "photo": "assets/photos/my-poster.jpg",
  "video": "assets/video/my-hero.mp4",
  "videoAutoplay": true
}
```

Add these fields to your existing complete profile; the snippet is not a complete card file. Use paths without a leading slash so GitHub project paths work.

## 5. Test on a phone

The included fictional clips are H.264 MP4, portrait 720×1280 and about 10 seconds each. For your own clip, H.264 MP4 is a practical starting point. Aim for a small delivery file—roughly 1–3 MB if quality allows—rather than shipping a huge master. Keep the original export separately if you compress a copy.

Confirm playback, crop and loading time on a real phone. There is always a pause/play control. A visitor's reduced-motion preference prevents autoplay, and blocked/failed autoplay falls back to the still image. Video pauses when it leaves the viewport or the page is hidden. Actual browser autoplay support can differ.

## Current example status

- Founder showcase: approved real-person name/image/video with demonstration contact details.
- Alex Rowan: optional neutral fictional starter, initials only.
- Theo: fictional designer, corrected studio reference and generated hero video included.
- Mira: fictional ceramic designer, generated work video included.

The only real personal likeness is the explicitly approved founder showcase; replace it in a personal copy. See [ASSETS.md](../ASSETS.md).
