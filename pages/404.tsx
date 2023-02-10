import Layout from "@/components/layout";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <Layout>
      <div className="flex min-h-full px-8 py-24">
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center w-full max-w-2xl px-6 text-center md:px-10">
            <h1 className="mt-16 font-bold text-9xl">404</h1>
            <h2 className="mt-6 text-2xl font-semibold">
              The page your were looking for could not be found.
            </h2>
            <p className="mt-4 font-medium text-text">
              It seems this page is missing. Please check the URL or go home.
            </p>
            <Link
              href="/"
              className="inline-flex mt-10 min-h-[54px] relative items-center justify-center w-full sm:w-auto px-10 py-3 sm:py-3.5 font-semibold text-white transition-all duration-200 bg-black border border-transparent rounded-lg hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:bg-gray-200"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
