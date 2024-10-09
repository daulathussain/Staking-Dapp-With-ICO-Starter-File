import "../styles/globals.css";
// external libs
import toast, { Toaster } from "react-hot-toast";
import merge from "lodash/merge";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// network setup
const HOLESKY = process.env.NEXT_PUBLIC_HOLESKY_RPC_URL;
const EXPLORER = process.env.NEXT_PUBLIC_EXPLORER;
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;
const DECIMALS = process.env.NEXT_PUBLIC_NETWORK_DECIMALS;
const NAME = process.env.NEXT_PUBLIC_NETWORK_NAME;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;

export default function App({ Component, pageProps }) {
  // network
  const { chains, provider } = configureChains(
    [
      {
        id: Number(CHAIN_ID),
        name: NAME,
        network: NETWORK,
        nativeCurrency: {
          name: "Ether",
          symbol: CURRENCY,
          decimals: Number(DECIMALS),
        },
        rpcUrls: {
          default: {
            http: [`${HOLESKY}`],
          },
          public: {
            http: [`${HOLESKY}`],
          },
        },
        blockExplorers: {
          default: {
            name: "Holescan",
            url: EXPLORER,
          },
        },
        testnet: true,
      },
    ],
    [
      jsonRpcProvider({
        rpc: (chain) => {
          if (chain.id === Number(CHAIN_ID)) {
            return { http: `${HOLESKY}` };
          }
          return null;
        },
        priority: 1,
      }),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "StakingDapp",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const myTheme = merge(midnightTheme(), {
    colors: {
      accentColor: "#562c7b",
      accentColorForeground: "#fff",
    },
  });

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={myTheme}>
          <Component {...pageProps} />
          <Toaster />
        </RainbowKitProvider>
      </WagmiConfig>

      <script src="js/bootstrap.bundle.min.js"></script>
      <script src="js/smooth-scrollbar.js"></script>
      <script src="js/splide.min.js"></script>
      <script src="js/three.min.js"></script>
      <script src="js/vanta.fog.min.js"></script>
      <script src="js/main.js"></script>
    </>
  );
}
