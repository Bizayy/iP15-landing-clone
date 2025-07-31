import { SyntheticEvent } from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { hightlightsSlides } from "@/constants/page";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { pauseImg, playImg, replayImg } from "@/utils/page";

const VideoCarousel = () => {
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isPlaying: false,
        isLastVideo: false,
    });

    const videoRef = useRef<HTMLVideoElement[]>([]);
    const videoSpanRef = useRef<HTMLSpanElement[]>([]);
    const videoDivRef = useRef<HTMLDivElement[]>([]);

    const { isEnd, startPlay, videoId, isPlaying, isLastVideo } = video;
    const [loadedData, setLoadedData] = useState<SyntheticEvent<HTMLVideoElement, Event>[]>([]);


    //the useEffect below handles the playing and pausing of the video
    useEffect(() => {
        ScrollTrigger.refresh();
        // if (loadedData.length > 3) {
        if (videoRef.current[videoId]) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            }
            else {
                startPlay && videoRef.current[videoId].play();
            }
        }

    }, [startPlay, videoId, isPlaying, loadedData]);

    useEffect(() => {

        let currentProgress = 0;
        let span = videoSpanRef.current;

        // if we have span for a video Id, now we can animate it.
        if (span[videoId]) {
            //animating the progress of the video
            let animation = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(animation.progress() * 100);
                    if (currentProgress != progress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            // assigning the width to the progress bar div.
                            width: window.innerWidth < 600 ? '10vw' : window.innerWidth < 1000 ? '10vw' : '5vw'
                        });

                        // animating the whitish progression inside the progress bar.
                        gsap.to(videoSpanRef.current[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white',
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf',
                        })
                    }

                }
            })
            if (videoId === 0) animation.restart();

            const animationUpdate = () => {
                animation.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
            }

            if (isPlaying) gsap.ticker.add(animationUpdate);
            if (!isPlaying) gsap.ticker.remove(animationUpdate);

        }
    }, [videoId, startPlay]);

    const handleProcess = (type: string, i: number) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideoState) => ({ ...prevVideoState, isEnd: true, videoId: i + 1 }))
                break;
            case 'last-video':
                setVideo((prevVideoState) => ({ ...prevVideoState, isLastVideo: true }))
                break;
            case 'reset-video':
                setVideo((prevVideoState) => ({ ...prevVideoState, isLastVideo: false, videoId: 0 }))
                break;
            case 'pause':
                setVideo((prevVideoState) => ({ ...prevVideoState, isPlaying: !prevVideoState.isPlaying }))
                break;
            case 'play':
                setVideo((prevVideoState) => ({ ...prevVideoState, isPlaying: !prevVideoState.isPlaying }))
                break;
            default:
                return video;
        }
    }

    useGSAP(() => {
        gsap.to('#videoContainerDiv', {
            x: `${-100 * videoId}%`,
            duration: 2,
            ease: 'power2.inOut',
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }))
            }
        })
        // ScrollTrigger.create({
        //     trigger: '#video',
        //     start: 'top center',
        //     end: 'bottom center',
        //     markers: true, // show visual indicators
        //     onEnter: () => console.log('video in view'),
        // });
    }, [videoId, startPlay])

    const handleLoadedData = (i: number, e: SyntheticEvent<HTMLVideoElement, Event>) => setLoadedData((prev) => [...prev, e]);

    return (
        <div className="my-10">
            <div className="flex items-center overflow-hidden">
                {hightlightsSlides.map((slide, i) => (
                    <div key={slide.id} className="pr-8 sm:pr-14 md:pr-20 flex-none" id="videoContainerDiv">
                        <div className="bg-black rounded-3xl flex-center relative overflow-hidden w-[88vw] max-w-[450px] h-[35vh] sm:w-[70vw]
                            sm:max-w-[550px] sm:h-[50vh] md:max-w-[650px] md:h-[70vh] lg:max-w-[750px]">
                            <div className="absolute top-10 left-5 z-10">
                                {slide.textLists.map((text) => (
                                    <p key={text} className="font-medium sm:text-2xl">{text}</p>
                                ))}
                            </div>
                            <video id="video" playsInline preload="auto" muted onLoadedMetadata={(e) => handleLoadedData(i, e)}
                                onEnded={() => {
                                    i !== hightlightsSlides.length - 1 ? handleProcess('video-end', i) : handleProcess('last-video', i)
                                }}
                                ref={(el) => { if (el) videoRef.current[i] = el; }}
                                onPlay={() => { setVideo((prevVideoInfo) => ({ ...prevVideoInfo, isPlaying: true })) }}
                                className={`${slide.id === 2 && 'translate-x-40'} pointer-events-none`}
                            >
                                <source src={slide.video} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination dots */}
            <div className="relative flex-center gap-5 mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, i) => (
                        <div key={i} ref={(el) => { if (el) videoDivRef.current[i] = el; }} className="mx-2 h-3 w-3 bg-gray rounded-full relative cursor-pointer">
                            <span className="absolute h-full w-full rounded-full" ref={(el) => { if (el) videoSpanRef.current[i] = el }} />
                        </div>
                    ))}
                </div>
                <button className="bg-gray-300 rounded-full p-3 backdrop-blur flex-center cursor-pointer">
                    <Image src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
                        alt={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
                        onClick={isLastVideo && videoId == hightlightsSlides.length - 1 ? () => handleProcess('reset-video', videoId) :
                            isPlaying ? () => handleProcess('pause', videoId) : () => handleProcess('play', videoId)}
                    />
                </button>
            </div>
        </div>
    )
}

export default VideoCarousel
