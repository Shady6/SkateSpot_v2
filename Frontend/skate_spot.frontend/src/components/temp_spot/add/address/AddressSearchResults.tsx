import { Button } from "@material-ui/core";
import React from "react";
import { useError } from "../../../../hooks/small_text_feedback/useError";
import { IGeoLocation } from "../../../../types/types";

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
          <Button
            style={
              hoveredAddress === i ? { backgroundColor: "#363636" } : undefined
            }
            onClick={(_) => pickAddress(i)}
            onMouseEnter={setAddressIndex}
            onMouseLeave={() => setHoveredAddress(null)}
          >
            {`${i + 1}. ${l.toString()}`}
          </Button>
        </div>
      ));
    else
      return (
        <div>
          <span>{location.toString()}</span>
          <Button onClick={() => setShowMore(true)}>Show more</Button>
        </div>
      );
  };

  return <div>{render()}</div>;
};

export default AddressSearchResults;
