import React from "react";
import { IGeoLocation } from "../../../../types/types";
import NoAddressFound from "./NoAddressFound";
import { useError } from "../../../../hooks/useError";

interface Props {
  fromGeocodeLocations: IGeoLocation[] | null;
  showMore: boolean;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  hoveredAddress: number | null;
  setHoveredAddress: React.Dispatch<React.SetStateAction<number | null>>;
  location: IGeoLocation | null;
  pickAddress: (i: number) => void;
}

const AddressSearchResults: React.FC<Props> = ({
  fromGeocodeLocations,
  showMore,
  setShowMore,
  hoveredAddress,
  setHoveredAddress,
  location,
  pickAddress,
}) => {
  const renderError = useError(() => {
    if (!location) return "No address found";
    return "";
  }, [location]);

  const setAddressIndex = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const addressIndex =
      Number(
        e.currentTarget.innerText.substr(
          0,
          e.currentTarget.innerText.indexOf(".")
        )
      ) - 1;
    setHoveredAddress(addressIndex);
  };

  const render = () => {
    if (!location) return renderError();
    else if (showMore)
      return fromGeocodeLocations!.map((l, i) => (
        <div key={l.getKey(i)}>
          <button
            style={
              hoveredAddress === i
                ? { backgroundColor: "rgb(255,50,0)" }
                : undefined
            }
            onClick={(_) => pickAddress(i)}
            onMouseEnter={setAddressIndex}
            onMouseLeave={() => setHoveredAddress(null)}
          >
            {`${i + 1}. ${l.toString()}`}
          </button>
        </div>
      ));
    else
      return (
        <div>
          <button>{location.toString()}</button>
          <button onClick={() => setShowMore(true)}>Show more</button>
        </div>
      );
  };

  return <div>{render()}</div>;
};

export default AddressSearchResults;
