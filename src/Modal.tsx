import * as React from 'react'
import ConfirmContent from './ConfirmContent'
import InfoContent from './InfoContent'
import './Modal.scss'

export interface ModalCommands {
  confirm: (message: string, okCb: () => void) => void
  info: (message: string) => void
}

interface Props {
  commandRef: React.MutableRefObject<ModalCommands>
}

const Modal = ({ commandRef }: Props): React.ReactElement => {
  const [show, setShow] = React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string>('')
  const [content, setContent] = React.useState<React.ReactNode>(null)

  React.useEffect(() => {
    commandRef.current = {
      confirm: (message: string, okCb) => {
        setTitle('Confirm')
        setContent(
          <ConfirmContent message={message} okCb={okCb} closeModal={() => setShow(false)} />
        )
        setShow(true)
      },
      info: (message: string) => {
        setTitle('Info')
        setContent(<InfoContent message={message} closeModal={() => setShow(false)} />)
        setShow(true)
      },
    }
    return () => (commandRef.current = null)
  }, [commandRef])

  if (!show) {
    return null
  }

  return (
    <div className={`modal-panel ${show ? 'show' : 'hide'}`}>
      <div className='content'>
        <div className='title-bar'>
          <h4 className='title'>{title}</h4>
          <button
            className='btn btn-sm btn-outline-primary close-btn'
            onClick={() => setShow(false)}
          >
            X
          </button>
        </div>
        <div className='child-component'>{content}</div>
      </div>
    </div>
  )
}

export default Modal
