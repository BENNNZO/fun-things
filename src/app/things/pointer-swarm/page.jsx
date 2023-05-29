"use client"

import React, { useEffect, useState } from 'react'
import Dropdown from '@/components/Dropdown'
import Fly from '@/components/Fly'

export default function() {
    const [fps, setFps] = useState(0)
    const [frameCount, setFrameCount] = useState(0)
    const [fpsControl, setFpsControl] = useState(new Date)

    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)

    const [amount, setAmount] = useState(10)
    const [speed, setSpeed] = useState(75)
    const [spread, setSpread] = useState(50)

    const [filter, setFilter] = useState(100)

    useEffect(() => {
        const frame = setInterval(() => {
            setFrameCount(frame => frame + 1)
        }, 1);
        return () => clearInterval(frame)
    }, [])

    useEffect(() => { // updates every frame
        setFps(1000 / Math.abs(fpsControl - new Date))
        setFpsControl(new Date)
    }, [frameCount])

    return (
        <div className='bg-black'>
            <Dropdown
                trackMouse
                setMouseX={setMouseX}
                setMouseY={setMouseY}
                options={[
                    {
                        type: "range",
                        title: "Amount:",
                        min: 10,
                        max: 250,
                        value: amount,
                        onChange: setAmount
                    },
                    {
                        type: "range",
                        title: "Speed:",
                        min: 10,
                        max: 100,
                        value: speed,
                        onChange: setSpeed
                    },
                    {
                        type: "range",
                        title: "Relative Spread:",
                        min: 10,
                        max: 200,
                        value: spread,
                        onChange: setSpread
                    },
                    {
                        type: "range",
                        title: "Filter Amount:",
                        min: 10,
                        max: 200,
                        value: filter,
                        onChange: setFilter
                    }
                ]}
            />
            <div className='absolute top-3 left-full -translate-x-full whitespace-nowrap w-52'>
                <p className='text-xl text-white'>{`Frame: ${String(frameCount)}`}</p>
                <p className='text-xl text-white'>{`FPS: ${String(Math.round(fps * 10) / 10)}`}</p>
                <p className='text-xl text-white'>{`Mouse_X: ${String(mouseX)}px`}</p>
                <p className='text-xl text-white'>{`Mouse_Y: ${String(mouseY)}px`}</p>
            </div>
            <div 
                className='bg-sky-900 w-screen h-screen overflow-hidden' 
                onMouseMove={e => {setMouseX(e.clientX); setMouseY(e.clientY)}}
                style={{ filter: `blur(${filter / 100 * 15}px) contrast(${filter / 100 * 30})` }}
            >
                {/* <div
                    className='absolute pointer-events-none transition-transform ease-out duration-1000'
                    style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}
                > */}
                    {[...Array(parseInt(amount))].map((e, i) => (
                        <Fly
                            key={i}
                            update={frameCount}
                            timeOffset={(360 / amount) * i}
                            mouseOffset={{ x: mouseX, y: mouseY }}
                            speed={speed / 10}
                            relativeSpread={spread}
                            index={i}
                            total={amount}
                        />
                    ))}
                {/* </div> */}
            </div>
        </div>
    )
}