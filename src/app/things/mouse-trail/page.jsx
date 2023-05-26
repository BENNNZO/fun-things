"use client"

import React, { useState, useEffect } from 'react';

import Dropdown from '@/components/Dropdown';

export default function page() {
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [length, setLength] = useState(75)
    const [size, setSize] = useState(0)
    const [mousePosArr, setMousePosArr] = useState([])

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
    }, [mouseX, mouseY])

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
                    }
                ]}
            />
            <div 
                className='w-screen h-screen bg-sky-900 bg-siz overflow-hidden'
                onMouseMove={e => {setMouseX(e.clientX); setMouseY(e.clientY)}}
                style={{ filter: 'blur(15px) contrast(30)' }}
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
            </div>
        </div>
    )
}