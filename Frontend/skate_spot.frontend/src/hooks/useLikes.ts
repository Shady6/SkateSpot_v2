import _ from "lodash";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { likeThunkCreator } from "../state/actions/genericListViewActions";
import { useRootState } from "../state/store";

interface LikeArgs {
  subjectId: string;
  parentId: string;
  likes: {
    userId: string;
    positive: boolean;
  }[];
  likeAction: ReturnType<typeof likeThunkCreator>;
}

export const useLikes = ({
  subjectId,
  parentId,
  likes,
  likeAction,
}: LikeArgs) => {
  const dispatch = useDispatch();
  const authState = useRootState().auth;

  const countPositiveLikes = useCallback(
    () => likes.reduce((prev, curr) => prev + Number(curr.positive), 0),
    [likes]
  );

  const getUserLike = () =>
    _.first(likes.filter((v) => v.userId === authState?.content?.id));

  const like = async (isPositive: boolean) => {
    const userPrevLike = getUserLike();
    let deletedLike = false;
    if (userPrevLike && userPrevLike.positive === isPositive)
      deletedLike = true;

    dispatch(likeAction({ isPositive, deletedLike, subjectId, parentId }));
  };

  return [
    {
      highlited: getUserLike()?.positive === true,
      onClick: async () => await like(true),
      isPositive: true,
      likesCount: countPositiveLikes(),
    },
    {
      highlited: getUserLike()?.positive === false,
      onClick: async () => await like(false),
      isPositive: false,
      likesCount: likes.length - countPositiveLikes(),
    },
  ];
};
