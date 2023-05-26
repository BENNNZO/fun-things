"use client"

import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';

export default function page() {
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [screenDimentions, setScreenDimentions] = useState({ width: 0, height: 0 })
    const [rings, setRings] = useState(50)
    const [spacing, setSpacing] = useState(100)

    useEffect(() => {
        setScreenDimentions({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    return (
        <div 
            className='bg-black w-screen h-screen overflow-hidden'
            onMouseMove={e => {setMouseX(e.pageX); setMouseY(e.pageY)}}
        >
            <Dropdown
                options={[
                    {
                        type: "range",
                        title: "Amount Of Rings:",
                        min: 5,
                        max: 200,
                        value: rings,
                        onChange: setRings
                    },
                    {
                        type: "range",
                        title: "Size Of Rings:",
                        min: 10,
                        max: 100,
                        value: spacing,
                        onChange: setSpacing
                    }
                ]}
            />
            <div className='w-full h-full overflow-hidden relative'>
                {[...Array(parseInt(rings))].map((e, i) => (
                    <div 
                        className='bg-white rounded-full shadow-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                        style={{ 
                            width: `${((rings - i) * spacing) / (rings / i)}px`, 
                            height: `${((rings - i) * spacing) / (rings / i)}px`,
                            transform: `translate(${(((mouseX / screenDimentions.width) * 100) - 100)}%, ${((mouseY / screenDimentions.height) * 100) - 100}%)`,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}