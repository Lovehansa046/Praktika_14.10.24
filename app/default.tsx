"use client";

import Image from "next/image";

export default function Default() {
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

        </div>
    );
}


