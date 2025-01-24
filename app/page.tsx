"use client";
import Image from "next/image";
import { FaHeadphones } from "react-icons/fa";
import Footer from "./components/layout/Footer";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-5">
          <Image
            src="/logo.png"
            width={500}
            height={500}
            alt="Logo"
            className="hidden md:block"
            priority
          />

          <div className="flex max-w-md flex-col items-center gap-5 text-center text-white">
            <FaHeadphones size={30} />
            <h1 className="text-2xl font-bold">
              Stream your favorite music on{" "}
              <span className="block text-primary">Himig Play.</span>
            </h1>

            <p className="text-sm">
              Himig Play is a personalized music streaming app powered by{" "}
              <span className="text-primary">Spotify API</span>, offering a
              seamless experience to discover, play, and enjoy your favorite
              tunes
            </p>
            <button
              onClick={() => signIn()}
              className="btn btn-ghost inline-flex items-center gap-2 rounded-md border-2 border-gray-700 p-2"
            >
              <Image
                src="/spotify-icon.svg"
                width={20}
                height={20}
                alt="Spotify Logo"
              />
              Login with Spotify.
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
