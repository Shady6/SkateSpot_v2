import React from "react";

interface Props {
  fontSize?: string;
  color: string;
  className?: string;
}

export const MarkerIcon: React.FC<Props> = ({
  fontSize = "1rem",
  color,
  className,
  children,
}) => {
  return (
    <i className={`fa fa-map-marker ${className}`} style={{ fontSize, color }}>
      {children}
    </i>
  );
};
