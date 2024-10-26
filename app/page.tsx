// app/page.tsx
"use client";

// import { Button } from "flowbite-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Логотип и заголовок */}
      <div className="flex items-center mb-6">
        <Image
          src="/favicon.ico" // Путь к логотипу
          alt="Логотип"
          width={50}
          height={50}
          className="mr-3"
        />
        <h1 className="text-4xl font-bold text-blue-600">MyApp</h1>
      </div>
      {/* Текст-рыба */}
      <p className="text-center text-gray-500 mb-8 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
        pulvinar facilisis justo mollis, auctor consequat urna.
      </p>
      {/* Кнопки для Sign Up и Sign In */}
      <div className="space-x-4">
      <button className="px-6 py-3 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
        <a href="/signup">Sign Up</a>
        </button>
        <button className="px-6 py-3 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
          <a href="/signin">Sign In</a>
        </button>
      </div>
    </div>
  );
}
