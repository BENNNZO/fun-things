import { calcLength } from 'framer-motion'
import React, { useState, useEffect, useRef } from 'react'

export default function(props) {
    const ref = useRef()

    const [duration, setDuration] = useState((1000 / parseInt(props.total)) * props.index + 500)

    const [yOffset, setYOffset] = useState(Math.random() * 3 + 5)
    const [xOffset, setXOffset] = useState(Math.random() * 10 + 5)
    const [yOffset2, setYOffset2] = useState(5)
    const [xOffset2, setXOffset2] = useState(5)

    const [speed, setSpeed] = useState(0)
    const [speed2, setSpeed2] = useState(0)
    // const [speed, setSpeed] = useState(0)

    const [screenDim, setScreenDim] = useState({ x: 0, y: 0 })
    const [prevCoords, setPrevCoords] = useState([[0, 0], [0, 0]])

    useEffect(() => { // update every frame
        let date = new Date

        setYOffset(Math.sin(((date / speed) + props.timeOffset) * (Math.PI / 180)))
        setXOffset(-Math.cos(((date / speed) + props.timeOffset) * (Math.PI / 180)))
        setYOffset2(Math.sin(((date * speed2) + props.timeOffset) * (Math.PI / 180)))
        setXOffset2(Math.cos(((date * speed2) + props.timeOffset) * (Math.PI / 180)))

        setScreenDim({ x: window.innerWidth, y: window.innerHeight })
        setPrevCoords(prev => {
            let arr = prev
            if (prev.length > 10) {
                arr = prev.slice(0, 25)
            }
            arr.unshift([ref.current.offsetLeft + (ref.current.clientWidth / 2), ref.current.offsetTop + (ref.current.clientHeight / 2)])
            return arr
        })
    }, [props.update])

    useEffect(() => {
        setSpeed(Math.random() * props.speed + props.speed)
        setSpeed2((Math.random() * props.speed + props.speed) / 100)
    }, [props.speed])

    useEffect(() => {
        setDuration((1000 / parseInt(props.total)) * props.index + 500)
    }, [props.total])

    useEffect(() => {
        console.log(ref)
    }, [ref])

    return (
        <div className='absolute top-0 left-0 w-screen h-screen'>
            <div
                ref={ref}
                className='w-12 h-12 bg-white rounded-full transition-all ease-out absolute'
                style={{ 
                    left: `${(xOffset * 300) + (xOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + props.mouseOffset.x}px`,
                    top: `${(yOffset * 300) + (yOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + props.mouseOffset.y}px`,
                    transform: `translate(-50%), -50%)`,
                    // transform: `translate(calc(${(xOffset * 300) + (xOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + props.mouseOffset.x}px - 50%), calc(${(yOffset * 300) + (yOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + props.mouseOffset.y}px - 50%))`,
                    transitionDuration: `${duration}ms`
                }}
            >
            </div>
            {/* <p className='text-xl text-white'>{JSON.stringify(prevCoords)}</p> */}
            <svg width={screenDim.x} height={screenDim.y} className='absolute top-0 left-0 overflow-visible'>
                {prevCoords.map((e, i) => {
                    if (i !== 0) {
                        return (
                            <path
                                fill='white'
                                // stroke={`rgb(255, 255, 255, ${Math.abs(i / 10)})`}
                                stroke='white'
                                strokeWidth={Math.abs(i - 25)}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d={`
                                    M${Math.round(prevCoords[i - 1][0])} ${Math.round(prevCoords[i - 1][1])}
                                    L${Math.round(e[0])} ${Math.round(e[1])}
                                `}
                            />
                        )
                    }
                })}
                {/* <path 
                    fill='transparent'
                    stroke='white'
                    strokeWidth={12}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d={`
                        M${prevCoords[0][0]} ${prevCoords[0][1]}
                        L${prevCoords.map((e, i) => {
                            if (i !== 0) {
                                return `${e[0]} ${e[1]}`
                            }
                        }).join(" ")}
                    `}
                /> */}
            </svg>
        </div>
    )
}