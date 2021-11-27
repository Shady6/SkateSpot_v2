// @ts-nocheck

import { ListViewTypes } from '../generic/listViewGenerics'
import {
  ListViewState,
  reducerDefaultCases,
  WithSocial,
} from '../reducers/genericListViewReducer'
import { spotActions } from '../reducers/spotReducer'
import { spotVideoActions } from '../reducers/spotVideoReducer'
import { tempSpotActions } from '../reducers/tempSpotsReducer'

const listItemActions = [
  { actions: tempSpotActions, listViewType: ListViewTypes.TEMP_SPOTS },
  { actions: spotActions, listViewType: ListViewTypes.SPOTS },
  { actions: spotVideoActions, listViewType: ListViewTypes.SPOT_VIDEOS },
]

export const getAllCommonActions = () => {
  let actions = {}

  listItemActions.forEach(l => {
    actions[l.listViewType] = {}

    Object.keys(reducerDefaultCases({} as ListViewState<any>)).forEach(key => {
      actions[l.listViewType][key] = l.actions[key]
    })
  })

  return actions as {
    [index in ListViewTypes]: {
      reset: () => ListViewState<any>
      setItems: (payload: WithSocial[]) => void
    }
  }
}
