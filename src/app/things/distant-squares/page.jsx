"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Dropdown from '@/components/Dropdown';

import DistantSquare from '@/components/DistantSquare';

export default function DistantSquares() {
    const [squares, setSquares] = useState([])
    const [mouseX, setMouseX] = useState(window.innerWidth / 2)
    const [mouseY, setMouseY] = useState(window.innerHeight / 2)

    const [effectRadius, setEffectRadius] = useState(15)
    const [amountOfBoxes, setAmountOfBoxes] = useState(30)
    const [roundness, setRoundness] = useState(20)
    const [invert, setInvert] = useState(false)
    const [filter, setFilter] = useState(50)

    useEffect(() => {
        function genSquares() {
            let squaresMatrix = []
            for (let i = 1; i <= window.innerHeight / (amountOfBoxes * 3); i++) {
                let row = []
                for (let j = 1; j <= window.innerWidth / (amountOfBoxes * 3); j++) {
                    row.push(1)
                }
                squaresMatrix.push(row)
            }
            setSquares(squaresMatrix)
        }

        genSquares()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountOfBoxes])

    return (
        <div className='bg-black'>
            <Dropdown
                trackMouse
                setMouseX={setMouseX}
                setMouseY={setMouseY}
                options={[
                    {
                        type: "range",
                        title: "Cursor Effect Radius:",
                        min: 8,
                        max: 50,
                        value: effectRadius,
                        onChange: setEffectRadius
                    },
                    {
                        type: "range",
                        title: "Size Of Shapes:",
                        min: 15,
                        max: 50,
                        value: amountOfBoxes,
                        onChange: setAmountOfBoxes
                    },
                    {
                        type: "range",
                        title: "Shape Roundness:",
                        min: 0,
                        max: 50,
                        value: roundness,
                        onChange: setRoundness
                    },
                    {
                        type: "range",
                        title: "Filter Amount:",
                        min: 0,
                        max: 100,
                        value: filter,
                        onChange: setFilter
                    }
                    // {
                    //     type: "checkbox",
                    //     title: "Invert:",
                    //     value: invert,
                    //     onChange: setInvert
                    // }
                ]}
            />
            <div 
                className='grid place-items-center h-screen overflow-hidden bg-white' 
                onMouseMove={e => {setMouseX(e.pageX); setMouseY(e.pageY)}}
                style={{ filter: `blur(${(filter / 100) * 15}px) contrast(${(filter / 100) * 30 + 1})` }}
            >
                <div className='flex flex-col gap-5 h-screen justify-around'>
                    {squares.map(e => {
                        return (
                            <div className='flex flex-row w-screen justify-around h-full'>
                                {e.map(e => (
                                    <DistantSquare invert={invert} x={mouseX} y={mouseY} effectRadius={effectRadius} roundness={roundness} />
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}