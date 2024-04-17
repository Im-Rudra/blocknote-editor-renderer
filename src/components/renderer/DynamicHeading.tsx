import React from 'react';

interface Props {
  level: number;
  children: React.ReactNode;
  className?: string;
}

const DynamicHeading = ({ level = 1, children, className }: Props) => {
  const HeadingTag = React.createElement('h' + level, { className: className }, children);

  return HeadingTag;
};

export default DynamicHeading;
