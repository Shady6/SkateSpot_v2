import { useInfo } from "../../../hooks/useInfo";
import { IGeoLocation } from "../../../types/types";

interface Props {
  location: IGeoLocation | null;
}

const ClickSearchResult: React.FC<Props> = ({ location }) => {
  const renderError = useInfo(() => {
    if (!location?.address)
      return "No address found but location of spot has been saved";
    return "";
  }, [location]);

  const render = () => {
    if (location?.address)
      return <p className="text-sm">{location.toString()}</p>;
    else return renderError();
  };

  return <div>{render()}</div>;
};

export default ClickSearchResult;
