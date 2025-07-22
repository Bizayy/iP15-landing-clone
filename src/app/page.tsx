import Hero from "./Components/Hero";
import Highlights from "./Components/Highlights";
import Navbar from "./Components/Navbar";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <Highlights />
        </main>
    );
}
