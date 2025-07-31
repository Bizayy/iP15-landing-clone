'use client'
import Hero from "./Components/Hero";
import Highlights from "./Components/Highlights";
import Navbar from "./Components/Navbar";
import Model from "./Components/Model";

export default function Home() {
    return (
        <main className="">
            <Navbar />
            <Hero />
            <Highlights />
            <Model />
        </main>
    );
}
