import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

export default function Document(props: DocumentProps) {
  const title = props.__NEXT_DATA__.props?.pageProps?.post?.title || 'My Blog';

  return (
    <Html lang='en'>
      <Head>
        <title>{title + ' | Bob Lauer'}</title>
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
