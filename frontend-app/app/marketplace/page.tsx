"use client"
import Navbar from "@/app/components/navbar";
// import Default from "@/app/default";
import DataList from "@/app/marketplace/dataList";
import Footer from "@/app/components/footer";

export default function Home() {
    return (
        <>
            <Navbar></Navbar>
            <DataList></DataList>
            <Footer></Footer>
        </>
    )
}