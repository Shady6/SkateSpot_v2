import React from 'react'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { FilterApplyCancelBtns } from './FilterApplyCancelBtns'
import { SortingOptions } from './SortingOptions'

interface Props {
  listViewType: ListViewTypes
  onApplyClick?: () => void
  onClearClick?: () => void
}

export const SortPane: React.FC<Props> = ({
  listViewType,
  onApplyClick,
  onClearClick,
}) => {
  return (
    <div className='ms-3'>
      <SortingOptions listViewType={listViewType} />
      <FilterApplyCancelBtns
        onApplyClick={onApplyClick}
        onClearClick={onClearClick}
      />
    </div>
  )
}
