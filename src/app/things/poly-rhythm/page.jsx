"use client"

import React, { useState, useEffect, useRef } from 'react';
import Dropdown from '@/components/Dropdown';

// import C1 from '@/assets/tones/1.wav'
// import D1 from '@/assets/tones/2.wav'
// import E1 from '@/assets/tones/3.wav'
// import F1 from '@/assets/tones/4.wav'
// import G1 from '@/assets/tones/5.wav'
// import A1 from '@/assets/tones/6.wav'
// import B1 from '@/assets/tones/7.wav'
// import C2 from '@/assets/tones/8.wav'
// import asd from '../../../assets/tones'

export default function page() {
    /* --------------------------------- sounds --------------------------------- */
    // const sounds = [C1, D1, E1, F1, G1, A1, B1, C2]
    
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
    },[])

    useEffect(() => { // update every frame
        setFps(Math.round(1000 / (new Date - controlTime)))
        setSeconds(prev => prev + (new Date - controlTime) / 1000)
        setControlTime(new Date)
    }, [frame])

    function playSound(index) {
        let tone = new Audio('../../../assets/tones/1.wav')
        tone.play()
    }

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
                    if (distance % 100 < 1) {
                        playSound(1)
                    }
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