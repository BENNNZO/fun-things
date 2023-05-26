"use client"

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DistantSquare(props) {
    const ref = useRef()

    const [size, setSize] = useState(50)

    function getHype(a, b) {
        return Math.sqrt((a * a) + (b * b))
    }

    useEffect(() => {
        let hypeA = Math.abs(props.y - (ref.current.offsetTop + (ref.current.clientHeight / 2)))
        let hypeB = Math.abs(props.x - (ref.current.offsetLeft + (ref.current.clientWidth / 2)))
        let hype = getHype(hypeA, hypeB)
        props.invert === false || props.invert === undefined ? (
            setSize(Math.max(0, hype / props.effectRadius - 5))
        ) : (
            setSize(Math.abs(Math.min((hype / (props.effectRadius / 10)) - (props.effectRadius * 3), 0)))
        )
    }, [props.x, props.y])

    return (
        <div 
            className='grid place-items-center relative'
            ref={ref}
        >
            <motion.div
                onClick={() => console.log(ref)}
                className='bg-sky-900 absolute top-1/2 left-1/2 w-1 h-1'
                style={{ scale: size > 75 ? 75 : size, borderRadius: `${props.roundness}%` }}
            >

            </motion.div>
        </div>
    )
}