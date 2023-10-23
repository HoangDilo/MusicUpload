import './Upload.css'
import CurrentStepIcon from '../SVGComponents/CurrentStepIcon'
import GrayCircle from '../SVGComponents/GrayCircle'
import { useState } from 'react'

function Upload({ setStep, setFileInput }) {
    const [status, setStatus] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragEnter = () => {
        setIsDragOver(true);
    }
    const handleDragLeave = () => {
        setIsDragOver(false)
    }
    const handleDragOver = (event) => {
        event.preventDefault();
    }
    const handleDrop = (event) => {
        setIsDragOver(false);
        event.preventDefault();
        const name = [...event.dataTransfer.files][0].name;
        const extension = name.split('.').pop();
        if ((extension == 'mp3' || extension == 'wav') && [...event.dataTransfer.files][0].size <= 100000000) {
            //console.log(event.dataTransfer.files);
            setFileInput([...event.dataTransfer.files][0]);
            setStep(2);
        } else {
            setStatus('error');
        }
    }
    const handleChange = () => {
        const file = event.target.files[0];
        const name = file.name;
        const extension = name.split('.').pop();
        if ((extension === 'mp3' || extension === 'wav') && file.size <= 100000000) {
            setFileInput(file);
            setStep(2);
        } else {
            setStatus('error');
        }
    }

    return (
        <div>
            {/* <div className={style['upload-container']}> */}
            <div className="upload-container">
                <div className='title'>
                    Upload your music
                </div>
                <div className='process-bar-1'>
                    <div className='element'>
                        <div className='bar'>
                            <div className='left-space-icon'>
                                <CurrentStepIcon />
                            </div>
                            <div className='line gray-background'></div>
                        </div>
                        <div className='current process-text'>
                            Upload your music
                        </div>
                    </div>

                    <div className='element'>
                        <div className='bar'>
                            <div className='line gray-background'></div>
                            <GrayCircle />
                            <div className='line gray-background'></div>
                        </div>
                        <div className='process-text gray-text'>
                            Edit Information
                        </div>
                    </div>

                    <div className='element'>
                        <div className='bar'>
                            <div className='line gray-background'>
                            </div>
                            <div className='right-space-icon'>
                                <GrayCircle />
                            </div>
                        </div>
                        <div className='process-text gray-text'>
                            Processing
                        </div>
                    </div>
                </div>
                <div className={`container-1 ${status}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={event => handleDragOver(event)} onDrop={event => handleDrop(event)}>
                    {isDragOver ? <div className='drop-here'>
                        <span>Drop file here...</span>
                    </div> :
                        <div className='drop-area' >
                            <div className='title-drag-drop'>
                                Drag & Drop your track here
                            </div>
                            <label htmlFor="fileInput" className='button-input-file'>or choose file to upload</label>
                            <input type="file" name="fileInput" id="fileInput" className='input-file' hidden onChange={handleChange} />
                            <div className='hints gray-text'>
                                <span>Only accept types: mp3, wav</span>
                                <span>Max size: 100mb</span>
                            </div>
                        </div>}
                </div>
            </div>
            {/* <div className='icon-greentick icon'></div> */}
            {status === 'error' &&
                <div className='error-message'>
                    Your uploaded file is invalid. Type must be mp3 or wav and the max size is 100mb
                </div>
            }
        </div>
    )
}

export default Upload