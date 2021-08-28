import { useEffect, useState } from "react";

export const useError = (
  getError: () => string,
  dependencyArray: Array<any>
) => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const error = getError();
    setError(error);

    if (error) {
      const timeout = setTimeout(() => setError(""), 6000);
      return () => clearTimeout(timeout);
    }
  }, dependencyArray);

  const renderError = () => {
    if (error) {
      return <p className={"text-danger text-sm"}>{error}</p>;
    }
  };

  return renderError;
};
