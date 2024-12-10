import React from 'react'
import { TCardSelectGroupProps } from './types'
import { CardSelect } from './CardSelect'
import classNames from 'classnames'

export const CardSelectGroup = (props: TCardSelectGroupProps): React.ReactElement => {
  const { cards, name, handleChange, value, cardsGroupType, cardsGroupDisable, className } = props

  return (
    <div className={classNames('card-select-group', className)}>
      {cards.map(
        (
          {
            type,
            illustration,
            icon,
            value: cardValue,
            title,
            description,
            chips,
            inputProps,
            additionalInfo,
            id,
            disabled
          },
          index
        ) => (
          <CardSelect
            className={'card-select-group__item'}
            name={name}
            key={id || index}
            type={cardsGroupType || type}
            title={title}
            description={description}
            chips={chips}
            inputProps={inputProps}
            handleChange={handleChange}
            additionalInfo={additionalInfo}
            cardValue={cardValue}
            value={value}
            illustration={illustration}
            icon={icon}
            disabled={cardsGroupDisable || disabled}
          />
        )
      )}
    </div>
  )
}
