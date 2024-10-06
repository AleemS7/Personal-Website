import Head from 'next/head';
import PersonalWebsite from '../components/PersonalWebsite';

export default function Home() {
  return (
    <>
      <Head>
        <title>Aleem Shaik - Personal Website</title>
        <meta name="description" content="Software engineer portfolio" />
      </Head>
      <PersonalWebsite />
    </>
  );
}
