import React from 'react'
import { IconChevronLeft } from '../../../SVGIcons/IconChevronLeft'
import { Input } from '../../../Input'
import IconDismissFilled from '../../../SVGIcons/IconDismissFilled'
import IconSearchFilled from '../../../SVGIcons/IconSearchFilled'

type TProps = {
  searchValue: string
  setSearchValue: (value: string) => void
  onBack: () => void
}
export const MobileTopContent = ({ onBack, setSearchValue, searchValue }: TProps) => {
  const onSearch = (e: TChangeEventType) => {
    setSearchValue(e.target.value)
  }

  const removeFilter = () => {
    setSearchValue('')
  }
  return (
    <div className="flexbox mobile_top_content">
      <IconChevronLeft onClick={onBack} size="large" />
      <Input
        currentValue={searchValue}
        handleChange={onSearch}
        className="ml-8"
        size="small"
        rightIconProps={{
          Component: searchValue ? IconDismissFilled : IconSearchFilled,
          size: searchValue ? 'xsmall' : 'small',
          onClick: removeFilter
        }}
      />
    </div>
  )
}
