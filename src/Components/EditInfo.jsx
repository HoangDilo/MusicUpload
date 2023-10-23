/* eslint-disable react/prop-types */
import './EditInfo.css'
import CheckedIcon from '../SVGComponents/CheckedIcon'
import CurrentStepIcon from '../SVGComponents/CurrentStepIcon'
import GrayCircle from '../SVGComponents/GrayCircle'
import ArrowDown from '../SVGComponents/ArrowDown'
import ArrowUp from '../SVGComponents/ArrowUp'
import Camera from '../SVGComponents/Camera'
import Spinner from '../SVGComponents/Spinner'
import Selection from './Selection'
import Inputs from './Inputs'
import list_genre from '../assets/ListGenre'
import { useEffect, useState } from 'react'
import { storage } from '../FireBaseConnect/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setLogLevel } from 'firebase/app'

function EditInfo({ fileInput, setStep, setShown1, setShown2, setUrl, setArtistStep3, setTitleStep3, setDurationStep3, setGenreStep3, setImgSrcStep3 }) {
    const [isOk, setIsOk] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [imgInputError, setImgInputError] = useState(false);
    const [isArrowUp, setIsArrowUp] = useState(false);

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [slug, setSlug] = useState('');
    const [optionValue, setOptionValue] = useState('None')
    const [artist, setArtist] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const fileName = fileInput.name.split('.');
        setType(fileName.pop());
        setTitle(fileName);

        calculateDuration();
        setSize(calculateSize(fileInput.size));
        setSlug(calculateSlug(fileName));
    }, [])

    const calculateSlug = (string) => {
        return String(string).toLowerCase().replace(/_/, '-').replace(/\s+/g, '-').replace(/-+/g, '-');
    }

    const calculateDuration = () => {
        const audioClone = document.createElement('audio');
        audioClone.preload = 'metadata';
        audioClone.src = URL.createObjectURL(fileInput);

        audioClone.onloadedmetadata = () => {
            URL.revokeObjectURL(audioClone.src);
            const duration = audioClone.duration;
            const mins = parseInt(duration / 60);
            const secs = parseInt(duration % 60);
            setDuration(`${mins}:${secs}`)
        }
    }

    const calculateSize = (value) => {
        if (value < 1024) {
            return `${value} bytes`
        } else if (value < 1024 * 1024) {
            return `${(value / 1024).toFixed(2)} KB`
        } else if (value < 1024 * 1024 * 1024) {
            return `${(value / (1024 * 1024)).toFixed(2)} MB`
        }
    }

    const handleChangeTextArea = (event) => {
        setTextAreaValue(event.target.value);
    }
    const handleTyping = (event) => {
        setTitle(event.target.value)
    }
    const handleTypingSlug = (event) => {
        setSlug(event.target.value)
    }
    const handleInputImage = (event) => {
        const img = event.target.files[0];
        //console.log(event.target.files[0]);
        if ((img.type === 'image/jpeg' || img.type === 'image/png') && img.size <= 5000000) {
            const img_src = URL.createObjectURL(event.target.files[0]);
            console.log(img_src);
            setImgSrc(img_src);
            setImgInputError(false);
        } else {
            setImgInputError(true);
        }
    }
    const handleClickArrows = () => {
        console.log('click');
        setIsArrowUp(!isArrowUp);
    }
    const handleChose = (event) => {
        setIsArrowUp(!isArrowUp);
        setOptionValue(event.target.innerText)
    }
    const handleCancel = () => {
        setStep(1);
    }
    const handleSave = () => {
        if (title && slug) {
            setIsLoading(true);
            const fileRef = ref(storage, `files/${title}_${configDateTime()}`);
            const uploadTask = uploadBytesResumable(fileRef, fileInput)
            uploadTask.on('state_changed', (snapshot) => {
                console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, (error) => {
                console.log('An error occurs', error);
            }, () => {
                setTitleStep3(title);
                setArtistStep3(artist);
                setDurationStep3(duration);
                setGenreStep3(optionValue);
                setImgSrcStep3(imgSrc)
                setShown1(true);
                getDownloadURL(fileRef).then((url) => {
                    setUrl(url);
                    setStep(3);
                });
            })
        } else {
            console.log('vao else');
            setShown2(true);
        }
    }
    const handleChangeArtist = () => {
        setArtist(event.target.value);
    }
    const configDateTime = () => {
        const datetime = new Date();
        const year = datetime.getFullYear();
        const month = datetime.getMonth();
        const date = datetime.getDate();
        const hour = datetime.getHours();
        const min = datetime.getMinutes();
        const sec = datetime.getSeconds();
        return `${year}${month}${date}_${hour}${min}${sec}`;
    }

    return (
        <div className="edit-container">
            <div className='title'>
                Upload your music
            </div>
            <div className="process-bar-1" >
                <div className='element'>
                    <div className='bar'>
                        <div className="left-space-icon">
                            <div className='icon-container'>
                                <CheckedIcon />
                            </div>
                        </div>
                        <div className='line orange-background'></div>
                    </div>
                    <p className='process-text gray-text'>
                        Upload your music
                    </p>
                </div>
                <div className='element'>
                    <div className='bar'>
                        <div className='line orange-background'></div>
                        <div className='icon-container'>
                            <CurrentStepIcon />
                        </div>
                        <div className='line gray-background'></div>
                    </div>
                    <p className='process-text current'>
                        Edit Information
                    </p>
                </div>
                <div className='element'>
                    <div className='bar'>
                        <div className='line gray-background'></div>
                        <div className='right-space-icon'>
                            <div className='icon-container'>
                                <GrayCircle />
                            </div>
                        </div>
                    </div>
                    <p className='process-text gray-text'>
                        Processing
                    </p>
                </div>
            </div>
            <div className='edit-box'>
                <div className='top-box'>
                    <div>
                        <div className='input-img'>
                            <div className='bg-img-container'>
                                {imgSrc &&
                                    <img src={imgSrc} alt="" className='song-image' />
                                }
                                {!imgSrc &&
                                    <div className='fake-background'></div>
                                }
                            </div>
                            <div className='opt-button'>
                                <label htmlFor='inputImg' className='placeholder-1'>
                                    {imgSrc &&
                                        <span className=''>Replace</span>
                                    }
                                    {!imgSrc &&
                                        <div className='placeholder-1-container'>
                                            <Camera />
                                            <span>
                                                Upload Image
                                            </span>
                                        </div>
                                    }
                                </label>
                                <input type="file" name="inputImg" id="inputImg" onChange={handleInputImage} />
                            </div>
                        </div>
                        {imgInputError &&
                            <div className='img-error-message'>
                                Invalid image. Type must be PNG or JPG
                                and max size is 5MB
                            </div>}
                    </div>

                    <div className='form'>
                        <Inputs inputValue={title} label="Title" required onChange={handleTyping} />
                        <div className='fixed-properties'>
                            <div className='input-container'>
                                <div className='props-title'>
                                    Duration
                                </div>
                                <div className='props-values'>
                                    {duration}
                                </div>
                            </div>
                            <div className='input-container'>
                                <div className='props-title'>
                                    Size
                                </div>
                                <div className='props-values'>
                                    {size}
                                </div>
                            </div>
                            <div className='input-container'>
                                <div className='props-title'>
                                    Type
                                </div>
                                <div className='props-values'>
                                    {type}
                                </div>
                            </div>
                        </div>
                        <Inputs inputValue={slug} label="Slug" required onChange={handleTypingSlug} />
                        <div className='genre-artist'>
                            <div className='input-container select-opt'>
                                <label htmlFor="selectGenre">Genre</label>
                                <div className='selection-container' onClick={handleClickArrows}>
                                    <div className='arrows' >
                                        {isArrowUp && <ArrowUp />}
                                        {!isArrowUp && <ArrowDown />}
                                    </div>
                                    <input type="text" name="" id="selectGenre" readOnly value={optionValue} />
                                </div>
                                {isArrowUp &&
                                    <div className='scrollable-container'>
                                        <div className='selections'>
                                            {list_genre.map((item, index) =>
                                                <Selection value={item} onclick={event => handleChose(event)} key={index} />)}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='input-container'>
                                <label htmlFor="artistName">Artist</label>
                                <input type="text" id='artistName' placeholder={'Enter the artist\'s name'} value={artist} onChange={handleChangeArtist} />
                            </div>
                        </div>
                        <div className='input-container'>
                            <div className='text-area-labels'>
                                <label htmlFor="textAreaDesc">Description</label>
                                <div className='gray-text'>{500 - textAreaValue.length}</div>
                            </div>
                            <textarea name="" id="textAreaDesc" cols="30" rows="4" maxLength={500} placeholder='Describe your track' value={textAreaValue} onChange={event => handleChangeTextArea(event)}></textarea>
                        </div>
                    </div>
                </div>
                <div className='bot-box'>
                    <div>
                        <span className='star'>*</span>
                        Required fields
                    </div>
                    <div className='buttons'>
                        <button className='cancel' onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className='save' onClick={handleSave}>
                            {!isLoading && <span>Save</span>}
                            {isLoading &&
                                <div className='loading'>
                                    <Spinner />
                                </div>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditInfo