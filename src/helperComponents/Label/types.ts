import { ReactNode } from 'react'

export interface LabelPropTypes {
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  text?: ReactNode
  size?: 'xxsmall' | 'xsmall' | 'small' | 'standard' | 'medium' | 'large'
  className?: string
  labelAddons?: React.ReactElement
  dataId?: string
}
