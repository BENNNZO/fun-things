"use client"

import React, { useRef, useEffect, useState } from 'react';

export default function Box(props) {
    const [a, setA] = useState(0)
    const [dist, setDist] = useState(0)
    const [distX, setDistX] = useState(0)
    const [distY, setDistY] = useState(0)
    const [quad, setQuad] = useState(0)

    const ref = useRef()

    useEffect(() => {
        setA(props.size / 4)
        setDist(getHypot(props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2)), props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))))
        setDistX((props.dim.mid[0] - (ref.current.offsetLeft + (ref.current.clientWidth / 2))) / props.dim.mid[0])
        setDistY((props.dim.mid[1] - (ref.current.offsetTop + (ref.current.clientHeight / 2))) / props.dim.mid[1])
        if (ref.current.offsetTop < props.dim.mid[1] && ref.current.offsetLeft < props.dim.mid[0]) { //  this tells you what quad the cube is in
            setQuad(1)
        } else if (ref.current.offsetTop < props.dim.mid[1] && ref.current.offsetLeft > props.dim.mid[0]) {
            setQuad(2)
        } else if (ref.current.offsetTop > props.dim.mid[1] && ref.current.offsetLeft > props.dim.mid[0]) {
            setQuad(3)
        } else {
            setQuad(4)
        }
        console.log(ref)
    }, [props.size, props.dim])

    function getHypot(a, b) {
        return Math.sqrt((a * a) + (b * b))
    }


    return (
        <div ref={ref} className='relative'>
            {/* <p className='text-3xl text-white font-bold'>{String(quad)}</p> */}
            <svg width={props.size} height={props.size} className='overflow-visible absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2'>
                <path 
                    // d={`M0 0 L75 0 75 75 0 75 0 0`}
                    // using [a] variable centers the path on the svg according to the size
                    d={`M${a} ${a} L${a * 3} ${a} ${a * 3} ${a * 3} ${a} ${a * 3} ${a} ${a}`} 
                    strokeLinecap='round'
                    strokeWidth={props.width}
                    stroke="red"
                />
                {quad === 1 ? (
                    <>
                        <path
                            d={`M${a} ${a * 3} L${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a} ${a} L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a * 3} ${a} L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)} L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${Math.abs((distX * a) - a)} ${(a) - (distY * a)} L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                    </>
                ) : quad === 2 ? (
                    <>
                        <path
                            d={`M${a * 3} ${a * 3} L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a} ${a} L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a * 3} ${a} L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)} L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${Math.abs((distX * a) - a)} ${(a) - (distY * a)} L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                    </>
                ) : quad === 3 ? (
                    <>
                        <path
                            d={`M${a} ${a * 3} L${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a * 3} ${a * 3} L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a * 3} ${a} L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)} L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)} L${(a * 3) - (distX * a)} ${Math.abs((distY * a) - a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                    </>
                ) : (
                    <>
                        <path
                            d={`M${a} ${a * 3} L${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a} ${a} L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${a * 3} ${a * 3} L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)} L${Math.abs((distX * a) - a)} ${(a) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                        <path
                            d={`M${Math.abs((distX * a) - a)} ${(a * 3) - (distY * a)} L${(a * 3) - (distX * a)} ${(a * 3) - (distY * a)}`}
                            strokeLinecap='round'
                            strokeWidth={props.width}
                            stroke="red"
                        />
                    </>
                )}
                {/* <path 
                    d={`M0 0 L75 0 75 75 0 75 0 0`}
                    // using [a] variable centers the path on the svg according to the size
                    // d={`M${a} ${a} L${a * 3} ${a} ${a * 3} ${a * 3} ${a} ${a * 3} ${a} ${a}`} 
                    strokeLinecap='round'
                    strokeWidth={dist / 100}
                    stroke="red"
                /> */}
            </svg>
        </div>
    )
}