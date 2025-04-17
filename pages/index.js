import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Start with loading animation
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);

      // Show buttons after animation completes with minimal delay
      setTimeout(() => {
        setShowButtons(true);
      }, 300); // Reduced from 1000ms to 300ms to minimize lag
    }, 3000); // 3 seconds for loading animation

    return () => clearTimeout(animationTimer);
  }, []);

  const handleContinue = () => {
    router.push("/login");
  };

  return (
    <div>
      <Head>
        <title>SwipeMate - Find Your Dream Property</title>
        <meta
          name="description"
          content="Find your perfect home with SwipeMate - the easiest way to discover properties"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="loading-container">
          <div className="color-blocks">
            <div
              className={`block red ${
                animationComplete ? "animation-paused fade-out" : ""
              }`}
            ></div>
            <div
              className={`block orange ${
                animationComplete ? "animation-paused fade-out" : ""
              }`}
            ></div>
            <div
              className={`block yellow ${
                animationComplete ? "animation-paused fade-out" : ""
              }`}
            ></div>
          </div>
          <div className="logo-container">
            <h1 className="logo-text">
              <span className="swipe">Swipe</span>
              <span className="mate">Mate</span>
            </h1>
            <p className="tagline">Find Your Perfect Home with a Swipe</p>

            {showButtons && (
              <div className="loading-buttons">
                <button
                  className="loading-btn-primary"
                  onClick={handleContinue}
                >
                  Find Your Dream Home
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
