import React from 'react'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { FilterApplyCancelBtns } from './FilterApplyCancelBtns'
import { SortingOptions } from './SortingOptions'
import { SurfaceScoreFilter } from './SurfaceScoreFilter'
import { TagsFilter } from './TagsFilter'

interface Props {
  listViewType: ListViewTypes
}

export const FilterAndSortPane: React.FC<Props> = ({ listViewType }) => {
  return (
    <div className='ms-3'>
      <SortingOptions listViewType={listViewType} />
      <SurfaceScoreFilter />
      <TagsFilter />
      <FilterApplyCancelBtns />
    </div>
  )
}
