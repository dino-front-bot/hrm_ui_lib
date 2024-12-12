import { LegacyRef, ReactElement, ReactNode } from 'react'
import { TButtonPropTypes } from '../Button/types'
import { TTooltipProps } from '../Tooltip/types'
import { TMenuItem } from '../Menu/types'
import { bool } from 'yup'

interface TSelectBaseProps {
  dataIdPrefix?: string
  error?: string
  isLoading?: boolean
  disabled?: boolean
  label?: string | React.ReactElement
  placeHolder?: string
  isRequiredField?: boolean
  labelLeftIconProps?: {
    size?: TIconSize
    className?: string
    onClick?: TClickHandler
    Component?: TSVGIconComponent
  }
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  selectRightIconProps?: TSelectIconProps
  selectRightIconOpenedProps?: TSelectIconProps
  avatar?: string
  size?: 'small' | 'large' | 'medium'
  className?: string
  dropdownWidth?: number
}
export interface TNestedSelectProps {
  options: TSelectOptions
  isRequiredField?: boolean
  label?: string | ReactElement
  placeHolder?: string
  initialSelectedFolderIds?: TItemValue[]
  setSelectedValue: (value: TSelectOption | null) => void
  selected?: TSelectOption | null
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  avatar?: string
  labelAddons?: ReactElement
}

export type TSelectTranslations = {
  emptyListMainMessage: string
  overflowText?: string
  searchInputPlaceHolder?: string
  emptyListSecondaryMessage?: string
  selectAllLabel?: string
  clearAllLabel?: string
  innerLabel?: string
}

interface TMultiSelectCompProps extends IFormCompProps, TSelectBaseProps {
  maxSelectCount: number
  isSearchAvailable: boolean
  helperText?: string
  scrollableContentStyle: { maxHeight?: number }
  translations: TSelectTranslations
  selectedValues: TSelectedValue[]
  setSelectedValues: (values: TSelectedValue[]) => void
  onItemSelect: (item: TSelectedValue) => void
  onItemDeselect: (item: TSelectedValue) => void
  menuOptions?: TMenuItem[]
  closeDropdown: () => void
}

export interface TMultySingleTabPropTypes extends TMultiSelectCompProps {
  options: TSelectOptions
}

export interface TMultiSelectGroupedProps extends TMultiSelectCompProps {
  options: TSelectGroupOptions
}

export type TCheckboxInfo = {
  label: string
  isChecked: boolean
}

export interface TMultiSelectPropTypes extends IFormCompProps, TSelectBaseProps {
  dropdownWidth?: number
  align?: 'left' | 'right'
  helperText?: string
  maxSelectCount?: number
  isSearchAvailable?: boolean
  withTabs?: boolean
  isGrouped?: boolean
  checkboxInfo?: TCheckboxInfo
  selectedItems?: TSelectedValue[]
  translations: TSelectTranslations
  options: TSelectOptions | TSelectGroupOptions
  setSelectedItems?: (items: TSelectedValue[], isChecked: boolean) => void
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  labelAddons?: React.ReactElement
  className?: string
  isButtonSelect?: boolean
}

export interface TButtonSelectPropTypes extends IFormCompProps, TSelectBaseProps {
  dataId?: string
  options: TSelectOptions
  selectedItem?: TItemValue
  setSelectedItem?: (items: TItemValue | undefined) => void
  tooltipAddons?: TTooltipProps
  dropdownWidth?: number
  align?: 'left' | 'right'
  offsets?: {
    top?: number
    left?: number
    right?: number
  }
  type: 'secondary' | 'tertiary'
}

export interface TSingleSelectPropTypes extends IFormCompProps, TSelectBaseProps {
  options: TSelectOptions
  selectedItem?: TItemValue
  setSelectedItem?: (items: TItemValue | undefined) => void
  withSearch?: boolean
  outerHelperText?: string
  innerHelperText?: string
  labelAddons?: React.ReactElement
  tooltipAddons?: TTooltipProps
  translations?: {
    emptyListMainMessage: string
  }
}

