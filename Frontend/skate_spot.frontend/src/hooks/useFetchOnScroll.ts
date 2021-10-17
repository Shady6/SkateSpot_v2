import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ListWithCount,
  WithSocial,
} from "../state/reducers/genericListViewReducer";
import { useRootState } from "../state/store";

export const useFetchOnScroll = (
  fetchAction: AsyncThunk<ListWithCount<WithSocial>, void, {}>
) => {
  const state = useRootState();
  const dispatch = useDispatch();

  const [scrolled, setScrolled] = useState(0);

  const setScrolledPercent = () => {
    setScrolled(
      document.documentElement.scrollTop /
        (document.documentElement.scrollHeight -
          document.documentElement.clientHeight)
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", setScrolledPercent);
    dispatch(fetchAction());

    return () => {
      window.removeEventListener("scroll", setScrolledPercent);
    };
  }, []);

  useEffect(() => {
    if (
      !state.tempSpotsState.loading &&
      state?.tempSpotsState?.listWithCount?.data?.length <
        state.tempSpotsState.listWithCount.totalCount &&
      scrolled >= 0.8 &&
      scrolled <= 1
    )
      dispatch(fetchAction());
  }, [scrolled]);
};
