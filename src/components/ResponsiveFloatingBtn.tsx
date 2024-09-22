import React from 'react';
import { Link } from 'react-router-dom';

interface ResponsiveFloatingBtnProps {
  route: string;
  icon: React.ReactNode;
  iconSize: number;
  spanText: string;
}

const ResponsiveFloatingBtn: React.FC<ResponsiveFloatingBtnProps> = ({ route, icon, iconSize, spanText }) => {
  return (
      <Link to={route} className="floating-btn">
        {React.cloneElement(icon as React.ReactElement, { size: iconSize })}
        <span className="d-none d-md-block">{spanText}</span>
      </Link>
  );
};

export default ResponsiveFloatingBtn;
