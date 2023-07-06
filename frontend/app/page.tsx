"use client";

import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:8009/")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  });
  const [message, setMessage] = useState("Loading...");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Message from backend
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{message}</p>
        </a>
      </div>
    </main>
  );
}
