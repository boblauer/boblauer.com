import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <body className='p-4 m-4 w-full flex flex-col items-center'>
        <section className='max-w-2xl w-full'>
          <header>
            <a href='/'>
              <img src='/bob.jpg' className='float-right inline rounded-full h-8 w-8' />
            </a>
          </header>
          <section className='pt-28'>
            <Main />
          </section>
        </section>
        <NextScript />
      </body>
    </Html>
  );
}
