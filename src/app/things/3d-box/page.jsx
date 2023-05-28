"use client"

import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';
import Box from '@/components/3DBox'

// this is actuallt pretty cool
// I accidentally made a Autostereogram
// if you cross your eyes the right amount and then focus then so there not blurred the boxed will actually pop out the screen

export default function page() {
    const [dim, setDim] = useState({ width: 0, height: 0 })
    const [boxes, setBoxes] = useState([])
    const [amount, setAmount] = useState(250)
    const [size, setSize] = useState(150)
    const [perspective, setPerspective] = useState(150)
    const [width, setWidth] = useState(2)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [debug, setDebug] = useState(false)
    const [debugQuad, setDebugQuad] = useState(false)

    useEffect(() => {
        let boxMatrix = []
        for (let i = 0; i < window.innerHeight / amount; i++) {
            let row = []
            for (let i = 0; i < window.innerWidth / amount; i++) {
                row.push(1)
            }
            boxMatrix.push(row)
        }
        setBoxes(boxMatrix)
    }, [amount])

    useEffect(() => {
        setDim({ width: window.innerWidth, height: window.innerHeight, mid: [window.innerWidth / 2, window.innerHeight / 2] })
    },[])

    return (
        <div 
            className='w-screen h-screen bg-black overflow-hidden'
            onMouseMove={e => {setMouseX(e.pageX); setMouseY(e.pageY)}}
        >
            {/* <p className='text-white'>{JSON.stringify(boxes, null, 4)}</p> */}
            <div className='w-full h-full flex flex-col justify-around'>
                {boxes.map(e => (
                    <div className='flex flex-row justify-around w-full h-full items-center'>
                        {e.map(() => (
                            <Box
                                debugQuad={debugQuad}
                                debug={debug}
                                size={size}
                                dim={{ mid: [mouseX, mouseY]}}
                                perspective={perspective / 100}
                                width={width}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <Dropdown 
                options={[
                    {
                        type: "range",
                        title: "Amount Of Boxes:",
                        min: 150,
                        max: 500,
                        value: amount,
                        onChange: setAmount
                    },
                    {
                        type: "range",
                        title: "Size Of Boxes:",
                        min: 100,
                        max: 250,
                        value: size,
                        onChange: setSize
                    },
                    {
                        type: "range",
                        title: "Perspective Of Boxes:",
                        min: 100,
                        max: 500,
                        value: perspective,
                        onChange: setPerspective
                    },
                    {
                        type: "range",
                        title: "Width Of Stroke:",
                        min: 0,
                        max: 10,
                        value: width,
                        onChange: setWidth
                    },
                    {
                        type: "checkbox",
                        title: "debug:",
                        value: debug,
                        onChange: setDebug
                    },
                    {
                        type: "checkbox",
                        title: "debug quads:",
                        value: debugQuad,
                        onChange: setDebugQuad
                    }
                ]}
            />
        </div>
    )
}