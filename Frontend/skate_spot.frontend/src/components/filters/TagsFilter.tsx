import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { ITag, Tags } from '../temp_spot/add/tags/Tags'
import { filterActions } from '../../state/reducers/filtersReducer'

export const TagsFilter = () => {
  const tags = useSelector<RootState, ITag[]>(
    state => state.filtersState.filterInMaking.filter.tags.tags
  )
  const dispatch = useDispatch()

  return (
    <div className='mt-4'>
      <p className='m-0'>Tags</p>
      <Tags
        tags={tags}
        setTags={tags => {
          dispatch(filterActions.setTags(tags))
        }}
      />
    </div>
  )
}
