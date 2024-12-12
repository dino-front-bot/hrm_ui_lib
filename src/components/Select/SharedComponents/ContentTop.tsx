import React, { useEffect, useMemo, useRef } from 'react'
import { Text } from '../../Text'
import { Input } from '../../Input'
import { TMenuItem } from '../../Menu/types'
import { TSelectTranslations } from '../types'
import { Actions } from './Actions'
import IconDismissFilled from '../../SVGIcons/IconDismissFilled'
import IconSearchFilled from '../../SVGIcons/IconSearchFilled'
import IconSelectAllOff from '../../SVGIcons/IconSelectAllOff'
import { useIsMobile } from '../../../hooks/useGetIsMobile'
import { IconChevronLeft } from '../../SVGIcons'

type TProps = {
  searchValue?: string
  helperText?: string
  selectAll?: TCallBackFn
  setSearchValue?: (value: string) => void
  clearAll?: TCallBackFn
  isSelectAllDisabled?: boolean
  isAnySelected?: boolean
  translations?: TSelectTranslations
  isSearchAvailable?: boolean
  hasLimitation?: boolean
  menuOptions?: TMenuItem[]
  dataIdPrefix?: string
  closeDropdown?: () => void
}

export const ContentTop = React.memo<TProps>((props: TProps): React.ReactElement => {
  const {
    clearAll,
    selectAll,
    helperText,
    searchValue,
    translations,
    isAnySelected,
    setSearchValue,
    isSearchAvailable = false,
    hasLimitation = false,
    isSelectAllDisabled = false,
    menuOptions = [],
    dataIdPrefix,
    closeDropdown
  } = props
  const inputRef = useRef<HTMLInputElement>(null)

  const { searchInputPlaceHolder, innerLabel, clearAllLabel, selectAllLabel } = translations || {}

  const selectActions = useMemo(() => {
    let options: TMenuItem[] = menuOptions

    if (selectAll && selectAllLabel && !hasLimitation) {
      options = [
        {
          label: selectAllLabel,
          value: 1,
          handler: selectAll,
          disabled: isSelectAllDisabled,
          iconProps: { Component: IconSelectAllOff },
          dataId: dataIdPrefix ? `${dataIdPrefix}-select-all` : ''
        }
      ]
    }
    if (clearAll && clearAllLabel) {
      options = [
        ...options,
        {
          label: clearAllLabel,
          value: 2,
          handler: clearAll,
          disabled: !isAnySelected,
          iconProps: { Component: IconDismissFilled },
          dataId: dataIdPrefix ? `${dataIdPrefix}-clear-all` : ''
        }
      ]
    }
    return options
  }, [
    menuOptions,
    selectAllLabel,
    selectAll,
    clearAll,
    clearAllLabel,
    isSelectAllDisabled,
    isAnySelected,
    dataIdPrefix
  ])
  const onSearch = (e: TChangeEventType) => {
    setSearchValue && setSearchValue(e.target.value)
  }

  const removeFilter = () => setSearchValue && setSearchValue('')
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  const onBack = () => {
    closeDropdown && closeDropdown()
  }
  const isMobile = useIsMobile()
  return (
    <div className="content-top">
      {helperText && !isMobile ? (
        <Text size="xsmall" type="secondary" className="content-top__label">
          {helperText}
        </Text>
      ) : null}
      <div className="flexbox search-container">
        {isMobile && <IconChevronLeft onClick={onBack} size="large" />}
        {isSearchAvailable && (
          <Input
            ref={inputRef}
            className="content-top__search"
            size="small"
            placeholder={searchInputPlaceHolder}
            handleChange={onSearch}
            currentValue={searchValue}
            rightIconProps={{
              Component: searchValue ? IconDismissFilled : IconSearchFilled,
              size: searchValue ? 'xsmall' : 'small',
              onClick: removeFilter
            }}
          />
        )}
      </div>

      <Actions selectActions={selectActions} innerLabel={innerLabel} />
    </div>
  )
})

ContentTop.displayName = 'ContentTop'
