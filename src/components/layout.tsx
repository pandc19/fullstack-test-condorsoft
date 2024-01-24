import Head from "next/head";

import { Header } from "./header/Header";

import background from "../assets/wallpaperflare_1.png";
import { Providers } from "~/store/Providers";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Condorsoft</title>
                <meta name="description" content="Condorsoft technical test" />
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <main className="bg-cover" style={{ backgroundImage: `url(${background.src})` }}>
                <Header />
                <div className="flex min-h-screen flex-col items-center justify-center">
                    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                        <Providers >
                            {children}

                        </Providers>
                    </div>

                </div>
            </main>
        </>
    );
}