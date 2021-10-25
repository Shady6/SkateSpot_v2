import { DefaultAddress } from "../../types/types";
import { AddressDto } from "../../skate_spot_api/client";

const addressToHtml = (a: DefaultAddress | AddressDto) => (
  <div>
    <p>
      {a.country} {a.city}
    </p>
    <p>
      {a.streetName} {a.streetName && a.streetNumber}
    </p>
  </div>
);

export default addressToHtml;
