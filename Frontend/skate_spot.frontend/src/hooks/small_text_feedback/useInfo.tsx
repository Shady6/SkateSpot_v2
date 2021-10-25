import { useState, useEffect } from "react";

export const useInfo = (getInfo: () => string, dependencyArray: Array<any>) => {
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    const info = getInfo();
    setInfo(info);
  }, dependencyArray);

  const renderInfo = () => {
    if (info) {
      return <p className={"text-info text-sm"}>{info}</p>;
    }
  };

  return renderInfo;
};
