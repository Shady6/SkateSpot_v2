import React, { useState } from "react";
import { IGeoLocation } from "../../types/types";
import MapAddress from "./address/MapAddress";
import { IdFile } from "./image/FileImageUpload";
import ImageUpload from "./image/ImageUpload";
import { IdLink } from "./image/LinkImageUpload";

const AddTempSpotPage: React.FC = () => {
  const [location, setLocation] = useState<IGeoLocation | null>(null);
  const [files, setFiles] = useState<IdFile[]>([]);
  const [links, setLinks] = useState<IdLink[]>([]);

  return (
    <div>
      <MapAddress location={location} setLocation={setLocation} />
      <ImageUpload
        files={files}
        setFiles={setFiles}
        links={links}
        setLinks={setLinks}
      />
    </div>
  );
};

export default AddTempSpotPage;
