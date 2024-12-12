import React, { useCallback, useMemo, useState } from 'react'
import { Text } from '../../../Text'
import { Divider } from '../../../Divider'
import { Empty } from '../../../Empty'
import { useGetElemSizes } from '../../../../hooks'
import { OptionItem } from '../../../../helperComponents'
import { ContentTop } from '../../SharedComponents'
import { TMultiSelectGroupedProps } from '../../types'
import { DROPDOWN_MAX_HEIGHT } from '../../constants'
import IconCaretUpFilled from '../../../SVGIcons/IconCaretUpFilled'
import IconCaretDownFilled from '../../../SVGIcons/IconCaretDownFilled'
import classNames from 'classnames'
import { useIsMobile } from '../../../../hooks/useGetIsMobile'

export const MultiSelectGrouped = (props: TMultiSelectGroupedProps): React.ReactElement | null => {
  const {
    avatar,
    options,
    helperText,
    translations,
    selectedValues,
    onItemSelect,
    onItemDeselect,
    setSelectedValues,
    isSearchAvailable,
    labelLeftIconProps,
    scrollableContentStyle,
    optionRightIconComponent,
    labelRightIconComponent,
    maxSelectCount,
    menuOptions,
    dataIdPrefix,
    closeDropdown
  } = props

  const { emptyListMainMessage, emptyListSecondaryMessage } = translations

  const [searchValue, setSearchValue] = useState('')
  const [activeGroupId, setActiveGroupId] = useState<number | null>(0)
  const [isAllSelected, setAllSelected] = useState(false)
  const [contentContainerRef, setContentContainerRef] = useState<HTMLDivElement | null>(null)

  const { scrollHeight } = useGetElemSizes(contentContainerRef)

  const filteredData = useMemo(() => {
    if (!searchValue) {
      return options
    }

    return options.reduce(
      (acc: TSelectGroupOptions, group: TSelectGroupOption): TSelectGroupOptions => {
        const { data, title } = group
        const groupData = data.filter((dataItem) => {
          return (
            typeof dataItem.label === 'string' &&
            dataItem.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
          )
        })

        if (groupData.length) {
          return [
            ...acc,
            {
              title,
              data: groupData
            }
          ]
        }
        return acc
      },
      []
    )
  }, [searchValue, options])

  const clearAll = useCallback(() => {
    setAllSelected(false)
    setSelectedValues([])
  }, [])

  const selectAll = useCallback(() => {
    setAllSelected(true)

    const allValues = filteredData.reduce(
      (acc: TSelectedValue[], { data }: TSelectGroupOption) => [
        ...acc,
        ...data.map((item) => {
          return {
            value: item.value,
            label: item.label
          }
        })
      ],
      []
    )

    setSelectedValues(allValues)
  }, [filteredData])

  const selectedOptions = useMemo(() => {
    return options.reduce((acc: TSelectOption[], option: TSelectGroupOption) => {
      const { data } = option
      const selectedItems = data.filter(
        (item: TSelectOption) => selectedValues.findIndex((s) => s.value === item.value) !== -1
      )
      return [...acc, ...selectedItems]
    }, [])
  }, [options, selectedValues])

  const onDeselect = (item: TSelectedValue) => {
    setAllSelected(false)
    onItemDeselect(item)
  }

  const onGroupClick = (index: number) => {
    if (activeGroupId == index) {
      setActiveGroupId(null)
      return
    }
    setActiveGroupId(index)
  }

  const optionProps = useMemo(() => {
    return {
      isCheckbox: true,
      avatar,
      labelLeftIconProps,
      optionRightIconComponent,
      labelRightIconComponent,
      className: 'group-item__option'
    }
  }, [avatar, labelLeftIconProps, optionRightIconComponent, labelRightIconComponent])
  const hasTopContent = isSearchAvailable || helperText

  const isMobile = useIsMobile()
  return (
    <>
      {hasTopContent ? (
        <ContentTop
          closeDropdown={closeDropdown}
          dataIdPrefix={dataIdPrefix}
          menuOptions={menuOptions}
          isSearchAvailable={isSearchAvailable || isMobile}
          hasLimitation={!!maxSelectCount}
          selectAll={selectAll}
          clearAll={clearAll}
          isAnySelected={selectedValues.length !== 0}
          helperText={helperText}
          isSelectAllDisabled={isAllSelected || filteredData.length === 0}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          translations={translations}
        />
      ) : null}
      <div
        ref={setContentContainerRef}
        className={`select__options__scroll scrollbar scrollbar--vertical ${
          scrollHeight > DROPDOWN_MAX_HEIGHT ? 'mr-6' : ''
        }`}
        style={scrollableContentStyle}
      >
        <div>
          {isSearchAvailable && (
            <div className="selected-items">
              {selectedOptions.map((selectedItem: TSelectOption) => {
                return (
                  <OptionItem
                    isSelected
                    data={selectedItem}
                    key={selectedItem.value}
                    onClick={onDeselect}
                    disabled={selectedItem.disabled}
                    {...optionProps}
                  />
                )
              })}
            </div>
          )}
          {hasTopContent ? <Divider type="primary" isHorizontal /> : null}
          {filteredData.map(({ title, data }: TSelectGroupOption, index: number) => {
            const isActive = index === activeGroupId
            return (
              <div className="select__group group-item" key={`${data[0]?.value}_${index}`}>
                <div onClick={() => onGroupClick(index)} className="group-item__top">
                  <Text size="xxsmall" type="tertiary" className="group-item__title pr-4">
                    {title}
                  </Text>
                  {isActive ? (
                    <IconCaretUpFilled size="xxsmall" className="group-item__icon" />
                  ) : (
                    <IconCaretDownFilled size="xxsmall" className="group-item__icon" />
                  )}
                </div>
                {isActive &&
                  data.map((item: TSelectOption) => {
                    const isSelected =
                      selectedValues.findIndex((s) => s.value === item.value) !== -1
                    return (
                      <OptionItem
                        data={item}
                        dataId={item.dataId}
                        key={item.value}
                        isSelected={isSelected}
                        disabled={
                          item.disabled || (!isSelected && selectedValues.length === maxSelectCount)
                        }
                        onClick={isSelected ? onDeselect : onItemSelect}
                        {...optionProps}
                      />
                    )
                  })}
              </div>
            )
          })}
        </div>
      </div>
      {filteredData.length === 0 ? (
        <Empty
          size="small"
          mainMessage={emptyListMainMessage}
          paragraphMessage={emptyListSecondaryMessage}
        />
      ) : null}
    </>
  )
}
