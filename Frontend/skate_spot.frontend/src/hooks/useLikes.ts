import _ from "lodash";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRootState } from "../state/store";

interface LikeArgs {
  subjectId: string;
  likes: {
    userId: string;
    isPositive: boolean;
  }[];
  likeAction: (
    subjectId: string,
    isPositive: boolean,
    deletedLike: boolean
  ) => any;
}

export const useLikes = ({ subjectId, likes, likeAction }: LikeArgs) => {
  const dispatch = useDispatch();
  const authState = useRootState().auth;

  const countPositiveLikes = useCallback(
    () => likes.reduce((prev, curr) => prev + Number(curr.isPositive), 0),
    [likes]
  );

  const getUserLike = () =>
    _.first(likes.filter((v) => v.userId === authState?.content?.id));

  const like = async (isPositive: boolean) => {
    const userPrevLike = getUserLike();
    let deletedLike = false;
    if (userPrevLike && userPrevLike.isPositive === isPositive)
      deletedLike = true;

    dispatch(likeAction(subjectId, isPositive, deletedLike));
  };

  return [
    {
      highlited: getUserLike()?.isPositive === true,
      onClick: async () => await like(true),
      isPositive: true,
      likesCount: countPositiveLikes(),
    },
    {
      highlited: getUserLike()?.isPositive === false,
      onClick: async () => await like(false),
      isPositive: false,
      likesCount: likes.length - countPositiveLikes(),
    },
  ];
};
