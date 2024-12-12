import React, { ReactElement, useCallback, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { Input } from '../../../Input'
import { useGetElemSizes, useGetHasBottomSpace } from '../../../../hooks'
import { getStringWidth, noop, setTranslationValue } from '../../../../utils/helpers'

import { useChangePositionsOnScroll } from '../../../../hooks/useChangePositionsOnScroll'
import { IconCaretDownFilled } from '../../../SVGIcons/IconCaretDownFilled'
import { IconCaretUpFilled } from '../../../SVGIcons/IconCaretUpFilled'
import { TSelectWrapperProps } from '../../types'
import { useIsMobile } from '../../../../hooks/useGetIsMobile'
import { MobileWrapper } from '../../MultiSelect/MobileWrapper'
import { DesktopWrapper } from '../../MultiSelect/DesktopWrapper'

export const InputSelectWrapper = (props: TSelectWrapperProps): ReactElement | null => {
  const {
    children,
    options,
    label,
    placeHolder,
    isRequiredField,
    labelAddons,
    disabled,
    className = '',
    dropdownWidth,
    align = 'left',
    size,
    dropdownRef,
    setDropdownRef,
    containerRef,
    setIsOpen,
    isOpen,
    selectedValues,
    setContainerRef,
    overflowText,
    hasError,
    modalApplyButtonText
  } = props

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { width } = useGetElemSizes(containerRef)

  const checkIsValueOverflowed = useCallback(
    (value: string) => {
      const elemWidth = getStringWidth(value, 14)
      return elemWidth > width - 80 // padding and width of (+number)
    },
    [width]
  )

  const toggleDropdown = (e?: TClickEventType) => {
    const clickedElement = e?.target as HTMLDivElement
    const className = clickedElement?.getAttribute('class')
    if (
      e &&
      className &&
      (className.indexOf('icon-') !== -1 || className.indexOf('svg-icon') !== -1)
    ) {
      setIsOpen(!isOpen)
      e.preventDefault()
    } else {
      setIsOpen(true)
    }
  }

  const selectedItemsLabels = useMemo(() => {
    if (!selectedValues || !selectedValues.length) {
      return ''
    }
    const onlyLabels = selectedValues.map((selected) => selected.label)
    const joinedLabel = onlyLabels.join(', ')

    return checkIsValueOverflowed(joinedLabel)
      ? setTranslationValue(overflowText || '', selectedValues.length)
      : joinedLabel
  }, [options, selectedValues, checkIsValueOverflowed])

  const { hasBottomSpace } = useGetHasBottomSpace({
    element: dropdownRef,
    input: inputRef.current
  })

  useChangePositionsOnScroll(inputRef?.current, dropdownRef, hasBottomSpace)

  const isMobile = useIsMobile()

  return (
    <div className={classNames('select select--multi', className)} ref={setContainerRef}>
      <div onClick={disabled ? noop : toggleDropdown}>
        <Input
          readonly
          label={label}
          ref={inputRef}
          hasError={hasError}
          className="select__input"
          placeholder={placeHolder}
          required={isRequiredField}
          currentValue={selectedItemsLabels}
          rightIconProps={{
            Component: isOpen ? IconCaretUpFilled : IconCaretDownFilled,
            size: 'xsmall'
          }}
          labelAddons={labelAddons}
          disabled={disabled}
          size={size === 'large' ? 'large' : 'small'}
        />
      </div>

      <>
        {isMobile ? (
          <MobileWrapper
            isOpen={isOpen}
            closeDrodown={() => setIsOpen(false)}
            modalApplyButtonText={modalApplyButtonText}
          >
            {children}
          </MobileWrapper>
        ) : (
          <DesktopWrapper
            setDropdownRef={setDropdownRef}
            isOpen={isOpen}
            align={align}
            dropdownWidth={dropdownWidth}
            inputRef={inputRef.current}
            dropdownRef={dropdownRef}
            containerRef={containerRef}
          >
            {children}
          </DesktopWrapper>
        )}
      </>
    </div>
  )
}
