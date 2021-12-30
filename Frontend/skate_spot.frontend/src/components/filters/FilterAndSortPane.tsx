import React from 'react'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { FilterApplyCancelBtns } from './FilterApplyCancelBtns'
import { SortingOptions } from './SortingOptions'
import { SurfaceScoreFilter } from './SurfaceScoreFilter'
import { TagsFilter } from './TagsFilter'

interface Props {
  listViewType: ListViewTypes
  onApplyClick?: () => void
  onClearClick?: () => void
}

export const FilterAndSortPane: React.FC<Props> = ({
  listViewType,
  onApplyClick,
  onClearClick,
}) => {
  return (
    <div className='ms-3'>
      <SortingOptions listViewType={listViewType} />
      <SurfaceScoreFilter />
      <TagsFilter />
      <FilterApplyCancelBtns
        onApplyClick={onApplyClick}
        onClearClick={onClearClick}
      />
    </div>
  )
}
