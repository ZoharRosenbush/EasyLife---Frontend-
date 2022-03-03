import React, { useState, useEffect } from 'react';

import { eventBusService } from '../services/eventBusService.js'



export const UserMsg = () => {

    const [msg, setMsg] = useState(null)
    let removeEventBus = null
    let timeoutId = null

    useEffect(() => {
        removeEventBus = eventBusService.on('user-msg', (msg) => {
            setMsg(msg)
            onAutoClose()
        })
        return () => {
            removeEventBus()
            clearTimeout(timeoutId)
        }

    }, [])

    const onAutoClose = () => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            onCloseMsg()
        }, 3000)
    }

    const onCloseMsg = () => {
        clearTimeout(timeoutId)
        setMsg(null)
    }

    return (<>
        {!msg && <></>}
        {msg && <div className={`user-msg ${msg.type}`}>
            <button onClick={onCloseMsg}>&times;</button>
            <p>{msg.txt}</p>
        </div>}
    </>
    )






} 