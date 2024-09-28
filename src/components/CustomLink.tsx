import "../index.css";
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface CustomLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, className, children, ...rest }) => {
  return (
    <Link
      to={to}
      className={`custom-link ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
