"use client";

import React from "react";
import {
  ArrowBigDownDash,
  ArrowUpRight,
  CheckIcon,
  FileText,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { SignIn, SignInButton, SignedOut } from "@clerk/nextjs";
import { TwitterBorder } from "./TwitterLink";
import PlatformsSlider from "./PlatformSlider";

const HeroSection = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const heroSectionRef = useRef(null);
  const heroSectionInView = useInView(heroSectionRef);
  const slap = {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    whileInView: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
    viewport: { once: true },
  };

  return (
    <>
    <section className="flex relative flex-col gap-5 justify-center items-center mt-10 max-w-xl md:mt-16 md:max-w-2xl lg:max-w-3xl">
      <TwitterBorder />
      <motion.h1
        {...{
          ...slap,
          transition: { ...slap.transition, delay: 0.2 },
        }}
        className="text-center  mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]  bg-clip-text text-4xl tracking-tighter  sm:text-5xl dark:text-transparent md:text-6xl lg:text-7xl"
        >
        Your ultimate{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-500 dark:to-green-200 from-zinc-900 dark:from-zinc-300">
          music analytics
        </span>{" "}
        platform
      </motion.h1>
      <motion.p
        {...{
          ...slap,
          transition: { ...slap.transition, delay: 0.3 },
        }}
        className="text-lg text-center text-soft-foreground-text"
        >
        StatsCrave offers comprehensive streaming statistics of various music giants. Track your top artists, albums & tracks, and stay updated on charts, trends & pop culture.
      </motion.p>
      {/* <Link
        href="/signin"
        className="inline-flex text-lg gap-x-2 mt-2 backdrop-blur-md text-white justify-center items-center py-3 px-5 w-fit rounded-3xl border duration-200 group bg-page-gradient border-white/30 text-md font-geistSans hover:border-zinc-600 hover:bg-transparent/10 hover:text-zinc-100"
        >
        It's free. Sign up now
        <div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
          <ArrowUpRight className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
          <ArrowUpRight className="absolute transition-all duration-500 -translate-x-4 -translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
      </Link> */}
      <a
        href="https://www.producthunt.com/posts/statscrave?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-statscrave"
        target="_blank"
        >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=480022&theme=dark"
          alt="StatsCrave - Your&#0032;music&#0032;analytics&#0032;platform | Product Hunt"
          style={{ width: "250px", height: "54px" }}
          width="250"
          height="54"
          />
      </a>
     
    </section>
    <PlatformsSlider />
			{/* <div className="relative z-50">
				<motion.img
        {...{
						...slap,
						transition: { ...slap.transition, delay: 0.35 },
            }}
					src="/images/landing-hero.jpeg"
					alt="Landing page background"
					width={1512}
					height={1405}
					draggable="false"
					className="z-40 md:mt-[-40px] hidden sm:block h-full max-w-[70vw] mx-auto md:w-full select-none px-5 !rounded-2xl"
					style={{
						borderRadius: "20px",
            }}
            />
            <div
            className="absolute -z-10 left-0 top-[10%] h-32 w-[90%] overflow-x-hidden bg-[rgb(54,157,253)] bg-opacity-100  blur-[337.4px]"
            style={{ transform: "rotate(-30deg)" }}
            />
            </div> */}
    </>
  );
};

export default HeroSection;
