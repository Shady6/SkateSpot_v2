import { useEffect } from "react";

export const useScript = (url: string) => {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) return;

    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
