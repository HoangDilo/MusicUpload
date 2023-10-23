import { useEffect, useState } from 'react'
import GreenTick from '../SVGComponents/GreenTick'
import './ToastMessage.css'
import X from '../SVGComponents/X'

function ToastMessage({ message, type, shown, setShown }) {

    useEffect(() => {
        setTimeout(() => {
            setShown(false);
        }, 5000);
    }, [shown])

    return (
        <>
            {shown &&
                <div className={`toast ${type}`}>
                    {type === 'success' && <GreenTick color="#1AB232"/>}
                    {type === 'fail' && <GreenTick color="#FF4040" />}
                    <span>{message}</span>
                    <X onClick={() => setShown(false)} />
                    {/* <div className='icon-greentick icon'></div> */}
                </div>
            }
        </>
    )
}

export default ToastMessage