import React from 'react'
import { TFilterGroupDropdownContentProps } from '../types'
import { FilterDropdownContent } from './FilterDropdown'

export const FilterGroupDropdownContent = (
  props: TFilterGroupDropdownContentProps
): React.ReactElement => {
  const { options, ...rest } = props

  return (
    <>
      {options.map(({ data, title }: TSelectGroupOption) => {
        return (
          <div className="group_container" key={title}>
            <span>{title}</span>
            <FilterDropdownContent options={data} {...rest} />
          </div>
        )
      })}
    </>
  )
}
