"use client"

import React, { useRef, useEffect, useState } from 'react';

export default function Box(props) {
    const [a, setA] = useState(0)
    const [xCalc, setXCalc] = useState(0)
    const [yCalc, setYCalc] = useState(0)
    const [dist, setDist] = useState(0)
    const [distX, setDistX] = useState(0)
    const [distY, setDistY] = useState(0)
    const [quad, setQuad] = useState(0)
    const [screenDim, setScreenDim] = useState({ width: 0, height: 0 })
    const [debugLoad, setDebugLoad] = useState(false)
    const [debugLoadQuads, setDebugLoadQuads] = useState(false)

    const ref = useRef()

    let top = "rgb(220, 220, 220)",
        left = "rgb(180, 180, 180)",
        right = "rgb(150, 150, 150)",
        bottom = "rgb(100, 100, 100)",
        front = "rgb(125, 125, 125)"

    useEffect(() => {
        setA(props.size / 4)
        setXCalc(distX * -(props.size / 4) * props.p)
        setYCalc(distY * -(props.size / 4) * props.p)
        setDist(getHypot(props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2)), props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))))
        // setDistX((props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2))) / props.dim.mid[0]) // get X dist relative to cursor
        // setDistX((props.dim.mid[0])) // get X dist relative to cursor
        setDistX(((props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2))) / (Math.abs(props.dim.mid[0] - (screenDim.width / 2)) + screenDim.width)) * props.length) // get X dist relative to cursor
        setDistY(((props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))) / (Math.abs(props.dim.mid[1] - (screenDim.height / 2)) + screenDim.height)) * props.length) // get Y dist relative to cursor
        if (ref.current.offsetTop < props.dim.mid[1] && ref.current.offsetLeft < props.dim.mid[0]) { //  this tells you what quad the cube is in
            setQuad(1)
        } else if (ref.current.offsetTop < props.dim.mid[1] && ref.current.offsetLeft > props.dim.mid[0]) {
            setQuad(2)
        } else if (ref.current.offsetTop > props.dim.mid[1] && ref.current.offsetLeft > props.dim.mid[0]) {
            setQuad(3)
        } else if (ref.current.offsetTop > props.dim.mid[1] && ref.current.offsetLeft < props.dim.mid[0]) {
            setQuad(4)
        }
    }, [props.size, props.dim])

    useEffect(() => {
    }, [props.size])

    useEffect(() => {
        setScreenDim({width: window.innerWidth, height: window.innerHeight})
    }, [])

    useEffect(() => {
        if (props.debug === true) setDebugLoad(true)
        if (props.debugQuad === true) setDebugLoadQuads(true)
    }, [props.debug])

    function getHypot(a, b) { // get hypotenous (I don't know how to spella)
        return Math.sqrt((a * a) + (b * b))
    }

    return (
        <>
            <div ref={ref} className='relative'>
                {/* <p className='text-3xl text-white font-bold absolute top-0 left-0 z-10'>{`[${Math.round(distX * 100) / 100}, ${Math.round(distY * 100) / 100}]`}</p> */}
                <svg 
                    width={props.size} 
                    height={props.size} 
                    className='overflow-visible absolute -translate-x-1/2 -translate-y-1/2' 
                    // className='overflow-visible absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0' 
                    style={{ left: `${distX * (props.size / 4)}px`, top: `${distY * (props.size / 4)}px` }}
                    fill="transparent"
                >
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
                            debugLoadQuads === true && quad === 1 ? "red" :
                            debugLoadQuads === true && quad === 2 ? "yellow" : 
                            debugLoadQuads === true && quad === 3 ? "blue" : 
                            debugLoadQuads === true && quad === 4 ? "green" : "white"
                        }`}
                        strokeWidth={props.width}
                        // strokeWidth={5}
                        strokeLinecap="round"
                        strokeLinejoin='round'
                        fill='gray'
                    >
                        {quad === 1 ? (
                            <>
                                <path
                                    fill={left}
                                    d={`
                                        M${a} ${a * 3}
                                        L${xCalc + a} ${yCalc + (a * 3)}
                                         ${xCalc + a} ${yCalc + a}
                                         ${a} ${a}
                                    `}
                                />
                                <path
                                    fill={top}
                                    d={`
                                        M${a} ${a}
                                        L${xCalc + a} ${yCalc + a}
                                         ${xCalc + (3 * a)} ${yCalc + a}
                                         ${3 * a} ${a}
                                    `}
                                />
                            </>
                        ) : quad === 2 ? (
                            <>
                                <path
                                    fill={right} 
                                    d={`
                                        M${a * 3} ${a * 3}   
                                        L${xCalc + (a * 3)} ${yCalc + (a * 3)}
                                         ${xCalc + (a * 3)} ${yCalc + a}
                                         ${a * 3} ${a}
                                    `}
                                />
                                <path
                                    fill={top} 
                                    d={`
                                        M${a} ${a}           
                                        L${xCalc + a} ${yCalc + a}
                                        ${xCalc + (a * 3)} ${yCalc + a}
                                        ${a * 3} ${a}
                                    `}
                                />
                            </>
                        ) : quad === 3 ? (
                            <>
                                <path
                                    fill={bottom}
                                    d={`
                                        M${a} ${a * 3}       
                                        L${xCalc + a} ${yCalc + (3 * a)}
                                         ${xCalc + (3 * a)} ${yCalc + (3 * a)}
                                         ${a * 3} ${a * 3}
                                    `}
                                />
                                <path
                                    fill={right}
                                    d={`
                                        M${a * 3} ${a}       
                                        L${xCalc + (3 * a)} ${yCalc + a}
                                         ${xCalc + (3 * a)} ${yCalc + (a * 3)}
                                         ${a * 3} ${a * 3}
                                    `}
                                />
                            </>
                        ) : (
                            <>
                                <path
                                    fill={left}
                                    d={`
                                        M${a} ${a}           
                                        L${xCalc + a} ${yCalc + a}
                                         ${xCalc + a} ${yCalc + (3 * a)}
                                         ${a} ${a * 3}
                                    `}
                                />
                                <path
                                    fill={bottom}
                                    d={`
                                        M${a * 3} ${a * 3}   
                                        L${xCalc + (3 * a)} ${yCalc + (3 * a)}
                                         ${xCalc + a} ${yCalc + (3 * a)}
                                         ${a} ${a * 3}
                                    `} 
                                />
                            </>
                        )}
                        <path fill={front} d={`M${a} ${a} L${a * 3} ${a} ${a * 3} ${a * 3} ${a} ${a * 3} ${a} ${a}`} />
                    </g>
                </svg>
            </div>        
            {debugLoad === true && dist < 500 ? (
                <>
                    <svg width={screenDim.width} height={screenDim.height} className="absolute top-0 left-0 opacity-10" >
                        <path
                            d={`M${ref.current.offsetLeft - (ref.current.offsetLeft / 2)} ${ref.current.offsetTop - (ref.current.offsetTop / 2)} L${props.dim.mid[0]} ${props.dim.mid[1]}`}
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
                        <path
                            d={`M0 ${props.dim.mid[1]} L${screenDim.width} ${props.dim.mid[1]}`}
                            stroke="red"
                            strokeWidth={2}
                        />
                        <path
                            d={`M${props.dim.mid[0]} 0 L${props.dim.mid[0]} ${screenDim.height} `}
                            stroke="green"
                            strokeWidth={2}
                        />
                    </svg>
                </>
            ) : null}
        </>
    )
}