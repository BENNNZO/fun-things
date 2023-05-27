"use client"

import { sendStatusCode } from 'next/dist/server/api-utils';
import React, { useRef, useEffect, useState } from 'react';

export default function Box(props) {
    const [a, setA] = useState(0)
    const [dist, setDist] = useState(0)
    const [distX, setDistX] = useState(0)
    const [distY, setDistY] = useState(0)
    const [quad, setQuad] = useState(0)
    const [screenDim, setScreenDim] = useState({ width: 0, height: 0 })
    const [debugLoad, setDebugLoad] = useState(false)

    const ref = useRef()

    let color = "white"

    useEffect(() => {
        setA(props.size / 4)
        setDist(getHypot(props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2)), props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))))
        setDistX((props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2))) / props.dim.mid[0]) // get X dist relative to cursor
        setDistY((props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))) / props.dim.mid[1]) // get Y dist relative to cursor
        if (ref.current.offsetTop < props.dim.mid[1] && ref.current.offsetLeft < props.dim.mid[0]) { //  this tells you what quad the cube is in
            setQuad(1)
        } else if (ref.current.offsetTop < props.dim.mid[1] && ref.current.offsetLeft > props.dim.mid[0]) {
            setQuad(2)
        } else if (ref.current.offsetTop > props.dim.mid[1] && ref.current.offsetLeft > props.dim.mid[0]) {
            setQuad(3)
        } else if (ref.current.offsetTop > props.dim.mid[1] && ref.current.offsetLeft < props.dim.mid[0]) {
            setQuad(4)
        }
        console.log(ref)
    }, [props.size, props.dim])

    useEffect(() => {
        setScreenDim({width: window.innerWidth, height: window.innerHeight})
    }, [])

    useEffect(() => {
        if (props.debug) setDebugLoad(true)
    }, [props.debug])

    function getHypot(a, b) { // get hypotenous (I don't know how to spella)
        return Math.sqrt((a * a) + (b * b))
    }

    return (
        <>
            <div ref={ref} className='relative'>
                {/* <p className='text-3xl text-white font-bold'>{String(quad)}</p> */}
                <svg width={props.size} height={props.size} className='overflow-visible absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2' fill='black'>
                    <span
                        // this span isnt for anything but this comment
                        // i don't think ill every be able to explain what im doing very good i mean i barely understand what im doing
                        // d={`M0 0 L75 0 75 75 0 75 0 0`}
                        // using [a] variable centers the path on the svg according to the size

                        // a = | or __
                        // |
                        // |
                        // |
                        // |__ __ __ __

                        // (a, a) ---> (a * 3, a)
                        //     ^           |
                        //     |           |
                        //     |           |
                        //     |           V
                        // (a, a*3) <- (a*3, a*3)

                        //   [ QUADRANTS ]
                        // 
                        //         |
                        //     1   |   2
                        // ________|________
                        //         |
                        //     4   |   3
                        //         |
                        // 
                    />
                    <g 
                        stroke={`${
                            debugLoad === true && quad === 1 ? "red" :
                            debugLoad === true && quad === 2 ? "yellow" : 
                            debugLoad === true && quad === 3 ? "blue" : 
                            debugLoad === true && quad === 4 ? "green" : "white"
                        }`}
                        strokeWidth={props.width}
                        strokeLinecap="round"
                        strokeLinejoin='round'
                    >
                        {quad === 1 ? (
                            <>
                                <path d={`M${a} ${a * 3}       L${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${a} ${a}           L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`} />
                                <path d={`M${a * 3} ${a}       L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`} />
                                <path d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}   L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`} />
                                <path d={`M${Math.abs((distX * a) - a)} ${(a) - (distY * a)}       L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`} />
                            </>
                        ) : quad === 2 ? (
                            <>
                                <path d={`M${a * 3} ${a * 3}   L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${a} ${a}           L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`} />
                                <path d={`M${a * 3} ${a}       L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`} />
                                <path d={`M${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}   L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${Math.abs((distX * a) - a)} ${(a) - (distY * a)}       L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`} />
                            </>
                        ) : quad === 3 ? (
                            <>
                                <path d={`M${a} ${a * 3}       L${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${a * 3} ${a * 3}   L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${a * 3} ${a}       L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`} />
                                <path d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}   L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}       L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`} />
                            </>
                        ) : (
                            <>
                                <path d={`M${a} ${a * 3}       L${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${a} ${a}           L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`} />
                                <path d={`M${a * 3} ${a * 3}   L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`} />
                                <path d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}   L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`} />
                                <path d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}   L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`} />
                            </>
                        )}
                        <path d={`M${a} ${a} L${a * 3} ${a} ${a * 3} ${a * 3} ${a} ${a * 3} ${a} ${a}`} />
                    </g>
                </svg>
            </div>        
            {debugLoad && dist < 500 ? (
                <svg width={screenDim.width} height={screenDim.height} className="absolute top-0 left-0 opacity-10" >
                    <path
                        d={`M${ref.current.offsetLeft} ${ref.current.offsetTop} L${props.dim.mid[0]} ${props.dim.mid[1]}`}
                        stroke="white"
                        strokeWidth={2}
                    />
                    <path
                        d={`M${ref.current.offsetLeft} ${ref.current.offsetTop} L${ref.current.offsetLeft} ${props.dim.mid[1]}`}
                        stroke="salmon"
                        strokeWidth={2}
                    />
                    <path
                        d={`M${ref.current.offsetLeft} ${props.dim.mid[1]} L${props.dim.mid[0]} ${props.dim.mid[1]}`}
                        stroke="lime"
                        strokeWidth={2}
                    />
                </svg>
            ) : null}
        </>
    )
}