import React, { ReactElement, useEffect, useState } from 'react'
import { TPopoverProps } from './types'
import { useIsMobile } from '../../hooks/useGetIsMobile'
import { PopoverMobile } from './PopoverMobile'
import { PopoverDesktop } from './PopoverDesktop'

export const Popover = (props: TPopoverProps): ReactElement | null => {
  const { elemRef, id, clicked, ...rest } = props
  const isMobile = useIsMobile()

  const [isClicked, setIsClicked] = useState(clicked)
  const [parent, setElement] = useState<HTMLElement | null>(elemRef || null)

  const showMessage = () => setIsClicked(true)

  const hideMessage = () => setIsClicked(false)

  useEffect(() => {
    if (parent) {
      parent.addEventListener('click', showMessage)
    }
  }, [parent])

  useEffect(() => {
    if (id) {
      const element = document.getElementById(id.toString())
      setElement(element)
    }
  }, [id])

  useEffect(() => {
    if (clicked !== undefined && clicked !== isClicked) {
      setIsClicked(clicked)
    }
  }, [clicked, isClicked])

  return isMobile ? (
    <PopoverMobile {...rest} clicked={isClicked} hideMessage={hideMessage} />
  ) : (
    <PopoverDesktop
      {...rest}
      parent={parent}
      clicked={isClicked}
      showMessage={showMessage}
      hideMessage={hideMessage}
    />
  )
}
