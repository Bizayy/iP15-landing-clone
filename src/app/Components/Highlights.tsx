import { watchImg, rightImg } from "@/utils/page"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import VideoCarousel from "./VideoCarousel"
const Highlights = () => {
    useGSAP(() => {
        gsap.to('.highlights-title', {
            opacity: 1,
            y: 0,
            duration: 1,
        })
        gsap.to('.link', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
        })
    }, [])
    return (
        <section id='highlights' className="w-full bg-zinc px-4 pt-20">
            <div className="w-full lg:max-w-[1120px] mx-auto">
                <div className="w-full flex flex-col md:flex-row md:items-baseline md:justify-between gap-5">
                    <h1 className="highlights-title">Get the highlights.</h1>
                    <div className="text-blue-400 text-xl flex items-start gap-5">
                        <span className="link">Watch the film <Image src={watchImg} width={20} height={20} alt="playImg" /></span>
                        <span className="link">Watch the event <Image src={rightImg} width={10} height={10} alt="rightImg" /></span>
                    </div>
                </div>
                <VideoCarousel />
            </div>
        </section>
    )
}

export default Highlights
