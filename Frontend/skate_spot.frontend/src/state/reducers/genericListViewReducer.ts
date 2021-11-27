import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import {
  CommentDto,
  LikeDto,
  VerificationStatementDto,
} from '../../skate_spot_api/client'
import { getAllCommonThunks } from '../actions/thunk_creators/allCommonThunks'
import { ListViewTypes } from '../generic/listViewGenerics'

export interface WithId {
  id?: string
}

type NormalLikes = {
  likes: LikeDto[] | undefined
}
type VoteLikes = {
  verificationProcess: {
    votes: VerificationStatementDto[] | undefined
  }
}

type NormalComments = {
  comments: CommentDto[] | undefined
}

type VoteComments = {
  verificationProcess: {
    discussion: CommentDto[] | undefined
  }
}

export type WithLikes = NormalLikes | VoteLikes

export type WithComments = NormalComments | VoteComments

export type WithSocial = WithId & WithLikes & WithComments

export interface ListWithCount<T extends WithSocial> {
  data: T[]
  totalCount: number
}

export interface ListViewState<T extends WithSocial> {
  listWithCount: ListWithCount<T>
  paging: {
    take: number
    skip: number
  }
  loading: boolean
  error: boolean
}

export type ListViewImmerState = WritableDraft<ListViewState<WithSocial>>

export const listViewReducerHandlers = {
  like: {
    fulfilled: (
      state: ListViewImmerState,
      payload: {
        result: LikeDto[] | VerificationStatementDto[] | undefined
        listItemId: string
      }
    ) => {
      const { result, listItemId } = payload
      const listItem = state.listWithCount.data?.find(t => t.id === listItemId)

      if ((listItem as VoteLikes).verificationProcess)
        (listItem as VoteLikes).verificationProcess.votes =
          result as VerificationStatementDto[]
      else (listItem as NormalLikes).likes = result as LikeDto[]

      return listItem
    },
  },
}

export const reducerDefaultCases = (initialState: ListViewState<any>) => ({
  reset: () => initialState,
  setItems: (
    state: ListViewImmerState,
    action: PayloadAction<WithSocial[]>
  ) => {
    state.listWithCount = {
      data: action.payload,
      totalCount: state.listWithCount.totalCount,
    }
  },
})

export const addExtraReducerDefaultCases = (
  builder: ActionReducerMapBuilder<ListViewImmerState>,
  listViewType: ListViewTypes
) => {
  const thunks = getAllCommonThunks()[listViewType]
  builder
    .addCase(thunks.fetchListItems.pending, state => {
      state.loading = true
      state.error = false
    })
    .addCase(thunks.fetchListItems.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = false

      if (payload?.data?.length !== 0) {
        state?.listWithCount?.data?.push(...payload!.data)
        state.listWithCount.totalCount = payload!.totalCount
        state.paging.skip += state.paging.take
      }
    })
    .addCase(thunks.fetchListItems.rejected, state => {
      state.error = true
      state.loading = false
    })
    .addCase(thunks.comment.fulfilled, (state, { payload }) => {
      const { comment, listItemId } = payload
      const listItem = state.listWithCount.data?.find(t => t.id === listItemId)

      if ((listItem as VoteComments).verificationProcess)
        (listItem as VoteComments).verificationProcess.discussion?.unshift(
          comment
        )
      else (listItem as NormalComments).comments?.unshift(comment)
    })
    .addCase(thunks.deleteComment.fulfilled, (state, { payload }) => {
      const { commentId, listItemId } = payload
      const listItem = state.listWithCount.data?.find(t => t.id === listItemId)

      let comment =
        (listItem as VoteComments).verificationProcess?.discussion?.find(
          c => c.id === commentId
        ) ||
        (listItem as NormalComments).comments?.find(c => c.id === commentId)

      comment!.text = ''
      comment!.isDeleted = true
      comment!.author = { id: '', userName: undefined }
      comment!.authorId = undefined
    })
    .addCase(thunks.editComment.fulfilled, (state, { payload }) => {
      const { commentId, listItemId, newText } = payload
      const listItem = state.listWithCount.data?.find(t => t.id === listItemId)

      let comment =
        (listItem as VoteComments).verificationProcess?.discussion?.find(
          c => c.id === commentId
        ) ||
        (listItem as NormalComments).comments?.find(c => c.id === commentId)

      comment!.text = newText
    })
    .addCase(thunks.likeComment.fulfilled, (state, { payload }) => {
      const { result, subjectId, parentId } = payload
      const listItem = state.listWithCount.data?.find(t => t.id === parentId)
      let comment: CommentDto | undefined
      if ((listItem as VoteComments).verificationProcess)
        comment = (
          listItem as VoteComments
        ).verificationProcess.discussion?.find(c => c.id === subjectId)
      else
        comment = (listItem as NormalComments).comments?.find(
          c => c.id === subjectId
        )

      comment!.likes = result
    })
    .addCase(thunks.deleteListItem.fulfilled, (state, { payload }) => {
      state.listWithCount.data = state.listWithCount.data.filter(
        l => l.id !== payload.listItemId
      )
      state.listWithCount.totalCount--
    })
}
