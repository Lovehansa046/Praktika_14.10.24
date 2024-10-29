"use client"
import data from './data.json';

export default function DataList() {


    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    Team members
                </h3>
                <p className="text-gray-600 mt-2">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">Username</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Position</th>
                        <th className="py-3 px-6">Salary</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                    {
                        data.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.count}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.sellerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.totalPrice}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}