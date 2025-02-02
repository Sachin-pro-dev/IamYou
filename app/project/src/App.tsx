"use client";
import "./index.css";
import React, { useEffect, useRef } from "react";
import { Brain, Shield, Trophy, Rocket, Heart, Wallet2 } from "lucide-react";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
function GlowingCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group hover-lift card-glow">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative p-6 bg-pink rounded-lg border border-gray-800 hover:border-purple-500 transition-all duration-300">
        <Icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}

function App() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Spline 3D Background */}
      <div className="fixed inset-0 w-[100vw] h-full pointer-events-none z-0 flex items-center justify-center">
        <Spline
          scene="https://prod.spline.design/D7qfCeVcGvvrhS7b/scene.splinecode"
          className="w-full h-full "
        />
        <Spline
          scene="https://prod.spline.design/D7qfCeVcGvvrhS7b/scene.splinecode"
          className="w-full h-full "
        />
      </div>

      {/* Animated Background Overlay */}
      <div ref={parallaxRef} className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 "></div>
        <div className="absolute inset-0 animate-pulse-glow"></div>
        <div className="absolute inset-0 "></div>
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-9xl md:text-9xl font-bold mb-6 gradient-text animate-float">
              IamYou – Your AI Twin on the Blockchain
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300">
              A personal AI that learns from you, thinks like you, and helps you
              level up in life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/connect">
                <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all duration-300 transform hover:scale-105">
                  Launch Your AI
                </button>
              </Link>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg font-bold text-lg border border-purple-500/50 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
                Explore Features
              </button>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black/80 via-blue-900/10 to-black/90 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6 hover-lift">
              <p className="text-lg text-gray-300 leading-relaxed text-2xl ">
                In today's world, many struggle with loneliness, self-doubt, and
                lack of motivation. Whether you're an introvert, dealing with
                depression, struggling with low self-esteem, or simply lacking
                friends to talk to, "IamYou" becomes your best companion—one
                that truly understands you.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed text-2xl">
                Unlike a boring to-do list or Notion, this AI feels alive and
                pushes you to evolve. It's not just about tracking tasks; it's
                about becoming the person you dream to be.
              </p>
            </div>

            <div className="p-6 bg-purple-500/10 rounded-lg border border-purple-500/20 hover-lift card-glow backdrop-blur-sm bg-gray-900">
              <p className="text-lg text-blue-400 leading-relaxed text-2xl ">
                💡 "IamYou" helps you create your ideal alter ego—your
                strongest, most unstoppable version. You'll see your progress in
                real time, guided by your AI twin, who constantly challenges and
                supports you.
              </p>
            </div>

            <div className="space-y-6 ">
              <div className="p-6 bg-red-500/10 rounded-lg border border-red-500/20 hover-lift card-glow backdrop-blur-sm bg-gray-900">
                <p className="text-lg text-gray-300 leading-relaxed ">
                  ⚠️ But remember, you can't lie to the AI. Unlike ChatGPT or
                  other AI tools, tokens in this system have real value, and
                  self-deception won't get you rewards. Above all, don't lie to
                  yourself.
                </p>
              </div>

              <blockquote className="p-6 bg-gray-900/50 rounded-lg border-l-4 border-blue-500 hover-lift transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-gray-900">
                <p className="text-lg text-gray-300 italic">
                  "The man who lies to himself and listens to his own lie comes
                  to such a pass that he cannot distinguish the truth within him
                  or around him, and so loses all respect for himself and for
                  others."
                </p>
                <footer className="mt-2 text-blue-400">
                  — Fyodor Dostoevsky
                </footer>
              </blockquote>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed gradient-text">
              "IamYou" is a mirror of your soul, pushing you toward
              self-improvement without shortcuts, without lies—only the truth of
              who you are and who you can become. 🚀
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <GlowingCard
                icon={Brain}
                title="AI That Thinks Like You"
                description="Learns from past conversations to mimic your style and personality"
              />
              <GlowingCard
                icon={Shield}
                title="Blockchain-Powered Identity"
                description="Your AI memories are securely stored on Base Blockchain"
              />
              <GlowingCard
                icon={Trophy}
                title="Earn Rewards & NFTs"
                description="Complete personal goals & get rewarded with tokens"
              />
              <GlowingCard
                icon={Rocket}
                title="Solo Leveling Mode"
                description="AI creates a daily self-improvement plan tailored to you"
              />
              <GlowingCard
                icon={Heart}
                title="Your Virtual Best Friend"
                description="Supports, motivates, and listens when you need it"
              />
              <GlowingCard
                icon={Wallet2}
                title="Web3 Integration"
                description="Connect your wallet and join the IamYou ecosystem"
              />
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-black/80 via-blue-900/20 to-black/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-6 gradient-text">
                  Experience Your AI Twin
                </h2>
                <p className="text-white mb-8 text-xl">
                  Watch how your AI twin learns and adapts to your personality.
                  Connect your wallet to start earning rewards for personal
                  growth.
                </p>
                <Link href="/connect">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:scale-105">
                  Connect Wallet
                </button></Link>
              </div>
              <div className="flex-1 hover-lift">
                <div className="p-1 gradient-border rounded-xl backdrop-blur-sm">
                  <div className="bg-black/60 p-6 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 animate-pulse"></div>
                        <div className="flex-1 bg-gray-800/80 rounded-lg p-4 transform hover:scale-102 transition-transform duration-300">
                          Hey! I'm your AI twin. I learn from our conversations
                          to better support your goals.
                        </div>
                      </div>
                      <div className="flex gap-4 justify-end">
                        <div className="flex-1 bg-purple-500/20 rounded-lg p-4 transform hover:scale-102 transition-transform duration-300">
                          That's amazing! Can you help me stay motivated with my
                          fitness goals?
                        </div>
                        <div className="w-8 h-8 rounded-full bg-purple-500 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-gray-800 bg-black/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-2xl font-bold gradient-text">IamYou</div>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                >
                  Discord
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                >
                  GitHub
                </a>
              </div>
              <button className="px-6 py-2 bg-purple-500/20 rounded-lg border border-purple-500/50 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
                Join the DAO
              </button>
            </div>
            <div className="mt-8 text-center text-gray-400">
              Built on Base | Open Source
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
