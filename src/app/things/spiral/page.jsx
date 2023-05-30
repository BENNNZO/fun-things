"use client"

import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown';

export default function page() {
    const [amount, setAmount] = useState(100);
    const [offset, setOffset] = useState(10000);
    const [speed, setSpeed] = useState(100);
    const [dots, setDots] = useState(false);
    const [screenDim, setScreenDim] = useState({ width: 0, height: 0 });


    useEffect(() => {
        setScreenDim({ width: window.innerWidth, height: innerHeight })
        const offsetInterval = setInterval(() => {
            setOffset(prev => prev + (speed / 10))
        }, 25);
        return () => clearInterval(offsetInterval)
    }, []);

    return (
        <div className='bg-black w-screen h-screen relative'>
            <Dropdown 
                options={[
                    {
                        type: "range",
                        title: "Amount:",
                        min: 10,
                        max: 300,
                        value: amount,
                        onChange: setAmount

                    },
                    {
                        type: "range",
                        title: "Speed:",
                        min: -100,
                        max: 100,
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
            <p className='absolute top-0 right-10 text-3xl text-white'>Offset: {String(offset)}</p>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                {dots ? (
                    [...Array(parseInt(amount))].map((e, i) => {
                        return (
                            <div
                                key={i}
                                className='w-4 h-4 bg-white absolute rounded-full transition-transform ease-out duration-300'
                                style={{
                                    // top: `${Math.sin(((360 / parseInt(amount)) * i) * (Math.PI / 180)) * 100}px`,
                                    // left: `${Math.cos(((360 / parseInt(amount)) * i) * (Math.PI / 180)) * 100}px`,
                                    transform: `translate(
                                        ${Math.sin(((360 / parseInt(amount)) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 5)}px,
                                        ${Math.cos(((360 / parseInt(amount)) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 5)}px
                                    )`
                                }}
                            />              
                        )
                    })
                ) : (
                    <div className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <svg width={1} height={1} className='top-1/2 left-1/2 overflow-visible z-10'>
                            <path 
                                d={`
                                    M0 0
                                    C${[...Array(parseInt(amount))].map((e, i) => {
                                        return (`
                                            ${Math.sin(((360 / parseInt(amount)) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 3)}
                                            ${Math.cos(((360 / parseInt(amount)) * (i * (offset / 100))) * (Math.PI / 180)) * (i * 3)}
                                        `)
                                    }).join(" ")}
                                `}
                                stroke='white'
                                strokeWidth={2}
                            />
                        </svg>  
                    </div>
                )}
            </div>
        </div>
    )
}
