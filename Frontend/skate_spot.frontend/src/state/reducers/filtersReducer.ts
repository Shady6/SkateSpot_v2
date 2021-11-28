import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialTags, ITag } from '../../components/temp_spot/add/tags/Tags'
import { ObstacleType, SortOption } from '../../skate_spot_api/client'

export interface ISorting {
  option: SortOption
  ascending: boolean
}

export interface IAppliedSurfaceScoreFilter {
  gtFiltering: boolean
  score: number
}

export type ISurfaceScoreFilter = {
  enabled: boolean
} & IAppliedSurfaceScoreFilter

export type ITagsFilter = {
  enabled: boolean
  tags: ITag[]
}

export interface IAppliedFiltering {
  surfaceScore?: IAppliedSurfaceScoreFilter
  tags?: ObstacleType[]
}

export interface IFiltering {
  surfaceScore: ISurfaceScoreFilter
  tags: ITagsFilter
}

export interface IFilter {
  sort: ISorting
  filter: IFiltering
}

export interface IAppliedFilter {
  sort: ISorting
  filter?: IAppliedFiltering
}

export const initialFilter: IFilter = {
  sort: {
    option: SortOption.CREATION_DATE,
    ascending: false,
  },
  filter: {
    surfaceScore: {
      enabled: false,
      gtFiltering: true,
      score: 5,
    },
    tags: {
      enabled: false,
      tags: initialTags,
    },
  },
}

export const initialAppliedFilter: IAppliedFilter = {
  sort: initialFilter.sort,
  filter: undefined,
}

export const filterInitialState = {
  appliedFilter: initialAppliedFilter,
  filterInMaking: initialFilter,
}

const slice = createSlice({
  name: 'filters',
  initialState: filterInitialState,
  reducers: {
    applyFilters: state => {
      state.appliedFilter.sort = state.filterInMaking.sort

      if (state.filterInMaking.filter.surfaceScore.enabled) {
        state.appliedFilter.filter ??= {}
        state.appliedFilter.filter.surfaceScore = {
          score: state.filterInMaking.filter.surfaceScore.score,
          gtFiltering: state.filterInMaking.filter.surfaceScore.gtFiltering,
        }
      }

      if (state.filterInMaking.filter.tags.enabled) {
        state.appliedFilter.filter ??= {}
        state.appliedFilter.filter.tags = state.filterInMaking.filter.tags.tags
          .filter(t => t.isSelected)
          .map(t => t.obstacleType)
      }

      if (
        !state.filterInMaking.filter.surfaceScore.enabled &&
        !state.filterInMaking.filter.tags.enabled
      )
        state.appliedFilter.filter = undefined
    },
    clearFilters: _ => filterInitialState,
    setSortingOption: (state, action: PayloadAction<SortOption>) => {
      state.filterInMaking.sort.option = action.payload
    },
    setSortAscending: (state, action: PayloadAction<boolean>) => {
      state.filterInMaking.sort.ascending = action.payload
    },
    toggleSurfaceScore: state => {
      state.filterInMaking.filter.surfaceScore.enabled =
        !state.filterInMaking.filter.surfaceScore.enabled
    },
    toggleSurfaceScoreGt: state => {
      state.filterInMaking.filter.surfaceScore.gtFiltering =
        !state.filterInMaking.filter.surfaceScore.gtFiltering
    },
    setSurfaceScore: (state, action: PayloadAction<number>) => {
      state.filterInMaking.filter.surfaceScore.score = action.payload
    },
    setTags: (state, action: PayloadAction<ITag[]>) => {
      state.filterInMaking.filter.tags.enabled = action.payload.some(
        t => t.isSelected
      )
      state.filterInMaking.filter.tags.tags = action.payload
    },
  },
})

export const filterActions = slice.actions
export default slice.reducer
