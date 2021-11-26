import React, { useState } from 'react'
import { initialTags, ITag } from '../temp_spot/add/tags/Tags'
import { ApplyFilters } from './ApplyFilters'
import { SortingOptions, SortOption } from './SortingOptions'
import { SurfaceScoreFilter } from './SurfaceScoreFilter'
import { TagsFilter } from './TagsFilter'

interface Props {}

export const FilterAndSortPane: React.FC<Props> = () => {
  const [sortOption, setSortOption] = useState(SortOption.CREATION_DATE)
  const [sortAscending, setSortAscending] = useState(false)

  const [surfaceScoreEnabled, setSurfaceScoreEnabled] = useState(false)
  const [surfaceScoreGTFilter, setSurfaceScoreGTFilter] = useState(true)
  const [surfaceScore, setSurfaceScore] = useState(5)

  const [tags, setTags] = useState<ITag[]>(initialTags)

  return (
    <div className='ms-3'>
      <SortingOptions
        setSortOption={setSortOption}
        sortOption={sortOption}
        setSortAscending={setSortAscending}
        sortAscending={sortAscending}
      />

      <SurfaceScoreFilter
        {...{
          surfaceScoreEnabled,
          setSurfaceScoreEnabled,
          surfaceScoreGTFilter,
          setSurfaceScoreGTFilter,
          surfaceScore,
          setSurfaceScore,
        }}
      />
      <TagsFilter tags={tags} setTags={setTags} />

      <ApplyFilters />
    </div>
  )
}
