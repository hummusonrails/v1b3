// Mapping of wallet activity to vibe and theme song
// Each mapping includes: tag, songTitle, youtubeUrl, description, and a function to match

export type Vibe = {
  tag: string;
  songTitle: string;
  youtubeUrl: string;
  description: string;
  matcher: (data: WalletData) => boolean;
};

export type WalletData = {
  ethBalance: bigint;
  arbBalance: bigint;
  txCount: number;
  nftCount: number;
};


const ETH_WHALE = 10_000000000000000000n; // 10 ETH
const ARB_WHALE = 100_000000000000000000000n; // 100,000 ARB
const LOW_ETH = 10000000000000000n; // 0.01 ETH
const NFT_COLLECTOR = 10;
const L2_POWER_USER_TX = 100;

export const vibeMap: Vibe[] = [
  {
    tag: "Whale Wallet",
    songTitle: "Money Longer - Lil Uzi Vert",
    youtubeUrl: "https://www.youtube.com/watch?v=Eic4B2wZ9s0",
    description: "Big balances, big vibes.",
    matcher: ({ ethBalance, arbBalance }) => (typeof ethBalance === 'bigint' && ethBalance >= ETH_WHALE) || (typeof arbBalance === 'bigint' && arbBalance >= ARB_WHALE),
  },
  {
    tag: "NFT Collector",
    songTitle: "NFT - Oliver Tree",
    youtubeUrl: "https://www.youtube.com/watch?v=YxWlaYCA8MU",
    description: "You love your digital art.",
    matcher: ({ nftCount }) => typeof nftCount === 'number' && nftCount >= NFT_COLLECTOR,
  },
  {
    tag: "L2 Power User",
    songTitle: "Stronger - Daft Punk",
    youtubeUrl: "https://www.youtube.com/watch?v=gAjR4_CbPpQ",
    description: "You live on Arbitrum.",
    matcher: ({ txCount }) => typeof txCount === 'number' && txCount >= L2_POWER_USER_TX,
  },
  {
    tag: "L2 Tourist",
    songTitle: "Holiday - Madonna",
    youtubeUrl: "https://www.youtube.com/watch?v=GuJQSAiODqI",
    description: "Just visiting, but welcome!",
    matcher: ({ txCount }) => typeof txCount === 'number' && txCount > 0 && txCount < L2_POWER_USER_TX,
  },
  {
    tag: "First Time Arbitrum User",
    songTitle: "New Rules - Dua Lipa",
    youtubeUrl: "https://www.youtube.com/watch?v=k2qgadSvNyU",
    description: "Welcome to L2!",
    matcher: ({ txCount, ethBalance, arbBalance }) => txCount === 0 && ((typeof ethBalance === 'bigint' && ethBalance > 0n) || (typeof arbBalance === 'bigint' && arbBalance > 0n)),
  },
  {
    tag: "Low Gas Wallet",
    songTitle: "Cheap Thrills - Sia",
    youtubeUrl: "https://www.youtube.com/watch?v=nYh-n7EOtMA",
    description: "Frugal and proud.",
    matcher: ({ ethBalance }) => typeof ethBalance === 'bigint' && ethBalance > 0n && ethBalance < LOW_ETH,
  },
  {
    tag: "Aspiring Degen",
    songTitle: "Started From The Bottom - Drake",
    youtubeUrl: "https://www.youtube.com/watch?v=RubBzkZzpUA",
    description: "No funds, but big dreams!",
    matcher: ({ ethBalance, arbBalance, txCount, nftCount }) => ethBalance === 0n && arbBalance === 0n && txCount === 0 && nftCount === 0,
  },
  {
    tag: "Regular Viber",
    songTitle: "Feel Good Inc. - Gorillaz",
    youtubeUrl: "https://www.youtube.com/watch?v=HyHNuVaZJ-k",
    description: "A bit of everything!",
    matcher: () => true, // fallback
  },
];
