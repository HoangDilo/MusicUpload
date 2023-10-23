import './FinalStep.css'
import CheckedIcon from '../SVGComponents/CheckedIcon'
import CurrentStepIcon from '../SVGComponents/CurrentStepIcon'
import CopyIcon from '../SVGComponents/CopyIcon'
import GreenTick from '../SVGComponents/GreenTick'
import { useState } from 'react'

function FinalStep({ title, artist, duration, genre, url, imgSrc, setStep, setToastMessage }) {
    const [isCoppied, setIsCoppied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setIsCoppied(true);
        setTimeout(() => {
            setIsCoppied(false);
        }, 5000);
    }

    return (
        <div className='final-container'>
            <div className='title'>
                Upload your music
            </div>
            <div className='process-bar-1'>
                <div className='element'>
                    <div className='bar'>
                        <div className='left-space-icon'>
                            <div className='icon-container'>
                                <CheckedIcon />
                            </div>
                        </div>
                        <div className='line orange-background'></div>
                    </div>
                    <div className='process-text gray-text'>
                        Upload your music
                    </div>
                </div>
                <div className='element'>
                    <div className='bar'>
                        <div className='line orange-background'></div>
                        <div className='icon-container'>
                            <CheckedIcon />
                        </div>
                        <div className='line orange-background'></div>
                    </div>
                    <div className='process-text gray-text'>
                        Edit Information
                    </div>
                </div>
                <div className='element'>
                    <div className='bar'>
                        <div className='line orange-background'></div>
                        <div className='right-space-icon'>
                            <div className='icon-container'>
                                <CurrentStepIcon />
                            </div>
                        </div>
                    </div>
                    <div className='process-text current'>
                        Processing
                    </div>
                </div>
            </div>
            <div className='final-box'>
                <div className='img-container'>
                    <img src={imgSrc} className='final-img' />
                </div>
                <div className='result'>
                    <div className='notify'>
                        Congratulation, you&apos;ve uploaded successfully !
                    </div>
                    <div className='song-info'>
                        <div className='song-singer'>
                            {`${title} - ${artist ? artist : 'N/A'}`}
                        </div>
                        <div className='duration-genre'>
                            <span className='gray-text'>{duration}</span>
                            <span className='gray-text'>{genre}</span>
                        </div>
                    </div>
                    <div className='link-container-container'>
                        <div className='link-container'>
                            <div className='icon-container-2' onClick={handleCopy}>
                                <CopyIcon />
                            </div>
                            <div className='linkSong'>
                                <a href={url} target='_blank' rel="noreferrer">{url}</a>
                            </div>
                        </div>
                        {isCoppied && <GreenTick />}
                    </div>
                </div>
            </div>
            <div className='nav-links'>
                <span className='links' onClick={() => { setStep(1) }}>Go Home</span>
                <span> or </span>
                <span className='links' onClick={() => { setStep(1) }}>Upload another track</span>
            </div>
        </div>
    )
}

export default FinalStep