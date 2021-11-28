import React from 'react'
import { ApplyFilters } from './ApplyFilters'
import { ClearFilters } from './ClearFilters'
import { SortingOptions } from './SortingOptions'
import { SurfaceScoreFilter } from './SurfaceScoreFilter'
import { TagsFilter } from './TagsFilter'
import { ListViewTypes } from '../../state/generic/listViewGenerics'
import { FilterApplyCancelBtns } from './FilterApplyCancelBtns'

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
