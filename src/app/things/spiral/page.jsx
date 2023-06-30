"use client"

import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';

export default function Spiral() {
    const [amount, setAmount] = useState(300);
    const [offset, setOffset] = useState(0);
    const [speed, setSpeed] = useState(5);
    const [dots, setDots] = useState(false);
    const [screenDim, setScreenDim] = useState({ width: 0, height: 0 });


    useEffect(() => {
        setScreenDim({ width: window.innerWidth, height: innerHeight })
        const offsetInterval = setInterval(() => {
            setOffset(prev => prev + (speed / 2))
        }, 25);
        return () => clearInterval(offsetInterval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speed]);

    return (
        <div className='bg-black w-screen h-screen relative'>
            <Dropdown 
                options={[
                    {
                        type: "range",
                        title: "Amount:",
                        min: 10,
                        max: 500,
                        value: amount,
                        onChange: setAmount

                    },
                    {
                        type: "range",
                        title: "Speed:",
                        min: -10,
                        max: 10,
                        value:speed,
                        onChange: setSpeed

                    },
                    {
                        type: "checkbox",
                        title: "Dots:",
                        value: dots,
                        onChange: setDots

                    }
                ]}
            />
            {/* <p className='absolute top-0 right-10 text-3xl text-white'>Offset: {String(offset)}</p> */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                {dots ? (
                    [...Array(parseInt(amount))].map((e, i) => {
                        return (
                            <div
                                key={i}
                                className='w-1 h-1 bg-white/50 absolute rounded-full transition-transform ease-out duration-300'
                                style={{
                                    // top: `${Math.sin(((360 / parseInt(amount)) * i) * (Math.PI / 180)) * 100}px`,
                                    // left: `${Math.cos(((360 / parseInt(amount)) * i) * (Math.PI / 180)) * 100}px`,
                                    transform: `translate(
                                        ${Math.sin(((360 / parseInt(amount)) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 8)}px,
                                        ${Math.cos(((360 / parseInt(amount)) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 8)}px
                                    )`
                                }}
                            />              
                        )
                    })
                ) : (
                    <svg width={1} height={1} className='overflow-visible z-10'>
                        <path 
                            d={`
                                M0 0
                                L${[...Array(parseInt(amount))].map((e, i) => {
                                    return (`
                                        ${(Math.sin(((360 / 100) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 8))}
                                        ${(Math.cos(((360 / 100) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 8))}
                                    `)
                                }).join(" ")}
                            `}
                            stroke='white'
                            strokeWidth={0.4}
                            fill='transparent'
                        />
                    </svg>  
                )}
            </div>
        </div>
    )
}
