import * as React from 'react'
import './InfoContent.scss'

interface Props {
  message: string
  closeModal: () => void
}

const InfoContent = ({ message, closeModal }: Props) => {
  return (
    <div className='alert-content'>
      <div>{message}</div>
      <div className='button-panel'>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => {
            closeModal()
          }}
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default InfoContent
