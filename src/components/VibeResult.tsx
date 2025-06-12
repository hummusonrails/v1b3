import { VibeAnalyzerResult } from "./VibeAnalyzer";
import { sdk } from "@farcaster/frame-sdk";

export const VibeResult: React.FC<{ result: VibeAnalyzerResult }> = ({ result }) => {
  const { vibe } = result;
  const composeCast = () => {
  sdk.actions.composeCast({
    text: `My Arbitrum VibeTrack today 🎵: ${vibe.tag} -> ${vibe.songTitle}\n${vibe.youtubeUrl}`,
  });
};

  return (
    <div className="mt-6 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-[#232946]/80 to-[#181c34]/90 border border-[#5e60ce]/30 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-[#43e6fc] mb-2">Your Arbitrum vibe is: <span className="text-[#5e60ce]">{vibe.tag}</span></h2>
      <a
        href={vibe.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center mt-4 mb-2 px-6 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#43e6fc] to-[#5e60ce] text-white shadow hover:scale-105 transition-all duration-150"
      >
        🎵 Theme song: {vibe.songTitle}
      </a>
      <p className="italic text-[#a0aec0] mb-4 mt-1">{vibe.description}</p>
      <button
        onClick={composeCast}
        className="mt-2 px-5 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-[#5e60ce] to-[#43e6fc] text-white shadow-lg hover:scale-105 transition-all duration-150"
      >
        Cast to Farcaster
      </button>
      <a
        href="https://farcaster.xyz/?launchFrameUrl=https%3A%2F%2Fv1b3dis.onrender.com%2F"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block px-5 py-3 rounded-xl font-bold text-base border border-[#43e6fc] text-[#43e6fc] bg-transparent hover:bg-[#43e6fc]/10 transition-all duration-150"
      >
        🔗 Find your wallet vibe
      </a>
    </div>
  );
};
