"use client"

import React, { useState, useEffect } from 'react';

import Dropdown from '@/components/Dropdown';

export default function MouseTrail() {
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [length, setLength] = useState(125)
    const [size, setSize] = useState(10)
    const [mousePosArr, setMousePosArr] = useState([[0, 0]])
    const [svgDimentions, setSvgDimentions] = useState({ x: 0, y: 0 })
    const [filter, setFilter] = useState(100)

    useEffect(() => {
        setMousePosArr(oldArr => {
            oldArr.length > length ? oldArr = oldArr.slice(0, length) : null
            oldArr.unshift([mouseX, mouseY])
            return oldArr
        })
        const mousePosArrInterval = setInterval(() => {
            setMousePosArr(oldArr => {
                oldArr.length > length ? oldArr = oldArr.slice(0, length) : null
                oldArr.unshift([mouseX, mouseY])
                return oldArr
            })
        }, 1);

        // return () => updateMousePosArr()
        return () => clearInterval(mousePosArrInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mouseX, mouseY])

    useEffect(() => {
        setSvgDimentions({ x: window.innerWidth, y: window.innerHeight })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='bg-black'>
            <Dropdown
                trackMouse
                setMouseX={setMouseX}
                setMouseY={setMouseY}
                options={[
                    {
                        type: "range",
                        title: "Length Of Trail:",
                        min: 5,
                        max: 500,
                        value: length,
                        onChange: setLength
                    },
                    {
                        type: "range",
                        title: "Trail Falloff:",
                        min: 0,
                        max: 10,
                        value: size,
                        onChange: setSize
                    },
                    {
                        type: "range",
                        title: "Filter Amount:",
                        min: 0,
                        max: 100,
                        value: filter,
                        onChange: setFilter
                    }
                ]}
            />
            {/* <div 
                className='w-screen h-screen bg-sky-900 bg-siz overflow-hidden'
                onMouseMove={e => {setMouseX(e.clientX); setMouseY(e.clientY)}}
                style={{ filter: `blur(${(filter / 100) * 15}px) contrast(${(filter / 100) * 30 + 1})` }}
            >
                {[...Array(parseInt(length))].map((e, i) => (
                    <span
                        key={i}
                        className='rounded-full bg-white absolute pointer-events-none w-10 h-10'
                        style={{
                            transform: `translate(calc(${mousePosArr[i] === undefined ? 0 : mousePosArr[i][0]}px - 50%), calc(${mousePosArr[i] === undefined ? 0 : mousePosArr[i][1]}px - 50%)) scale(${Math.abs(((i / length) * (size / 10)) - 1)})`,
                            // transitionDuration: `${i / 50}s`
                        }}
                    />
                ))}
            </div> */}
            {/* <p className='text-white'>{JSON.stringify(mousePosArr, null, 4)}</p> */}
            <svg 
                className='w-screen h-screen bg-sky-900 bg-siz overflow-hidden'
                width={svgDimentions.x} height={svgDimentions.y}
                onMouseMove={e => {setMouseX(e.clientX); setMouseY(e.clientY)}}
                style={{ filter: `blur(${(filter / 100) * 15}px) contrast(${(filter / 100) * 30 + 1})` }}
            >
                {mousePosArr.map((e, i) => (
                    <path
                        key={i}
                        d={`M${e[0]} ${e[1]}, L${mousePosArr[i - 1] !== undefined ? mousePosArr[i - 1][0] : e[0]} ${mousePosArr[i - 1] !== undefined ? mousePosArr[i - 1][1] : e[1]}`} 
                        stroke="white"
                        strokeWidth={Math.abs((i / length) * (size / 10) - 1) * 30}
                        strokeLinecap='round'
                        className='pointer-events-none'
                    />
                ))}
                {/* <path
                    fill='transparent'
                    d={`
                        M${mousePosArr[0][0]} ${mousePosArr[0][1]}, 
                        Q${mousePosArr.map((e, i) => {
                            if (i !== 0) {
                                return `${e[0]} ${e[1]}`
                            }
                        }).join(" ")}
                    `} 
                    stroke="white"
                    strokeWidth={30}
                    // strokeWidth={Math.abs((i / length) * (size / 10) - 1) * 30}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='pointer-events-none'
                /> */}
            </svg>
        </div>
    )
}