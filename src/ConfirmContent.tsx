import * as React from 'react'
import './ConfirmContent.scss'

interface Props {
  message: string
  okCb: () => void
  closeModal: () => void
}

const ConfirmContent = ({ message, okCb, closeModal }: Props) => {
  return (
    <div className='confirm-content'>
      <div>{message}</div>
      <div className='button-panel'>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => {
            closeModal()
            okCb()
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

export default ConfirmContent
