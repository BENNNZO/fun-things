import React, { useState, useEffect } from 'react'

export default function(props) {
    const [duration, setDuration] = useState((1000 / parseInt(props.total)) * props.index + 500)

    const [yOffset, setYOffset] = useState(Math.random() * 3 + 5)
    const [xOffset, setXOffset] = useState(Math.random() * 10 + 5)
    const [yOffset2, setYOffset2] = useState(5)
    const [xOffset2, setXOffset2] = useState(5)

    const [speed, setSpeed] = useState(0)
    const [speed2, setSpeed2] = useState(0)
    // const [speed, setSpeed] = useState(0)

    useEffect(() => {
        let date = new Date

        setYOffset(Math.sin(((date / speed) + props.timeOffset) * (Math.PI / 180)))
        setXOffset(-Math.cos(((date / speed) + props.timeOffset) * (Math.PI / 180)))
        setYOffset2(Math.sin(((date * speed2) + props.timeOffset) * (Math.PI / 180)))
        setXOffset2(Math.cos(((date * speed2) + props.timeOffset) * (Math.PI / 180)))
    }, [props.update])

    useEffect(() => {
        setSpeed(Math.random() * props.speed + props.speed)
        setSpeed2((Math.random() * props.speed + props.speed) / 100)
    }, [props.speed])

    useEffect(() => {
        setDuration((1000 / parseInt(props.total)) * props.index + 500)
    }, [props.total])

    return (
        <div
            className='w-1 h-1 bg-white rounded-full absolute transition-transform ease-out'
            style={{ 
                transform: `translate(calc(${(xOffset * 300) + (xOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + props.mouseOffset.x}px - 50%), calc(${(yOffset * 300) + (yOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + props.mouseOffset.y}px - 50%))`,
                transitionDuration: `${duration}ms`
            }}
        />
    )
}