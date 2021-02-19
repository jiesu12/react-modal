import * as React from 'react'
import ConfirmContent from './ConfirmContent'
import InfoContent from './InfoContent'
import './Modal.scss'

export interface ModalCommands {
  confirm: (message: string, okCb: () => void) => void
  info: (message: string) => void
  modal: () => void
  close: () => void
}

interface Props {
  title?: string
  commandRef: React.MutableRefObject<ModalCommands>
  children?: React.ReactElement
}

type ModalType = 'MODAL' | 'CONFIRM' | 'INFO'

const Modal = ({ title = '', commandRef, children }: Props): React.ReactElement => {
  const [show, setShow] = React.useState<boolean>(false)
  const [showingTitle, setShowingTitle] = React.useState<string>(title)
  const [modalType, setModalType] = React.useState<ModalType>('MODAL')
  const [message, setMessage] = React.useState<string>('')
  const okCbRef = React.useRef<() => void>()

  React.useEffect(() => {
    commandRef.current = {
      confirm: (message: string, okCb) => {
        setShowingTitle('Confirm')
        setMessage(message)
        okCbRef.current = okCb
        setModalType('CONFIRM')
        setShow(true)
      },
      info: (message: string) => {
        setShowingTitle('Info')
        setMessage(message)
        setModalType('INFO')
        setShow(true)
      },
      close: () => setShow(false),
      modal: () => {
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

  const renderContent = () => {
    if (modalType === 'MODAL') {
      return children
    } else if (modalType === 'INFO') {
      return <InfoContent message={message} closeModal={() => setShow(false)} />
    } else if (modalType === 'CONFIRM') {
      return (
        <ConfirmContent
          message={message}
          okCb={okCbRef.current}
          closeModal={() => setShow(false)}
        />
      )
    } else {
      return null
    }
  }

  return (
    <div className={`modal-panel ${show ? 'show' : 'hide'}`}>
      <div className='content'>
        <div className='title-bar'>
          <h4 className='title'>{showingTitle}</h4>
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
