import React, { ReactElement, useEffect, useId, useMemo, useRef, useState } from 'react'

import { OptionsWrapper } from './OptionsWrapper'
import { Footer, InputSelectWrapper, ButtonSelectWrapper } from '../SharedComponents'
import { useOnOutsideClick } from '../../../hooks'
import { TRANSLATIONS_DEFAULT_VALUES } from '../constants'
import { TMultiSelectPropTypes } from '../types'
import { useIsMobile } from '../../../hooks/useGetIsMobile'

export const MultiSelect = (props: TMultiSelectPropTypes): ReactElement => {
  const {
    options,
    footerButtonProps = {
      confirm: {
        buttonText: 'Apply'
      },
      cancel: { buttonText: 'Cancel' }
    },
    selectedItems,
    setSelectedItems,
    name,
    setFieldValue,
    value,
    label,
    placeHolder,
    isRequiredField,
    labelAddons,
    className = '',
    disabled,
    dropdownWidth,
    align = 'left',
    size,
    isButtonSelect,
    checkboxInfo,
    translations,
    hasError,
    ...rest
  } = props

  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)

  const initialSelected = (value as TSelectedValue[]) || selectedItems || []

  const [isOpen, setIsOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<TSelectedValue[]>(initialSelected)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const closeDropdown = () => setIsOpen(false)
  const openDropdown = () => setIsOpen(true)

  const hasChange = useMemo(() => {
    if (selectedValues?.length !== initialSelected?.length) {
      return true
    }

    return (
      selectedValues?.findIndex(
        (value) => initialSelected?.findIndex((i: TSelectOption) => i.value === value.value) === -1
      ) !== -1
    )
  }, [selectedValues, initialSelected])

  useEffect(() => {
    setSelectedValues((value as TSelectedValue[]) || [])
  }, [value])

  useEffect(() => {
    if (selectedItems) {
      setSelectedValues(selectedItems || [])
    }
  }, [selectedItems])

  const cancelSelectedItems = () => {
    setSelectedValues(initialSelected)
    closeDropdown()
  }

  useOnOutsideClick(containerRef.current, cancelSelectedItems, isOpen, useId())

  const submitSelectedValue = (selections: TSelectedValue[], isChecked: boolean) => {
    if (setSelectedItems) {
      setSelectedItems(selections, isChecked)
    }
    if (name && setFieldValue) {
      setFieldValue(name, selections)
    }

    closeDropdown()
  }

  const applySelectedItems = (isChecked: boolean) => {
    submitSelectedValue(selectedValues, isChecked)
  }

  const WrapperComponent = isButtonSelect ? ButtonSelectWrapper : InputSelectWrapper

  const localizations = { ...TRANSLATIONS_DEFAULT_VALUES, ...translations }

  const { overflowText } = localizations
  const isMobile = useIsMobile()
  return (
    <WrapperComponent
      dropdownRef={dropdownRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      containerRef={containerRef?.current}
      setContainerRef={containerRef}
      dropdownWidth={dropdownWidth}
      setDropdownRef={setDropdownRef}
      size={size}
      label={label}
      align={align}
      disabled={disabled}
      className={className}
      labelAddons={labelAddons}
      placeHolder={placeHolder}
      selectedValues={selectedValues}
      isRequiredField={isRequiredField}
      overflowText={overflowText}
      hasError={hasError}
    >
      <>
        <OptionsWrapper
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          options={options}
          isOpen={isOpen}
          translations={translations}
          setIsOpen={setIsOpen}
          dropdownRef={dropdownRef}
          openDropdown={openDropdown}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          containerRef={containerRef?.current}
          dropdownWidth={dropdownWidth}
          {...rest}
        />
        {options.length && !isMobile ? (
          <Footer
            checkboxInfo={checkboxInfo}
            hasChange={hasChange}
            buttonProps={footerButtonProps}
            onCancel={cancelSelectedItems}
            onApply={applySelectedItems}
          />
        ) : null}
      </>
    </WrapperComponent>
  )
}
