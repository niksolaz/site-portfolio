import type { Metadata } from "next";
import Head from 'next/head';
import './globals.css'

export const metadata: Metadata = {
  title: "Nicola Solazzo",
  description: "FULLSTACK DEVELOPER"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string}/>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
      </Head>
      <body>{children}</body>
    </html>
  );
}
