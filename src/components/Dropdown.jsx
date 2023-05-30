"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Dropdown(props) {
    const { push } = useRouter()

    const [dropdown, setDropdown] = useState(false)

    return (
        <motion.div
            className='absolute top-5 left-5 w-12 h-12 z-10 grid place-items-center'
            onMouseMove={props.trackMouse ? e => { props.setMouseX(e.clientX); props.setMouseY(e.clientY) } : null}
        >
            <motion.div
                className='w-full h-full -translate-y-[1px] px-3 py-4 rounded-full shadow-md bg-slate-600'
                onClick={() => setDropdown(dropdown => !dropdown)}
                whileTap={{ scale: 0.9 }}
            >
                <div className='relative w-full h-full'>
                    <motion.span
                        className='absolute w-full h-0.5 bg-white top-0'
                        animate={dropdown ? { rotate: 45, top: "50%", height: "0.25rem", backgroundColor: "rgb(255, 255, 255)", translateY: "-50%" } : { rotate: 0 }}
                    />
                    <motion.span
                        className='absolute w-full h-0.5 bg-white top-1/2'
                        animate={dropdown ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    />
                    <motion.span
                        className='absolute w-full h-0.5 bg-white top-full'
                        animate={dropdown ? { rotate: -45, top: "50%", height: "0.25rem", backgroundColor: "rgb(255, 255, 255)", translateY: "-50%" } : { rotate: 0 }}
                    />
                </div>
            </motion.div>
            <motion.div className='absolute top-full left-0 w-96'>
                {typeof props.options !== "undefined" && props.options.map((e, i) => (
                    <motion.li
                        key={i}
                        className='list-none px-3 py-1 bg-white rounded-md mt-2 shadow-md w-full grid grid-cols-2 h-8 items-between justify-center'
                        initial={{ opacity: 0, x: -10 }}
                        animate={dropdown ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <p>{e.title}</p>
                        {e.type === "range" ? (
                            <input type="range" min={e.min} max={e.max} value={e.value} onChange={r => e.onChange(parseInt(r.target.value))} />
                        ) : e.type === "checkbox" ? (
                            <input type="checkbox" checked={e.value} onChange={r => e.onChange(r.target.checked)} />
                        ) : (
                            <p>Null / Error [type] may be wrong</p>
                        )}
                    </motion.li>
                ))}
                <motion.li
                    className='list-none px-3 py-1 pointer-events-auto bg-slate-600 cursor-pointer text-white rounded-md mt-2 shadow-md w-24 text-center h-8 items-between justify-center'
                    initial={{ opacity: 0, x: -10 }}
                    animate={dropdown ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: typeof props.options !== "undefined" ? props.options.length * 0.1 : 0.1 }}
                    onClick={() => push('/')}
                >
                    Go Back
                </motion.li>
            </motion.div>
        </motion.div>
    )
}