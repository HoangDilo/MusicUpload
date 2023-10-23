import { useEffect, useState } from 'react'
import GreenTick from '../SVGComponents/GreenTick'
import './ToastMessage.css'
import X from '../SVGComponents/X'

function ToastMessage({ message, type }) {
    const [isShown, setIsShown] = useState(true);
    const handleClose = (status) => {
        setIsShown(status);
    }

    useEffect(() => {
        setTimeout(() => {
            setIsShown(false);
        }, 5000);
    }, [isShown])

    return (
        <>
            {type === 'success' && (isShown &&
                <div className='toast success'>
                    <GreenTick />
                    <span>{message}</span>
                    <X onClick={handleClose} />
                    {/* <div className='icon-greentick icon'></div> */}
                </div>)
            }
        </>
    )
}

export default ToastMessage