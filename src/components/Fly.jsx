import React, { useState, useEffect } from 'react'

export default function(props) {
    let duration = props.duration * 25 + 1000

    const [colorOffset, setColorOffset] = useState(0)

    const [yOffset, setYOffset] = useState(Math.random() * 3 + 5)
    const [xOffset, setXOffset] = useState(Math.random() * 10 + 5)
    const [yOffset2, setYOffset2] = useState(5)
    const [xOffset2, setXOffset2] = useState(5)
    const [yOffset3, setYOffset3] = useState(5)
    const [xOffset3, setXOffset3] = useState(5)

    const [speed, setSpeed] = useState(0)
    const [speed2, setSpeed2] = useState(0)
    const [speed3, setSpeed3] = useState(0)

    const [screenDim, setScreenDim] = useState({ width: 0, height: 0 })

    useEffect(() => { // update every frame
        let date = new Date

        setColorOffset(prev => prev + 0.25)

        setYOffset(Math.sin(((date / speed) + props.timeOffset) * (Math.PI / 180)))
        setXOffset(-Math.cos(((date / speed) + props.timeOffset) * (Math.PI / 180)))
        setYOffset2(Math.sin(((date * speed2) + props.timeOffset) * (Math.PI / 180)))
        setXOffset2(Math.cos(((date * speed2) + props.timeOffset) * (Math.PI / 180)))
        setYOffset3(Math.sin(((date * speed3) + props.timeOffset) * (Math.PI / 180)))
        setXOffset3(Math.cos(((date * speed3) + props.timeOffset) * (Math.PI / 180)))
    }, [props.update])

    useEffect(() => {
        setSpeed(Math.random() * props.speed + props.speed)
        setSpeed2((Math.random() * props.speed + props.speed) / 100)
        setSpeed3((Math.random() * props.speed + props.speed) / 200)
    }, [props.speed])

    useEffect(() => {
        setScreenDim({ width: window.innerWidth, height: innerHeight })
    }, [])

    return (
        <div
            className='w-4 h-4 rounded-full transition-transform ease-out absolute'
            style={{ 
                transform: `
                    translate(
                        calc(
                            ${
                                (xOffset * props.duration) + 
                                (xOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + 
                                (xOffset3 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + 
                                props.mouseOffset.x
                            }px - 50%), 
                        calc(
                            ${
                                (yOffset * props.duration) + 
                                (yOffset2 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + 
                                (yOffset3 * (((duration - 500) / 1000) * props.relativeSpread + 2)) + 
                                props.mouseOffset.y
                            }px - 50%)
                    )`,
                transitionDuration: `${duration}ms`,
                backgroundImage: `radial-gradient(rgba(255, 255, 255, 1) 0%, hsl(${Math.abs(((colorOffset + props.index) % 100) - 50)} 50% 50%) 30%, transparent)`,
                boxShadow: `0 0 10px hsl(${Math.abs(((colorOffset + props.index) % 100) - 50)} 50% 50%), 
                            ${(props.mouseOffset.x - (screenDim.width / 2)) / (screenDim.width / 2) * 10}px ${(props.mouseOffset.y - (screenDim.height / 2)) / (screenDim.height / 2) * 10}px 20px hsl(${Math.abs(((colorOffset + props.index) % 100) - 50)} 50% 50%),
                            ${(props.mouseOffset.x - (screenDim.width / 2)) / (screenDim.width / 2) * 20}px ${(props.mouseOffset.y - (screenDim.height / 2)) / (screenDim.height / 2) * 20}px 40px hsl(${Math.abs(((colorOffset + props.index) % 100) - 50)} 50% 50%)`
            }}
        >
        </div>
    )
}