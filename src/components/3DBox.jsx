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
    const [top, setTop] = useState("hsl(50, 50%, 50%)")
    const [left, setLeft] = useState("hsl(50, 50%, 50%)")
    const [right, setRight] = useState("hsl(50, 50%, 50%)")
    const [bottom, setBottom] = useState("hsl(50, 50%, 50%)")
    const [front, setFront] = useState("hsl(50, 50%, 50%)")

    const ref = useRef()

    // let top = "rgb(220, 220, 220)",
    //     left = "rgb(180, 180, 180)",
    //     right = "rgb(150, 150, 150)",
    //     bottom = "rgb(100, 100, 100)",
    //     front = "rgb(125, 125, 125)"

    useEffect(() => {
        let distFrom0 = getHypot(ref.current.offsetTop, ref.current.offsetLeft)
        let mainHypot = getHypot(window.innerWidth, window.innerHeight)
        setA(props.size / 4)
        setXCalc(distX * -(props.size / 4) * props.p)
        setYCalc(distY * -(props.size / 4) * props.p)
        setDist(getHypot(props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2)), props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))))
        setDistX(((props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2))) / (Math.abs(props.dim.mid[0] - (screenDim.width / 2)) + screenDim.width)) * props.length) // get X dist relative to cursor
        setDistY(((props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))) / (Math.abs(props.dim.mid[1] - (screenDim.height / 2)) + screenDim.height)) * props.length) // get Y dist relative to cursor
        setTop(`hsl(${(distFrom0 / mainHypot) * 360} 50% 75%)`)
        setLeft(`hsl(${(distFrom0 / mainHypot) * 360} 50% 70%)`)
        setRight(`hsl(${(distFrom0 / mainHypot) * 360} 50% 60%)`)
        setBottom(`hsl(${(distFrom0 / mainHypot) * 360} 50% 50%)`)
        setFront(`hsl(${(distFrom0 / mainHypot) * 360} 50% 60%)`)
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
            <div ref={ref} className='relative drop-shadow-md'>
                {/* <p className='text-3xl text-white font-bold absolute top-0 left-0 z-10'>{`[${Math.round(distX * 100) / 100}, ${Math.round(distY * 100) / 100}]`}</p> */}
                <svg 
                    width={props.size} 
                    height={props.size} 
                    className='overflow-visible absolute -translate-x-1/2 -translate-y-1/2' 
                    // className='overflow-visible absolute -translate-x-1/2 -translate-y-1/2 top-0 left-0' 
                    style={{ left: `${distX * (props.size / 4)}px`, top: `${distY * (props.size / 4)}px` }}
                    // fill="transparent"
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
                        strokeWidth={1}
                        strokeLinecap="round"
                        strokeLinejoin='round'
                    >
                        <path fill={front} stroke={front} d={`M${a} ${a} L${a * 3} ${a} ${a * 3} ${a * 3} ${a} ${a * 3} ${a} ${a}`} />
                        {quad === 1 ? (
                            <>
                                <path
                                    fill={left}
                                    stroke={left}
                                    d={`
                                        M${a} ${a * 3}
                                        L${xCalc + a} ${yCalc + (a * 3)}
                                         ${xCalc + a} ${yCalc + a}
                                         ${a} ${a}
                                    `}
                                />
                                <path
                                    fill={top}
                                    stroke={top}
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
                                    stroke={right}
                                    d={`
                                        M${a * 3} ${a * 3}   
                                        L${xCalc + (a * 3)} ${yCalc + (a * 3)}
                                         ${xCalc + (a * 3)} ${yCalc + a}
                                         ${a * 3} ${a}
                                    `}
                                />
                                <path
                                    fill={top} 
                                    stroke={top}
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
                                    stroke={bottom}
                                    d={`
                                        M${a} ${a * 3}       
                                        L${xCalc + a} ${yCalc + (3 * a)}
                                         ${xCalc + (3 * a)} ${yCalc + (3 * a)}
                                         ${a * 3} ${a * 3}
                                    `}
                                />
                                <path
                                    fill={right}
                                    stroke={right}
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
                                    stroke={left}
                                    d={`
                                        M${a} ${a}           
                                        L${xCalc + a} ${yCalc + a}
                                         ${xCalc + a} ${yCalc + (3 * a)}
                                         ${a} ${a * 3}
                                    `}
                                />
                                <path
                                    fill={bottom}
                                    stroke={bottom}
                                    d={`
                                        M${a * 3} ${a * 3}   
                                        L${xCalc + (3 * a)} ${yCalc + (3 * a)}
                                         ${xCalc + a} ${yCalc + (3 * a)}
                                         ${a} ${a * 3}
                                    `} 
                                />
                            </>
                        )}
                    </g>
                </svg>
            </div>
        </>
    )
}