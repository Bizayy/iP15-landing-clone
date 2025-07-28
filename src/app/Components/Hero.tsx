import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Hero = () => {

    const smallHeroVideoSrc = '/assets/videos/smallHeroVideo.mp4';
    const largeHeroVideoSrc = '/assets/videos/heroVideo.mp4';
    const [videoSrc, setVideoSrc] = useState(smallHeroVideoSrc);

    const handleWindowSizeForVideoSrc = () => {
        window.innerWidth > 500 ? setVideoSrc(largeHeroVideoSrc) : setVideoSrc(smallHeroVideoSrc);
    };
    useEffect(() => {
        // for first render to determine which video to render ie the video for smaller screens or larger ones
        window.innerWidth > 500 ? setVideoSrc(largeHeroVideoSrc) : '';

        // when user resizes the window, we want the video to change based on the window size
        window.addEventListener('resize', handleWindowSizeForVideoSrc);

        return () => {
            window.removeEventListener('resize', handleWindowSizeForVideoSrc);
        }

    }, []);

    useGSAP(() => {
        gsap.to('.hero-title', {
            opacity: 1,
            delay: 0.8,
        })
        gsap.to('#cta', {
            opacity: 1,
            y: -50,
            delay: 1.5,
        })
    }, []);

    return (
        <section className="w-full pt-10">
            <div className="w-full flex-center flex-col mb-7">
                <h1 className="hero-title opacity-0 mb-6">iPhone 15 Pro</h1>
                <div className='w-9/12 md:w-10/12'>
                    <video autoPlay muted playsInline key={videoSrc} className='pointer-events-none'>
                        <source src={videoSrc} type='video/mp4' />
                    </video>
                </div>
            </div>
            <div id='cta' className='flex flex-col items-center translate-y-20 opacity-0'>
                <Link href='' className='btn'>Buy</Link>
                <p className='text-lg font-normal'>From $199/month or $999</p>
            </div>
        </section>
    )
}

export default Hero
