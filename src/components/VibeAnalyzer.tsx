import React, { useState } from "react";
import { vibeMap, WalletData, Vibe } from "../data/vibeMap";
import { useAccount } from "wagmi";

// Arbitrum One public RPC
const ARBITRUM_RPC = "https://arb1.arbitrum.io/rpc";

// ARB token address (mainnet)
const ARB_TOKEN = "0x912CE59144191C1204E64559FE8253a0e49E6548" as `0x${string}`; // satisfies viem address type

// Minimal ERC20 ABI
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// Minimal ERC721 ABI
const ERC721_ABI = [
  "function balanceOf(address owner) view returns (uint256)"
];

// For simplicity, NFT count = sum of balanceOf for a few popular collections
// TODO: Add real Arbitrum NFT collection addresses here for production
const NFT_COLLECTIONS: `0x${string}`[] = [
  "0x9126b817b6c7c1e7a7d5c6e4e7e6e7e6e7e6e7e6" // placeholder
];

export type VibeAnalyzerResult = {
  vibe: Vibe;
  data: WalletData;
};

export const VibeAnalyzer: React.FC<{ onResult: (result: VibeAnalyzerResult) => void }> = ({ onResult }) => {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      // Use viem for RPC calls
      const { createPublicClient, http, parseAbi } = await import("viem");
      const client = createPublicClient({ chain: { id: 42161, name: "arbitrum", network: "arbitrum", nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: [ARBITRUM_RPC] } }, blockExplorers: { default: { name: "Arbiscan", url: "https://arbiscan.io" } }, contracts: {} }, transport: http() });

      // ETH balance
      const ethBalance = await client.getBalance({ address });
      // ARB balance
      const arbBalance = await client.readContract({
        address: ARB_TOKEN,
        abi: parseAbi(ERC20_ABI),
        functionName: "balanceOf",
        args: [address],
      });
      // Transaction count
      const txCount = await client.getTransactionCount({ address });
      // NFT count (sum of balanceOf for a few collections)
      let nftCount = 0;
      for (const nftAddr of NFT_COLLECTIONS) {
        try {
          const count = await client.readContract({
            address: nftAddr,
            abi: parseAbi(ERC721_ABI),
            functionName: "balanceOf",
            args: [address],
          });
          nftCount += Number(count);
        } catch (e) {
          // Ignore errors
        }
      }
      const data: WalletData = {
        ethBalance,
        arbBalance: BigInt(arbBalance as string),
        txCount,
        nftCount,
      };
      const vibe = vibeMap.find((v) => v.matcher(data)) || vibeMap[vibeMap.length - 1];
      onResult({ vibe, data });
    } catch (e: any) {
      setError(e.message || "Failed to analyze wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button
        disabled={!isConnected || loading}
        onClick={analyze}
        className="w-full px-6 py-4 mt-2 rounded-xl font-bold text-lg bg-gradient-to-r from-[#43e6fc] to-[#5e60ce] text-white shadow-lg hover:scale-105 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze my Arbitrum Vibe"}
      </button>
      {error && <div className="text-red-400 font-semibold text-sm mt-2">{error}</div>}
    </div>
  );
};
