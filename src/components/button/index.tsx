import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';

interface IProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

const Button = (props: IProps) => {
  return (
    <button
      {...props}
      className={cn('border rounded px-2 py-1 bg-black hover:bg-white hover:text-black', props.className)}
    />
  );
};

export default Button;
