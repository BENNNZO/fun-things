"use client"

import React, { useState } from 'react'
import Dropdown from '@/components/Dropdown'

export default function() {
    const [layers, setLayers] = useState(3)
    const [screenDim, setScreenDim] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setScreenDim({ width: window.innerWidth, height: window.innerHeight })
    }, []);

    return (
        <div>
            <Dropdown 
            
            />
            <svg>
                {[...Array(layers)].map(e => (
                    <div>hello world!</div>
                ))}
            </svg>
        </div>
    )
}