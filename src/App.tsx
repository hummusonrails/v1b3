import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return localStorage.getItem("vibetrack_onboarded") !== "true";
  });

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("vibetrack_onboarded", "true");
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c34] via-[#232946] to-[#2b2d42] flex flex-col items-center justify-center px-4 py-8">
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#232946] border border-[#5e60ce]/40 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center animate-fade-in">
            <h2 className="text-2xl font-bold text-[#43e6fc] mb-2">Welcome to VibeTrack!</h2>
            <ul className="text-left text-[#c9c9e3] mb-4 text-base list-decimal list-inside">
              <li>Connect your wallet</li>
              <li>Analyze your Arbitrum vibe</li>
              <li>Share your theme song to Farcaster</li>
            </ul>
            <button onClick={handleDismiss} className="mt-2 px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-[#5e60ce] to-[#43e6fc] text-white shadow-lg hover:scale-105 transition-all duration-150">Let’s go!</button>
          </div>
        </div>
      )}
      <div className="w-full max-w-xl bg-[#232946]/80 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5e60ce] via-[#7f5af0] to-[#43e6fc] drop-shadow-md">VibeTrack</h1>
          <p className="mt-2 text-lg text-[#c9c9e3] font-medium">Analyze your Arbitrum wallet's onchain vibe and get your theme song.<br/>Share it to Farcaster and spread the vibes!</p>
        </div>
        <ConnectMenu />
      </div>
      <footer className="mt-10 text-[#a0aec0] text-lg text-center opacity-90 flex items-center justify-center gap-3">
  <span className="text-base sm:text-lg font-semibold">Powered by</span>
  <a href="https://arbitrum.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
    <img src="/arbitrum-logo.png" alt="Arbitrum Logo" className="h-10 w-10 ml-2 inline-block align-middle" style={{ display: 'inline', verticalAlign: 'middle' }} />
  </a>
</footer>
    </div>
  );
}

import { VibeAnalyzer, VibeAnalyzerResult } from "./components/VibeAnalyzer";
import { VibeResult } from "./components/VibeResult";

// Make sure you have WagmiConfig set up at the root of your app with at least one connector (e.g., MetaMaskConnector)
function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors, error, status } = useConnect();
  const [result, setResult] = useState<VibeAnalyzerResult | null>(null);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-4 w-full">
        <button
          type="button"
          disabled={status === 'pending' || !connectors.length}
          onClick={() => connect({ connector: connectors[0] })}
          className="px-6 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-[#5e60ce] to-[#43e6fc] text-white shadow-lg hover:scale-105 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'pending' ? 'Connecting...' : 'Connect'}
        </button>
        {error && <div className="text-red-400 font-semibold text-sm mt-2">{error.message}</div>}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="mb-2">
        <span className="inline-block bg-[#5e60ce]/20 border border-[#5e60ce]/40 text-[#5e60ce] font-mono px-4 py-2 rounded-xl text-xs tracking-tight">{address}</span>
      </div>
      <div className="w-full">
        {!result && <VibeAnalyzer onResult={setResult} />}
        {result && <VibeResult result={result} />}
      </div>
    </div>
  );
}


// SignButton removed in favor of VibeAnalyzer + VibeResult flow

export default App;
