"use client";

import {useRouter, useSearchParams} from 'next/navigation'; // используем useSearchParams для получения параметров запроса
import AccountSettings from './account';
import BillingSettings from './billing';
import NotificationSettings from './notifications';
import IntegrationsSettings from './integrations';
import SecuritySettings from './security';
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";

export default function Settings() {
    const router = useRouter();
    const searchParams = useSearchParams(); // используем useSearchParams
    const section = searchParams.get('section') || 'account'; // получаем текущий раздел из query параметров

    return (
        <>
            <Navbar></Navbar>
            <div className="max-w-screen-lg mx-auto p-8">
                <h1 className="text-2xl font-semibold mb-6">Settings</h1>
                <div className="flex">
                    <nav className="w-1/4 space-y-4 border-r pr-4">
                        {['account', 'billing', 'notifications', 'integrations', 'security'].map((item) => (
                            <button
                                key={item}
                                onClick={() => router.push(`/settings?section=${item}`)}
                                className={`block text-left w-full p-2 ${section === item ? 'text-indigo-600 font-bold' : ''}`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </nav>
                    <main className="flex-1 p-4">
                        {section === 'account' && <AccountSettings/>}
                        {section === 'billing' && <BillingSettings/>}
                        {section === 'notifications' && <NotificationSettings/>}
                        {section === 'integrations' && <IntegrationsSettings/>}
                        {section === 'security' && <SecuritySettings/>}
                    </main>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}
