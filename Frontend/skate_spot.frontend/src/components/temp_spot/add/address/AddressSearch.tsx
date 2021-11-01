import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { GeoLocation } from "../../../../classes/GeoLocation";
import { useInputState } from "../../../../hooks/util/useInputState";
import { Geocode, IGeoLocation } from "../../../../types/types";

interface Props {
  setGeocodeLocations: React.Dispatch<
    React.SetStateAction<IGeoLocation[] | null>
  >;
  setLocation: React.Dispatch<React.SetStateAction<IGeoLocation | null>>;
  setShowClickMarker: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressSearch: React.FC<Props> = ({
  setGeocodeLocations,
  setLocation,
  setShowClickMarker,
  setShowMore,
}) => {
  const [addressSearchQuery, setAddressSearchQuery] = useInputState("");
  const dispatch = useDispatch();

  const geocodeAddress = async () => {
    setShowMore(false);
    if (!addressSearchQuery) return;

    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=
        ${encodeURIComponent(
          addressSearchQuery
        )}&format=json&addressdetails=1`);
    if (res.status !== 200) {
      // TODO flash message can't search by address right now
      return;
    }
    const geocodes: Geocode[] = (await res.json()) || [];
    setGeocodeLocations(geocodes.map((g) => GeoLocation.FromGeocode(g)));
    setLocation(
      geocodes.length > 0 ? GeoLocation.FromGeocode(geocodes[0]) : null
    );
    setShowClickMarker(false);
  };

  return (
    <>
      <div className={"mb-2"}>Search by address</div>
      <div className="d-flex mb-2">
        <TextField
          className={"me-1"}
          value={addressSearchQuery}
          onChange={setAddressSearchQuery}
          type="text"
          label="Address"
          variant="standard"
          onKeyDown={(e) => {
            if (e.key === "Enter") geocodeAddress();
          }}
        />
        <Button
          variant="contained"
          className={"px-2 py-0"}
          onClick={geocodeAddress}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default AddressSearch;
