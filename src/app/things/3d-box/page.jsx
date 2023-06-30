"use client"

import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';
import Box from '@/components/3DBox'

// this is actuallt pretty cool
// I accidentally made a Autostereogram
// if you cross your eyes the right amount and then focus then so there not blurred the boxed will actually pop out the screen

export default function ThreeDeeBox() {
    const [dim, setDim] = useState({ width: 0, height: 0 })
    const [boxes, setBoxes] = useState([])
    const [amount, setAmount] = useState(250)
    const [size, setSize] = useState(150)
    const [perspective, setPerspective] = useState(150)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [boxLength, setBoxLength] = useState(300)

    useEffect(() => {
        let boxMatrix = []
        for (let i = 0; i < dim.height / amount; i++) {
            let row = []
            for (let i = 0; i < dim.width / amount; i++) {
                row.push(1)
            }
            boxMatrix.push(row)
        }
        setBoxes(boxMatrix)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, dim])

    useEffect(() => {
        const getDim = () => setDim({ width: window.innerWidth, height: window.innerHeight, mid: [window.innerWidth / 2, window.innerHeight / 2] })

        window.addEventListener("resize", getDim())

        return () => window.removeEventListener("resize", getDim())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dim])

    return (
        <div 
            className='w-screen h-screen bg-gradient-to-tr from-emerald-400 to-sky-400 overflow-hidden'
            onMouseMove={e => {setMouseX(e.pageX); setMouseY(e.pageY)}}
        >
            {/* <p className='text-white'>{JSON.stringify(boxes, null, 4)}</p> */}
            {/* <p className='text-white text-3xl'>{String(debug)}</p> */}
            <div className='w-full h-full flex flex-col justify-around'>
                {boxes.map((e, i) => (
                    <div key={i} className='flex flex-row justify-around w-full h-full items-center'>
                        {e.map((e, i) => (
                            <Box
                                key={i}
                                size={size}
                                dim={{ mid: [mouseX, mouseY]}}
                                // dim={{ mid: [500, 500]}}
                                length={boxLength / 100}
                                p={perspective / 100}
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
                        title: "Inward Length:",
                        min: 100,
                        max: 1000,
                        value: boxLength,
                        onChange: setBoxLength
                    },
                    {
                        type: "range",
                        title: "Outward Legnth:",
                        min: 100,
                        max: 1000,
                        value: perspective,
                        onChange: setPerspective
                    }
                ]}
            />
        </div>
    )
}