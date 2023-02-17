import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import slugify from "slugify";
import LoadingDots from "./icons/loading-dots";
import { optionsToParams } from "@/lib/optionsToUrl";

export default function Download({ options }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const formats = ["png", "jpeg"];

  const handleDownload = async (format: string) => {
    setLoading(true);
    await fetch(
      `/api/screenshot?${optionsToParams(
        options,
      )}&type=${format}&download=true`,
    )
      .then((res) => res.blob())
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = file;
        a.download = `screenia_${slugify(options?.url, {
          lower: true,
          strict: true,
        })}.${format}`;
        a.click();
      });
    setLoading(false);
  };
  return (
    <div className="absolute w-56 text-right top-10 right-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            disabled={loading}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium tracking-tight text-white bg-black rounded-md bg-opacity-80 hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {loading ? <LoadingDots color="white" /> : "Download"}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {formats?.map((format) => (
                <Menu.Item key={format}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-black text-white" : "text-gray-900"
                      } group flex w-full items-center text-sm font-medium rounded-md px-2 py-2`}
                      onClick={() => handleDownload(format)}
                    >
                      {format}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
