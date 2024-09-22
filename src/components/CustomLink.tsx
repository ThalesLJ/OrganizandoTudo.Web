import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useColors } from '../context/ColorContext';

interface CustomLinkProps extends LinkProps {
  className?: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, className, children, ...rest }) => {
  const { colors } = useColors();

  return (
    <Link
      to={to}
      className={className}
      style={{
        color: colors.primary,
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = colors.primaryTextTint)}
      onMouseLeave={(e) => (e.currentTarget.style.color = colors.primary)}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
