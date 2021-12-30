import React from 'react'
import { ApplyFilters } from './ApplyFilters'
import { ClearFilters } from './ClearFilters'

interface Props {
  onApplyClick?: () => void
  onClearClick?: () => void
}

export const FilterApplyCancelBtns: React.FC<Props> = ({
  onApplyClick,
  onClearClick,
}) => {
  return (
    <div className='mt-3'>
      <ApplyFilters onClick={onApplyClick} />
      <ClearFilters onClick={onClearClick}/>
    </div>
  )
}
