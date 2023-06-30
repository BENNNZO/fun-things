"use client"

import React, { useEffect, useState } from 'react'
import Dropdown from '@/components/Dropdown'
import Fly from '@/components/Fly'

export default function PointerSwarm() {
    const [fps, setFps] = useState(0)
    const [frameCount, setFrameCount] = useState(0)
    const [fpsControl, setFpsControl] = useState(new Date)

    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)

    const [amount, setAmount] = useState(50)
    const [speed, setSpeed] = useState(75)
    const [spread, setSpread] = useState(50)
    const [durationArr, setDurationArr] = useState([])

    useEffect(() => {
        const frame = setInterval(() => {
            setFrameCount(frame => frame + 1)
        }, 1);
        return () => clearInterval(frame)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => { // updates every frame
        setFps(1000 / Math.abs(fpsControl - new Date))
        setFpsControl(new Date)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frameCount])

    useEffect(() => {
        setDurationArr([...Array(amount)].map(() => Math.random() * 200 + 200))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount])

    return (
        <div className='bg-gradient-to-tr from-orange-950/10 to-rose-950/10 bg-black'>
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
                    }
                ]}
            />
            {/* <div className='absolute top-3 left-full -translate-x-full whitespace-nowrap w-52'> */}
                {/* <p className='text-xl text-white'>{`Frame: ${String(frameCount)}`}</p> */}
                {/* <p className='text-xl text-white'>{`FPS: ${String(Math.round(fps * 10) / 10)}`}</p> */}
                {/* <p className='text-xl text-white'>{`Mouse_X: ${String(mouseX)}px`}</p> */}
                {/* <p className='text-xl text-white'>{`Mouse_Y: ${String(mouseY)}px`}</p> */}
            {/* </div> */}
            {/* <p className='text-white absolute top-1/2 left-0 text-xl'>{JSON.stringify(durationArr)}</p> */}
            <div 
                className='w-screen h-screen overflow-hidden' 
                onMouseMove={e => {setMouseX(e.clientX); setMouseY(e.clientY)}}
            >
                {[...Array(parseInt(amount))].map((e, i) => {
                    return (
                        <Fly
                            key={i}
                            update={frameCount}
                            timeOffset={(360 / amount) * i}
                            mouseOffset={{ x: mouseX, y: mouseY }}
                            speed={speed / 10}
                            relativeSpread={spread}
                            index={i}
                            total={amount}
                            duration={durationArr[i]}
                        />
                    )
                })}
            </div>
        </div>
    )
}