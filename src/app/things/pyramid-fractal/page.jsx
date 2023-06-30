"use client"

import React, { useState } from 'react'
import Dropdown from '@/components/Dropdown'

export default function PyramidFractal() {
    const [layers, setLayers] = useState(3)
    const [screenDim, setScreenDim] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setScreenDim({ width: window.innerWidth, height: window.innerHeight })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Dropdown 
            
            />
            <svg>
                {[...Array(layers)].map((e, i) => (
                    <div key={i}>hello world!</div>
                ))}
            </svg>
        </div>
    )
}