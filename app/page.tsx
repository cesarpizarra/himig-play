import Image from "next/image";
import { FaHeadphones } from "react-icons/fa";
import Footer from "./components/Footer";
import Link from "next/link";
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
          />

          <div className="flex max-w-md flex-col items-center gap-5 text-center text-white">
            <FaHeadphones size={30} />
            <h1 className="text-2xl font-bold">
              Millions of songs free on{" "}
              <span className="block text-primary">Himig Play.</span>
            </h1>

            <p className="text-sm">
              Himig Play is a personalized music streaming app powered by
              Spotify API, offering a seamless experience to discover, play, and
              enjoy your favorite tunes
            </p>
            <Link
              href="/himig/home"
              className="inline-flex items-center gap-2 rounded-md border-2 border-gray-700 p-2"
            >
              <Image
                src="/google-icon.svg"
                width={20}
                height={20}
                alt="Google Logo"
              />
              Continue with Google
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
