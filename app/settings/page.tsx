"use client";

// import Link from 'next/link';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import AccountSettings from './account';
import BillingSettings from './billing';
import NotificationSettings from './notifications';
import IntegrationsSettings from './integrations';
import SecuritySettings from './security';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function Settings() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const section = searchParams.get('section') || 'account';
    const [isMenuOpen, setIsMenuOpen] = useState(false); // состояние для мобильного меню

    const handleSectionClick = (item: string) => {
        router.push(`/settings?section=${item}`);
        setIsMenuOpen(false); // Закрываем меню после выбора
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="max-w-screen-lg mx-auto p-4 md:p-8">
                <h1 className="text-2xl font-semibold mb-6">Settings</h1>

                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="w-full text-left px-4 py-2 border rounded-md text-indigo-600 font-semibold"
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)} Settings
                        <span className="float-right">{isMenuOpen ? '▲' : '▼'}</span>
                    </button>
                    {isMenuOpen && (
                        <nav className="mt-2 space-y-2 border rounded-md p-2 bg-white shadow">
                            {['account', 'billing', 'notifications', 'integrations', 'security'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleSectionClick(item)}
                                    className={`block w-full text-left p-2 ${section === item ? 'text-indigo-600 font-bold' : ''}`}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>

                <div className="flex">
                    <nav className="hidden md:block w-1/4 space-y-4 border-r pr-4">
                        {['account', 'billing', 'notifications', 'integrations', 'security'].map((item) => (
                            <button
                                key={item}
                                onClick={() => handleSectionClick(item)}
                                className={`block text-left w-full p-2 ${section === item ? 'text-indigo-600 font-bold' : ''}`}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </button>
                        ))}
                    </nav>

                    {/* Основной контент */}
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
