"use client"
import Navbar from "@/app/navbar";
// import Default from "@/app/default";
import DataList from "@/app/dataList";
import Footer from "@/app/footer";

export default function Home() {
    return (
        <>
            <Navbar></Navbar>
            <DataList></DataList>
            <Footer></Footer>
        </>
    )
}