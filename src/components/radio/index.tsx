import React from 'react';
import cn from 'classnames';

interface IProps
  extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'onChange'
  > {
  id: string;
  onChange?(value: IProps['value']): void;
}

const Radio = (props: IProps) => {
  return (
    <div className="radio">
      <input
        id={props.id}
        type="radio"
        name={props.name}
        value={props.value}
        checked={props.checked}
        className={cn('hidden', 'peer')}
        onChange={() => props.onChange?.(props.value)}
      />
      <label
        htmlFor={props.id}
        className={cn('border', 'rounded', 'px-3', 'py-2', 'peer-checked:bg-white', 'peer-checked:text-black')}
      >
        <span>{props.children}</span>
      </label>
    </div>
  );
};

export default Radio;
