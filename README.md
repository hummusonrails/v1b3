# VibeTrack – Arbitrum Wallet Vibes for Farcaster

VibeTrack is a Farcaster Mini App that lets you analyze your Arbitrum wallet's onchain vibe, get a theme song, and share your results to Farcaster.

Built with [Vite](https://vitejs.dev) and [`@farcaster/create-mini-app`](https://github.com/farcasterxyz/frames/tree/main/packages/create-mini-app).

## Farcaster Mini App Integration

### Manifest (`farcaster.json`)

The mini app manifest is served from `public/.well-known/farcaster.json` and includes fields for:
- `name`, `description`, `icon`, `appUrl`, `splashBackgroundImageUrl`, and `requiredCapabilities`.
- Update `appUrl` to your deployed app URL before launch.

You can also use the `public` directory to serve a static image for `splashBackgroundImageUrl` (e.g., `/splash.png`).

### Frame Embed (`fc:frame`)

The `<meta name="fc:frame">` tag in `index.html` makes your app sharable in Farcaster feeds:

```html
  <head>
    <!-- other tags -->
    <meta name="fc:frame" content='{"version":"next","imageUrl":"/splash.png","button":{"title":"Open","action":{"type":"launch_frame","name":"VibeTrack","url":"https://your-app-url.xyz"}}}' />
  </head>
```

Replace `https://your-app-url.xyz` with your production URL after deployment.

## Features
- Connect your wallet (Warpcast-native or browser wallets)
- Analyze your Arbitrum wallet's onchain vibe
- Get a theme song and fun description
- Share your results to Farcaster via ComposeCast
- Modern UI with Tailwind CSS and Arbitrum branding

## Development
- Clone the repo, install dependencies, and run locally with Vite.
- Update the manifest and frame meta tag before deploying.

