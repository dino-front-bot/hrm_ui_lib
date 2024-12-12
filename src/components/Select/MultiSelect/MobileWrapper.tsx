import React, { ReactElement } from 'react'
import { Modal } from '../../Modal'

type TProps = {
  isOpen: boolean
  children: ReactElement
  closeDrodown: () => void
  modalApplyButtonText?: string
}

export const MobileWrapper = (props: TProps) => {
  const { isOpen, closeDrodown, children, modalApplyButtonText = 'Apply' } = props

  const submitSelection = () => {
    closeDrodown()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeDrodown}
      onSubmit={submitSelection}
      isMobileFullScreen
      buttonProps={{
        confirm: {
          buttonText: modalApplyButtonText
        }
      }}
    >
      {children}
    </Modal>
  )
}
