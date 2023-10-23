import './App.css'
import Upload from './Components/Upload'
import EditInfo from './Components/EditInfo'
import FinalStep from './Components/FinalStep'
import ToastMessage from './Components/ToastMessage'
import { Fragment, useEffect, useRef, useState } from 'react'

function App() {
  const [step, setStep] = useState(1);
  const [fileInput, setFileInput] = useState()
  const [toastMessage, setToastMessage] = useState('');

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [genre, setGenre] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  console.log(toastMessage);

  return (
    <Fragment>
      {toastMessage && <ToastMessage message={toastMessage} type="success"/>}
      <div className='main-content'>
        {step === 1 && <Upload setStep={setStep} setFileInput={setFileInput} />}
        {step === 2 && <EditInfo fileInput={fileInput} setStep={setStep} setToastMessage={setToastMessage} setUrl={setUrl} setArtistStep3={setArtist} setTitleStep3={setTitle} setDurationStep3={setDuration} setGenreStep3={setGenre} setImgSrcStep3={setImgSrc} />}
        {step === 3 && <FinalStep title={title} artist={artist} duration={duration} genre={genre} url={url} imgSrc={imgSrc} setStep={setStep} setToastMessage={setToastMessage} />}
      </div>
    </Fragment>

  )
}

export default App
