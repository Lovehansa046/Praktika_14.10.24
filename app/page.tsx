"use client";

import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="flex items-center mb-6">
                <Image
                    src="/favicon.ico"
                    alt="Логотип"
                    width={50}
                    height={50}
                    className="mr-3"
                />
                <h1 className="text-4xl font-bold text-blue-600">MyApp</h1>
            </div>
            <p className="text-center text-gray-500 mb-8 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
                pulvinar facilisis justo mollis, auctor consequat urna.
            </p>
            <div className="space-x-4">
                <a href="/signup">
                    <button
                        className="px-6 py-3 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
                        Sign Up
                    </button>
                </a>
                <a href="/signin">
                    <button
                        className="px-6 py-3 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
                        Sign In

                    </button>
                </a>
            </div>
        </div>
    );
}
