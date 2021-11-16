import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useFetchOnScroll } from "../../hooks/useFetchOnScroll";
import { useRootState } from "../../state/store";
import "../spot_common/styles.scss";
import { Spot } from "./Spot";
import { ListViewTypes } from "../../state/generic/listViewGenerics";
import { getAllThunks } from "../../state/actions/thunk_creators/allThunks";

interface Props {}

const Spots: React.FC<Props> = () => {
  const state = useRootState();
  useFetchOnScroll(getAllThunks().spots.fetchListItems, ListViewTypes.SPOTS);

  return (
    <>
      <div className="container mt-5" style={{ fontSize: "1rem" }}>
        {state.spotsState.listWithCount?.data?.map((t) => {
          return <Spot key={t.name} spot={t} />;
        })}
        {state.spotsState.loading && <CircularProgress color="primary" />}
      </div>
    </>
  );
};

export default Spots;
