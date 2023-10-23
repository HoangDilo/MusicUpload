import { useState } from "react"

export default function Inputs({ inputValue, label, required, onChange}) {

    const [isError, setIsError] = useState('');

    const handleTyping = () => {
        setInputValue(event.target.value)
    }
    const validateInput = () => {
        if(!inputValue) {
            setIsError('error');
        } else {
            setIsError('');
        }
    }
    const handleFocusInput = () => {
        setIsError('');
    }

    return (
        <div className='input-container'>
            <label htmlFor={`txt${label}`} className='title-label'>
                {label}
                {required &&
                    <span className="star">*</span>
                }
            </label>
            <input type="text" name={`txt${label}`} id={`txt${label}`} className={isError} maxLength={100} value={inputValue} onChange={(event) => onChange(event)} onBlur={validateInput} onFocus={handleFocusInput}/>
            {isError === 'error' &&
                <span className="img-error-message">
                    This field is required
                </span>
            }
        </div>
    )
}