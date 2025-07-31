import { PerspectiveCamera, View } from "@react-three/drei";
import { StaticImageData } from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";
import * as THREE from 'three'
import Lights from "./Lights";

interface propsType {
    index: number;
    groupRef: RefObject<THREE.Group<THREE.Object3DEventMap>>;
    gsapType: string;
    controlRef: RefObject<null>;
    setRotationState: Dispatch<SetStateAction<number>>;
    item: {
        title: string;
        color: string[];
        img: StaticImageData;
    };
    size: string;
}
const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, item, size }: propsType) => {
    return (
        <View
            index={index}
            id={gsapType}
            className={`border-1 w-full h-full border-red-400 ${index === 2 ? 'right-[-100%]' : ''}`}
        >
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />
        </View>
    )
}

export default ModelView
