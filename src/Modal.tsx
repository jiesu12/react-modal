import * as React from 'react'
import ConfirmContent from './ConfirmContent'
import InfoContent from './InfoContent'
import './Modal.scss'
import InputContent from './InputContent'

export interface ModalCommands {
  confirm: (message: string, okCb: () => void) => void
  input: (message: string, inputCb: (input: string) => void) => void
  info: (message: string) => void
  modal: (title: string) => void
  close: () => void
}

interface Props {
  commandRef: React.MutableRefObject<ModalCommands>
  children?: React.ReactElement
}

type ModalType = 'MODAL' | 'CONFIRM' | 'INFO' | 'INPUT'

const Modal = ({ commandRef, children }: Props): React.ReactElement => {
  const [show, setShow] = React.useState<boolean>(false)
  const [showingTitle, setShowingTitle] = React.useState<string>('')
  const [modalType, setModalType] = React.useState<ModalType>('MODAL')
  const [message, setMessage] = React.useState<string>('')
  const okCbRef = React.useRef<() => void>()
  const inputCbRef = React.useRef<(input: string) => void>()

  React.useEffect(() => {
    commandRef.current = {
      confirm: (message: string, okCb) => {
        setShowingTitle('Confirm')
        setMessage(message)
        okCbRef.current = okCb
        setModalType('CONFIRM')
        setShow(true)
      },
      input: (message: string, inputCb) => {
        setShowingTitle('Input')
        setMessage(message)
        inputCbRef.current = inputCb
        setModalType('INPUT')
        setShow(true)
      },
      info: (message: string) => {
        setShowingTitle('Info')
        setMessage(message)
        setModalType('INFO')
        setShow(true)
      },
      close: () => setShow(false),
      modal: (title: string) => {
        setShow(true)
        setModalType('MODAL')
        setShowingTitle(title)
      },
    }
    return () => {
      commandRef.current = null
    }
  }, [commandRef])

  if (!show) {
    return null
  }

  const closeModal = () => setShow(false)

  const renderContent = () => {
    if (modalType === 'MODAL') {
      return children
    } else if (modalType === 'INFO') {
      return <InfoContent message={message} closeModal={closeModal} />
    } else if (modalType === 'CONFIRM') {
      return <ConfirmContent message={message} okCb={okCbRef.current} closeModal={closeModal} />
    } else if (modalType === 'INPUT') {
      return <InputContent message={message} closeModal={closeModal} inputCb={inputCbRef.current} />
    } else {
      return null
    }
  }

  return (
    <div className={`modal-panel ${show ? 'show' : 'hide'}`}>
      <div className='content'>
        <div className='title-bar'>
          <h4 className='modal-title'>{showingTitle}</h4>
          <button
            className='btn btn-sm btn-outline-primary close-btn'
            onClick={() => setShow(false)}
          >
            X
          </button>
        </div>
        <div className='child-component'>{renderContent()}</div>
      </div>
    </div>
  )
}

export default Modal
