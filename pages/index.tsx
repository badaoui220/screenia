/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { CopyBlock, dracula } from "react-code-blocks";

import Layout from "@/components/layout";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Twitter from "@/components/shared/icons/twitter";
import Github from "@/components/shared/icons/github";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { useEffect, useState } from "react";
import Download from "@/components/shared/download";
import Markdown from "@/components/shared/markdown";
import { content, services } from "@/lib/content";

const Home: NextPage = () => {
  const [generatedScreen, setGeneratedScreen] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("https://themeptation.net");

  useEffect(() => {
    takeScreenshot(url);
  }, []);

  const takeScreenshot = async (url: string) => {
    setLoading(true);
    await fetch(`/api/screenshot?url=${url}`)
      .then((response) => {
        if (response.status === 500) {
          setLoading(false);
          setGeneratedScreen("");
          return;
        }
        return response.blob();
      })
      .then((blob: any) => {
        const url = URL.createObjectURL(blob);
        setGeneratedScreen(url);
      });
    setLoading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = e.target.url.value;
    setUrl(url);
    takeScreenshot(url);
  };
  return (
    <Layout>
      <motion.div
        className="max-w-5xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <div className="flex items-center gap-5 mb-10">
          <motion.a
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            href="https://twitter.com/s_badaoui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center px-10 py-3 space-x-2 overflow-hidden transition-colors bg-blue-100 rounded-xl max-w-fit hover:bg-blue-200"
          >
            <Twitter className="h-5 w-5 text-[#1d9bf0]" />
            <p className="font-semibold text-[#1d9bf0]">Follow me</p>
          </motion.a>
          <motion.a
            className="flex items-center justify-center px-10 py-3 space-x-2 text-black transition-colors bg-white border border-gray-300 rounded-xl max-w-fit hover:border-gray-800"
            href="https://github.com/badaoui220/screenia"
            target="_blank"
            rel="noopener noreferrer"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Github />
            <p className="font-semibold">Star on GitHub</p>
          </motion.a>
        </div>
        <motion.h1
          className="text-black mb-10 font-bold tracking-tighter leading-[1.02] text-5xl xl:text-7xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Efficient Website Screenshot Creation in Seconds
        </motion.h1>
        <motion.p
          className="max-w-screen-lg text-xl leading-tight tracking-tight text-black text-opacity-70 lg:text-2xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Looking for a quick and easy solution to grab a webpage screenshot?
          Look no farther than our dependable and quick tool. Enter the URL and
          you&apos;ll have your snapshot in seconds. Screenia is the ideal
          answer if you need to capture it&apos;s free and open-source. Try it
          out right now and see for yourself how simple it is to capture a
          screenshot of any URL in seconds.
        </motion.p>
        <motion.form
          className="max-w-lg mx-auto space-y-4 mt-14 sm:space-x-4 sm:flex sm:space-y-0 sm:items-end"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <label htmlFor="url" className="sr-only">
              Enter URL
            </label>
            <div>
              <input
                className="block w-full px-4 py-3 text-base font-medium text-black placeholder-gray-500 border border-gray-300 rounded-lg sm:py-4 sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                type="url"
                id="url"
                pattern="https://.*"
                placeholder="https://themeptation.net"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute transitiona-all duration-1000 opacity-40 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>

            <button
              type="submit"
              className="inline-flex min-h-[54px] relative items-center justify-center w-full sm:w-auto px-10 py-3 sm:py-3.5 font-semibold text-white transition-all duration-200 bg-black border border-transparent rounded-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:bg-gray-200"
              disabled={loading}
            >
              {loading ? <LoadingDots /> : "Generate"}
            </button>
          </div>
        </motion.form>
        <motion.ul
          className="flex items-center justify-center mt-6 space-x-6 sm:space-x-8"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          {services?.map((service: string) => (
            <li className="flex items-center" key={service}>
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-xs font-medium text-gray-900 sm:text-sm">
                {service}
              </span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
      <div className="grid items-start justify-start w-full max-w-screen-xl grid-cols-1 gap-5 px-5 my-16 md:grid-cols-3 xl:px-0">
        <div className="relative col-span-1 rounded-xl md:col-span-2">
          <div className="absolute transitiona-all duration-1000 opacity-20 inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg filter"></div>
          <div className="relative flex items-center justify-center p-2 bg-white border border-gray-200 min-h-[24rem] rounded-xl">
            {loading ? <LoadingDots /> : null}
            {!loading && !generatedScreen ? (
              <div className="px-10 py-3 text-lg font-semibold tracking-tight text-red-500 bg-red-50 rounded-xl">
                Invalid URL
              </div>
            ) : null}
            {!loading && generatedScreen ? (
              <>
                <Download url={url} />
                <img
                  className="object-cover w-full rounded-xl"
                  src={generatedScreen}
                  alt={`screenia - screenshot of ${url}`}
                />
              </>
            ) : null}
          </div>
        </div>
        <div className="relative col-span-1 overflow-hidden bg-white rounded-xl">
          <h2 className="p-5 text-2xl font-bold">API Code</h2>
          <CopyBlock
            text={`
  let url = '${process.env.NEXT_PUBLIC_APP_URL}/api/screenshot?url=${url}';
  let options = {method: 'GET'};
  fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
          `}
            language="javascript"
            showLineNumbers="true"
            wrapLines
            theme={dracula}
          />
        </div>
      </div>
      <Markdown content={content} />
    </Layout>
  );
};

export default Home;
