import React from 'react'
import { ApplyFilters } from './ApplyFilters'
import { ClearFilters } from './ClearFilters'

interface Props {}

export const FilterApplyCancelBtns: React.FC<Props> = () => {
  return (
    <div className='mt-3'>
      <ApplyFilters />
      <ClearFilters />
    </div>
  )
}
