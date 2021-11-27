import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  listViewSpecifics,
  ListViewTypes,
} from '../state/generic/listViewGenerics'
import { useRootState } from '../state/store'

export const useFetchOnScroll = (
  fetchAction: any,
  listViewType: ListViewTypes
) => {
  const state = listViewSpecifics[listViewType].getSpecificState(useRootState())
  const dispatch = useDispatch()

  const [scrolled, setScrolled] = useState(0)

  const setScrolledPercent = () => {
    setScrolled(
      document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)
    )
  }

  useEffect(() => {
    window.addEventListener('scroll', setScrolledPercent)
    return () => {
      window.removeEventListener('scroll', setScrolledPercent)
    }
  }, [])

  useEffect(() => {
    if (
      !state.loading &&
      state.listWithCount.data.length < state.listWithCount.totalCount &&
      scrolled >= 0.8 &&
      scrolled <= 1
    )
      dispatch(fetchAction())
  }, [scrolled])
}
