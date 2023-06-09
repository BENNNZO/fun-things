"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

// import PlaceHolder from '@/assets/things/place-holder.png'
import DistantSquaresImg from '@/assets/things/distant-squares.png'
import MouseTrailImg from '@/assets/things/mouse-trail.png'
import Rings from '@/assets/things/3d-rings.png'
import Boxes from '@/assets/things/3d-boxes-rename-extention.png'
import AmberFlies from '@/assets/things/amber-flies.png'
import Spiral from '@/assets/things/spiral.png'

export default function Home() {
    const router = useRouter()

    const pages = [
        {
            title: "Distant Squares",
            link: '/things/distant-squares',
            src: DistantSquaresImg,
            alt: "alternate"
        },
        {
            title: "Mouse Trails",
            link: '/things/mouse-trail',
            src: MouseTrailImg,
            alt: "alternate"
        },
        {
            title: "3D Rings",
            link: '/things/3d-pointer',
            src: Rings,
            alt: "alternate"
        },
        {
            title: "3D Boxes",
            link: '/things/3d-box',
            src: Boxes,
            alt: "alternate"
        },
        {
            title: "Amber Flies",
            link: '/things/pointer-swarm',
            src: AmberFlies,
            alt: "alternate"
        },
        {
            title: "Spiral",
            link: '/things/spiral',
            src: Spiral,
            alt: "alternate"
        },
        // {
        //     title: "Poly Rhythm",
        //     link: '/things/poly-rhythm',
        //     src: PlaceHolder,
        //     alt: "alternate"
        // }
    ]

    return (
        <ul className="grid grid-cols-3 gap-px w-screen h-screen overflow-hidden bg-white p-px">
            {pages.map((e, i) => (
                <li
                    key={i}
                    onClick={() => router.push(e.link)}
                    className="relative cursor-pointer shadow-lg overflow-hidden group"
                >
                    <Image 
                        src={e.src}
                        alt={e.alt}
                        className="group-hover:scale-150 transition-transform object-cover h-full w-full blur-sm scale-125"
                    />
                    <p className="text-black text-3xl z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold shadow-md px-3 py-1 bg-white/50 backdrop-blur-md rounded-md group-hover:scale-125 transition-transform whitespace-nowrap">{e.title}</p>
                </li>
            ))}
        </ul>
    )
}
