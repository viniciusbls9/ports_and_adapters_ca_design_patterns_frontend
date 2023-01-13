import type { AppProps } from "next/app";
import { HttpClientProvider } from "src/context/HttpClientContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HttpClientProvider>
      <Component {...pageProps} />
    </HttpClientProvider>
  );
}
