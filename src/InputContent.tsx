import * as React from 'react'
import './ConfirmContent.scss'
import './InputContent.scss'

interface Props {
  message: string
  inputCb: (input: string) => void
  closeModal: () => void
}

const InputContent = ({ message, inputCb, closeModal }: Props) => {
  const inputRef = React.useRef(null)
  return (
    <div className='input-content'>
      <div className='input-message'>{message}</div>
      <div className='content-input'>
        <input className='form-control' ref={inputRef} size={30} />
      </div>
      <div className='button-panel'>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => {
            closeModal()
            inputCb(inputRef.current ? inputRef.current.value : '')
          }}
        >
          Ok
        </button>
        <button className='btn btn-sm btn-outline-danger' onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default InputContent
