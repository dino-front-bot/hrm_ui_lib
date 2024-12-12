import React, { LegacyRef, ReactElement } from 'react'
import { DROPDOWN_AND_INPUT_GAP } from '../../../consts'
import {
  useGetElemPositions,
  useGetElemSizes,
  useGetHasBottomSpace,
  useGetHasTopSpace
} from '../../../hooks'

type TProps = {
  isOpen: boolean
  children: ReactElement
  setDropdownRef: LegacyRef<HTMLDivElement>
  align?: 'left' | 'right'
  inputRef: HTMLDivElement | HTMLButtonElement | null
  dropdownRef: HTMLDivElement | null
  containerRef: HTMLDivElement | null
  dropdownWidth: number | undefined
}
export const DesktopWrapper = (props: TProps): ReactElement | null => {
  const {
    setDropdownRef,
    align,
    isOpen,
    children,
    inputRef,
    dropdownRef,
    containerRef,
    dropdownWidth
  } = props

  const { bottom, left, top, right } = useGetElemPositions(inputRef)
  const { width: containerWidth } = useGetElemSizes(containerRef)
  const hasTopSpace = useGetHasTopSpace({
    element: dropdownRef,
    input: inputRef
  })

  const { hasBottomSpace } = useGetHasBottomSpace({
    element: dropdownRef,
    input: inputRef
  })

  return isOpen ? (
    <div
      className="select__options"
      ref={setDropdownRef}
      style={{
        left: align === 'left' ? left : right - (dropdownWidth || containerWidth),
        width: dropdownWidth || containerWidth,
        ...(hasBottomSpace || !hasTopSpace
          ? { top: bottom }
          : { bottom: window.innerHeight - top + DROPDOWN_AND_INPUT_GAP })
      }}
    >
      {children}
    </div>
  ) : null
}
