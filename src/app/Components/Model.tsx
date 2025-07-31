import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react"
import { yellowImg } from "@/utils/page";
import * as THREE from 'three';
import ModelView from "./ModelView";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "@/constants/page";

const Model = () => {

    const [size, setSize] = useState('small');

    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8f8a81', '#ffe7b9', '#6f6c64'],
        img: yellowImg,
    })

    useGSAP(() => {
        gsap.to('#heading', {
            opacity: 1,
            y: 0,
            duration: 1,
        })
    }, [])

    // setting the camera control for the model view:

    const cameraControlSmall = useRef(null);
    const cameraControlLarge = useRef(null);

    // iPhone model
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    // Model Rotation:
    const [smallModelRotation, setSmallModelRotation] = useState(0);
    const [largeModelRotation, setLargeModelRotation] = useState(0);

    return (
        <section className="py-20 px-5 sm:py-32 sm:px-10">
            <div className="max-w-[1120px]">
                <h1 id='heading' className="text-gray text-3xl font-medium mb-5 translate-y-20 opacity-0 lg:mb-0 md:text-5xl lg:text-6xl">
                    Take a closer look.
                </h1>
                <div className='flex flex-col items-center mt-5'>
                    <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType='view1'
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallModelRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType='view2'
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeModelRotation}
                            item={model}
                            size={size}
                        />
                        <Canvas className="w-full h-full inset-0 fixed overflow-hidden">
                            <View.Port />
                        </Canvas>
                    </div>

                    <div className="w-full mx-auto">
                        <p className="text-center font-light text-sm mb-5">{model.title}</p>
                        <div className="flex-center gap-3">
                            <ul className="p-4 bg-gray-300 backdrop-blur rounded-full flex-center">
                                {models.map((model, i) => (
                                    <li key={model.id} className={`w-6 h-6 rounded-full mx-2 cursor-pointer`}
                                        style={{
                                            backgroundColor: model.color[0],
                                        }} onClick={() => { setModel(model) }} />
                                ))}
                            </ul>

                            <button className="flex-center gap-1 p-1 bg-gray-300 rounded-full">
                                {sizes.map(({ label, value }) => (
                                    <span key={label} className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full cursor-pointer"
                                        style={{
                                            backgroundColor: size === value ? 'white' : 'transparent',
                                            color: size === value ? 'black' : 'white',
                                        }}
                                        onClick={() => { setSize(value) }}>
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model