export interface ISingleSelectResponsiveProps {
  isOpen: boolean
  closeDropdown: () => void
  isLoading?: boolean
  dataId?: string
  innerHelperText?: string
  labelLeftIconProps?: {
    size?: TIconSize
    className?: string
    onClick?: TClickHandler
  }
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  tooltipAddons?: TTooltipProps
  onItemSelect: (item: TItemValue) => void
  onItemDeselect: () => void
  options: TSelectOptions
  avatar?: string
  currentSelection: TItemValue | undefined
  isRequiredField?: boolean
  translations?: {
    emptyListMainMessage: string
  }
}

export type ISingleSelectMobileProps = ISingleSelectResponsiveProps
export interface ISingleSelectDesktopProps extends ISingleSelectResponsiveProps {
  searchValue: string
  setSearchValue: (value: string) => void
  withSearch?: boolean
  dropdownWidth?: number
  inputRef: HTMLInputElement | null
  containerRef: HTMLDivElement | null
  setSelectedOption: (item: TSelectOption | null) => void
}

export type TSelectFooterPropTypes = {
  checkboxInfo?: TCheckboxInfo
  hasChange?: boolean
  buttonProps: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  onCancel: () => void
  onApply: (isChecked: boolean) => void
}

export interface TFilterProps extends IFormCompProps, TSelectBaseProps {
  isLoading?: boolean
  withTabs: boolean
  isGrouped: boolean
  isOpen: boolean
  options: TSelectOptions | TSelectGroupOptions
  selectedItems: TSelectedValue[]
  setSelectedItems: (items: TSelectedValue[]) => void
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  closeHandler: () => void
  parentRef: HTMLElement
}

export interface TFilterDropdownContentProps extends IFormCompProps {
  options: TSelectOptions
  labelLeftIconProps?: {
    size?: TIconSize
    className?: string
    onClick?: TClickHandler
  }
  avatar?: string
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  // closeHandler: () => void
  filterValue: string
  onItemSelect: (item: TSelectedValue) => void
  onItemDeselect: (item: TSelectedValue) => void
  checkIsSelected: (item: TItemValue) => boolean
}

export interface TFilterGroupDropdownContentProps extends IFormCompProps {
  options: TSelectGroupOptions
  labelLeftIconProps?: {
    size?: TIconSize
    className?: string
    onClick?: TClickHandler
  }
  avatar?: string
  footerButtonProps?: {
    cancel: TButtonPropTypes
    confirm: TButtonPropTypes
  }
  optionRightIconComponent?: (value: TItemValue) => ReactElement
  labelRightIconComponent?: (value: TItemValue) => ReactElement
  filterValue: string
  onItemSelect: (item: TSelectedValue) => void
  onItemDeselect: (item: TSelectedValue) => void
  checkIsSelected: (item: TItemValue) => boolean
}

export type TSelectWrapperProps = {
  hasError?: boolean
  children: ReactElement
  size?: 'small' | 'large' | 'medium'
  className?: string
  dropdownWidth?: number
  align?: 'left' | 'right'
  offsets?: {
    top?: number
    left?: number
    right?: number
  }
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  containerRef: HTMLDivElement | null
  setContainerRef: LegacyRef<HTMLDivElement> | undefined
  options?: TSelectOptions
  label?: string | React.ReactElement
  placeHolder?: string
  isRequiredField?: boolean
  overflowText?: string
  labelAddons?: React.ReactElement
  disabled?: boolean
  dropdownRef: HTMLDivElement | null
  setDropdownRef: LegacyRef<HTMLDivElement>
  selectedValues?: TSelectedValue[]
  dataId?: string
  type?: 'primary' | 'secondary' | 'tertiary'
  modalApplyButtonText?: string
}

declare type TNavItemValue = {
  icon?: TSVGIconComponent
  text: string
  url?: string
  onclick?: () => void
  rightInfoProps?: ReactElement
  children: ReactNode
}
export type TProfileDropdownProps = {
  avatar: ReactElement
  email: string
  name: string
  bodyItems: TNavItemValue[]
  footerItems: TNavItemValue[]
  className?: string
}
