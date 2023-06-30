"use client"

import React, { useState, useEffect, useRef } from 'react';
import Dropdown from '@/components/Dropdown';

export default function PolyRhythm() {
    /* ---------------------------- screen dimentions --------------------------- */
    const [screen, setScreen] = useState({ width: 0, height: 0 })

    /* ---------------------------- frame controllers --------------------------- */
    const [controlTime, setControlTime] = useState(new Date)
    const [fps, setFps] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [frame, setFrame] = useState(0)

    /* ----------------------------- other variables ---------------------------- */
    const [amount, setAmount] = useState(10)

    useEffect(() => {
        /* --------------- get screen dimentions and update on resize --------------- */
        setScreen({ width: window.innerWidth, height: window.innerHeight })
        // const getScreenDimentions = () => setScreen({ width: window.innerWidth, height: window.innerHeight })

        // window.addEventListener("resize", getScreenDimentions())

        // return () => window.removeEventListener("resize", getScreenDimentions())
        /* ----------------------------- time controller ---------------------------- */
        const frame = setInterval(() => setFrame(frame => frame + 1), 1);

        return () => clearInterval(frame)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => { // update every frame
        setFps(Math.round(1000 / (new Date - controlTime)))
        setSeconds(prev => prev + (new Date - controlTime) / 1000)
        setControlTime(new Date)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frame])

    return (
        <div>
            <p className='relative left-3/4'>Width: {String(screen.width)}</p>
            <p className='relative left-3/4'>Height: {String(screen.height)}</p>
            <p className='relative left-3/4'>FPS: {String(fps)}</p>
            <p className='relative left-3/4'>Seconds: {String(Math.round(seconds * 10) / 10)}</p>
            <p className='relative left-3/4'>Amount: {String(amount)}</p>

            <Dropdown
                options={[
                    {
                        type: "range",
                        title: "Amount:",
                        min: 5,
                        max: 29,
                        value: amount,
                        onChange: setAmount,
                        step: 2
                    }
                ]}
            />

            <div style={{ width: screen.width / 2, height: screen.height / 1.2 }} className='bg-black absolute-center'>
                {[...Array(amount)].map((e, i) => {
                    let yPos = (screen.height / 1.2) / amount * i + ((screen.height / 1.2) / amount / 2)
                    let velocity = (100 * (i + 20)) / 30
                    let distance = seconds * velocity
                    return (
                        <div key={i}>
                            <div 
                                style={{ top: yPos }} 
                                className='absolute w-full h-px bg-red-400'
                            />
                            <div s
                                style={{ top: yPos, left: `${distance % 100}%` }} 
                                className='absolute w-4 h-4 rounded-full bg-sky-400 -translate-x-1/2 -translate-y-1/2' 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}