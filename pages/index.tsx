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
import { useState } from "react";
import Download from "@/components/shared/download";
import Markdown from "@/components/shared/markdown";
import { content, services } from "@/lib/content";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { optionsToParams } from "@/lib/optionsToUrl";

const Home: NextPage = () => {
  const [generatedScreen, setGeneratedScreen] = useState<string>(
    "/images/themeptation-screenshot.png",
  );
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any>({
    url: "https://themeptation.net",
  });

  const handleChangeChecked = (event: any) => {
    setOptions((prev: any) => ({ ...prev, fullscreen: event.target.checked }));
  };

  const takeScreenshot = async (data: any) => {
    setLoading(true);
    await fetch(`/api/screenshot?${optionsToParams(data)}`)
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
    const url = e.target?.url?.value;
    setOptions((prev: any) => ({ ...prev, url }));
    takeScreenshot({ ...options, url });
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
            className="flex items-center justify-center px-10 py-3 space-x-2 overflow-hidden leading-5 transition-colors bg-blue-100 rounded-xl max-w-fit hover:bg-blue-200"
          >
            <Twitter className="h-5 w-5 text-[#1d9bf0] shrink-0" />
            <p className="font-semibold text-[#1d9bf0]">Follow me</p>
          </motion.a>
          <motion.a
            className="flex items-center justify-center px-10 py-3 space-x-2 leading-5 text-black transition-colors bg-white border border-gray-300 rounded-xl max-w-fit hover:border-gray-800"
            href="https://github.com/badaoui220/screenia"
            target="_blank"
            rel="noopener noreferrer"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Github className=" shrink-0" />
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
          className="max-w-lg mx-auto mt-14"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          onSubmit={handleSubmit}
        >
          <div className="space-y-4 sm:flex sm:items-end sm:space-x-4 sm:space-y-0">
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
          </div>
          <Disclosure as="div" className="w-auto mt-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex px-4 py-2 text-sm font-medium text-left text-slate-900 focus:outline-none ">
                  <span>More options</span>
                  <ChevronUpIcon
                    className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="flex flex-col p-4 rounded-lg bg-slate-100">
                  <div className="flex flex-wrap items-center gap-5">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="fullscreen"
                        className="accent-black"
                        onChange={handleChangeChecked}
                      />
                      <div className="text-sm font-semibold text-slate-900">
                        Fullscreen (beta) *
                      </div>
                    </label>
                  </div>
                  <span className="mt-5 text-xs  text-slate-500">
                    * this feature not working for large websites du to limits
                    on vercel (hobby account) API (5ms)
                  </span>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
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
                <Download options={options} />
                <img
                  className="object-cover w-full rounded-xl"
                  src={generatedScreen}
                  alt={`screenia - screenshot of ${options?.url}`}
                />
              </>
            ) : null}
          </div>
        </div>
        <div className="relative col-span-1 overflow-hidden bg-white rounded-xl">
          <h2 className="px-5 pt-5 text-2xl font-bold">API Code</h2>
          <p className="p-5">Supported image types (png, jpeg)</p>
          <CopyBlock
            text={`
  let url = '${
    process.env.NEXT_PUBLIC_APP_URL
  }/api/screenshot?${optionsToParams(options)}&type=png';
  let options = {method: 'GET'};
  fetch(url, options)
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob))
    .catch(err => console.error('error:' + err));
          `}
            language="javascript"
            wrapLines
            theme={dracula}
            showLineNumbers
            codeBlock
          />
        </div>
      </div>
      <Markdown content={content} />
    </Layout>
  );
};

export default Home;
