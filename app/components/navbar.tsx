import {useEffect, useState} from 'react'
import data from '../marketplace/data.json';
import contracts from '../contracts/data.contracts.json';
import payments from '../payments/data.payments.json';


const dropdownNavs = [
    {
        navs: [
            {
                title: "Procurement",
                desc: "Duis aute irure dolor in reprehenderit",
                path: "javascript:void(0)",
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
                </svg>
                ,
            },
            {
                title: "Selling",
                desc: "Duis aute irure dolor in reprehenderit",
                path: "javascript:void(0)",
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                           className="w-6 h-6">
                    <path
                        d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"/>
                </svg>

                ,
            },
            {
                title: "Marketplace",
                desc: "Duis aute irure dolor in reprehenderit",
                path: "/marketplace",
                icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                           className="w-6 h-6">
                    <path
                        d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"/>
                </svg>

                ,
            },
        ]
    }
]

export default function Navbar() {

    const [state, setState] = useState(false)
    const [drapdownState, setDrapdownState] = useState({isActive: false, idx: null})
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const combinedData = [
        ...data.map(item => ({type: 'product', ...item})),
        ...contracts.map(item => ({type: 'contract', ...item})),
        ...payments.map(item => ({type: 'payment', ...item})),
    ];

    const filteredResults = combinedData.filter(item => {
        const term = searchTerm.toLowerCase();
        if (item.type === 'product') {
            return item.name.toLowerCase().includes(term) || item.sku.toLowerCase().includes(term) || item.sellerName.toLowerCase().includes(term);
        } else if (item.type === 'contract') {
            return item.company_name.toLowerCase().includes(term) || item.contact_person.toLowerCase().includes(term);
        } else if (item.type === 'payment') {
            return item.payment.toLowerCase().includes(term) || item.legal_name.toLowerCase().includes(term) || item.status.toLowerCase().includes(term);
        }
        return false;
    });
    // Handle input change and filter data

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        {title: "Dashboard", path: "javascript:void(0)", isDrapdown: false},
        {title: "Marketplace", path: "javascript:void(0)", isDrapdown: true, navs: dropdownNavs},
        {title: "Contracts", path: "/contracts", isDrapdown: false},
        {title: "Payments", path: "/payments", isDrapdown: false},
        {title: "Settings", path: "/settings", isDrapdown: false}
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".nav-menu")) setDrapdownState({isActive: false, idx: null});
        };
    }, [])

    return (
        <>
            <nav
                className={`relative z-20 bg-white w-full md:static md:text-sm md:border-none ${state ? "shadow-lg rounded-b-xl md:shadow-none" : ""}`}>
                <div className="items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="/home">
                            <img
                                src="https://www.floatui.com/logo.svg"
                                width={120}
                                height={50}
                                alt="Float UI logo"
                            />
                        </a>
                        <div className="md:hidden">
                            <button className="text-gray-500 hover:text-gray-800"
                                    onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6">
                                            <path fillRule="evenodd"
                                                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`nav-menu flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                        <ul className="items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <li key={idx}>
                                            {
                                                item.isDrapdown ? (
                                                    <button
                                                        className="w-full flex items-center justify-between gap-1 text-gray-700 hover:text-indigo-600"
                                                        onClick={() => setDrapdownState({
                                                            idx,
                                                            isActive: !drapdownState.isActive
                                                        })}
                                                    >
                                                        {item.title}
                                                        {
                                                            drapdownState.idx == idx && drapdownState.isActive ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 20 20" fill="currentColor"
                                                                     className="w-5 h-5">
                                                                    <path fillRule="evenodd"
                                                                          d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                                                                          clipRule="evenodd"/>
                                                                </svg>

                                                            ) : (
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     viewBox="0 0 20 20" fill="currentColor"
                                                                     className="w-5 h-5">
                                                                    <path fillRule="evenodd"
                                                                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                                          clipRule="evenodd"/>
                                                                </svg>
                                                            )
                                                        }
                                                    </button>
                                                ) : (
                                                    <a href={item.path}
                                                       className="block text-gray-700 hover:text-indigo-600">
                                                        {item.title}
                                                    </a>
                                                )
                                            }
                                            {
                                                item.isDrapdown && drapdownState.idx == idx && drapdownState.isActive ? (
                                                    <div
                                                        className="bg-white mt-6 inset-x-0 top-20 w-full md:absolute md:border-y md:shadow-md md:mt-0">
                                                        <ul className='max-w-screen-xl mx-auto grid items-center gap-6 md:p-8 md:grid-cols-2 lg:grid-cols-3'>
                                                            {item?.navs.map((dropdownItem, idx) => (
                                                                <li key={idx}>
                                                                    <p className="text-indigo-600 text-sm">{dropdownItem.label}</p>
                                                                    <ul className='mt-5 space-y-6 '>
                                                                        {dropdownItem.navs.map((navItem, idx) => (
                                                                            <li key={idx} className="group">
                                                                                <a href={navItem.path}
                                                                                   className='flex gap-3 items-center'>
                                                                                    <div
                                                                                        className='w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center duration-150 group-hover:bg-indigo-600 group-hover:text-white md:w-14 md:h-14'>
                                                                                        {navItem.icon}
                                                                                    </div>
                                                                                    <div>
                                                                                        <span
                                                                                            className="text-gray-800 duration-200 group-hover:text-indigo-600 text-sm font-medium md:text-base">{navItem.title}</span>
                                                                                        <p className='text-sm text-gray-600 group-hover:text-gray-800 mt-1'>{navItem.desc}</p>
                                                                                    </div>
                                                                                </a>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : ""
                                            }
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    <button
                        onClick={handleSearchToggle}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
                        </svg>
                    </button>
                    {isSearchOpen && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-40 backdrop-blur-sm">
                            <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-2xl">
                                <button
                                    onClick={handleSearchToggle}
                                    className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 p-3"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search across products, contracts, payments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 text-lg"
                                />

                                {/* Display search results */}
                                <div className="mt-4 max-h-64 overflow-y-auto">
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((item, idx) => (
                                            <div key={idx} className="border-b py-2 px-2">
                                                {item.type === 'product' && (
                                                    <div>
                                                        <p><strong>Product:</strong> {item.name}</p>
                                                        <p><strong>SKU:</strong> {item.sku}</p>
                                                        <p><strong>Seller:</strong> {item.sellerName}</p>
                                                        <p><strong>Price:</strong> ${item.price}</p>
                                                    </div>
                                                )}
                                                {item.type === 'contract' && (
                                                    <div>
                                                        <p><strong>Company:</strong> {item.company_name}</p>
                                                        <p><strong>Contact:</strong> {item.contact_person}</p>
                                                        <p><a href={item.download_document} className="text-indigo-600">Download
                                                            Document</a></p>
                                                    </div>
                                                )}
                                                {item.type === 'payment' && (
                                                    <div>
                                                        <p><strong>Payment ID:</strong> {item.payment}</p>
                                                        <p><strong>Legal Name:</strong> {item.legal_name}</p>
                                                        <p><strong>Status:</strong> {item.status}</p>
                                                        <p><strong>Amount:</strong> ${item.payment_amount}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No results found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            {
                state ? (
                    <div
                        className="z-10 fixed top-0 w-screen h-screen bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={() => setState(false)}></div>
                ) : ""
            }
        </>
    )
}