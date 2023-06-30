import React, { CSSProperties } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import cn from 'classnames';

interface IProps {
  spinnerRef?(node?: Element | null): void;
  className?: string;
  style?: CSSProperties;
}

function Spinner({ className, spinnerRef, style }: IProps): React.ReactElement {
  return (
    <div ref={spinnerRef} className={cn('text-center animate-spin', className)} style={style}>
      <AiOutlineLoading3Quarters stroke="#ddd" strokeWidth={4} style={{ width: 40, height: 40 }} />
    </div>
  );
}
export default Spinner;
