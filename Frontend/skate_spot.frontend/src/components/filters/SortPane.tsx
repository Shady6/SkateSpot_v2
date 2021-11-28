import React from 'react'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { FilterApplyCancelBtns } from './FilterApplyCancelBtns'
import { SortingOptions } from './SortingOptions'

interface Props {
  listViewType: ListViewTypes
}

export const SortPane: React.FC<Props> = ({ listViewType }) => {
  return (
    <div className='ms-3'>
      <SortingOptions listViewType={listViewType} />
      <FilterApplyCancelBtns />
    </div>
  )
}
