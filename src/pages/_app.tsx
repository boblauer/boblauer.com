import type { AppProps } from 'next/app';
import { Lato } from 'next/font/google';

import './globals.css';
import './github.css';

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={lato.className}>
      <Component {...pageProps} />
    </main>
  );
}
