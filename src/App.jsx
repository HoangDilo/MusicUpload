import './App.css'
import Upload from './Components/Upload'
import EditInfo from './Components/EditInfo'
import FinalStep from './Components/FinalStep'
import ToastMessage from './Components/ToastMessage'
import { Fragment, useEffect, useRef, useState } from 'react'

function App() {
  const [step, setStep] = useState(1);
  const [fileInput, setFileInput] = useState()

  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  return (
    <>
      {isShown1 && <ToastMessage message="Upload successfully!" type="success" shown={isShown1} setShown={setIsShown1}/>}
      {isShown2 && <ToastMessage message="Make sure no field is empty!" type="fail" shown={isShown2} setShown={setIsShown2}/>}
      <div className='main-content'>
        {step === 1 && <Upload setStep={setStep} setFileInput={setFileInput} />}
        {step === 2 && <EditInfo fileInput={fileInput} setStep={setStep} setShown1={setIsShown1} setShown2={setIsShown2} setUrl={setUrl} setArtistStep3={setArtist} setTitleStep3={setTitle} setDurationStep3={setDuration} setGenreStep3={setGenre} setImgSrcStep3={setImgSrc} />}
        {step === 3 && <FinalStep title={title} artist={artist} duration={duration} genre={genre} url={url} imgSrc={imgSrc} setStep={setStep} />}
      </div>
    </>

  )
}

export default App
