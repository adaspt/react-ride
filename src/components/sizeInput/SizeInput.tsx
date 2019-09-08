import React from 'react';
import clsx from 'clsx';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const SizeInput: React.FC<Props> = ({ value, onChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => onChange(Number(e.target.value));

  return (
    <div className="btn-group btn-group-sm btn-group-toggle w-100">
      <label className={clsx('btn btn-secondary', value === 2 && 'active')}>
        <input type="radio" value={2} checked={value === 2} onChange={handleChange} /> 1/4
      </label>
      <label className={clsx('btn btn-secondary', value === 4 && 'active')}>
        <input type="radio" value={4} checked={value === 4} onChange={handleChange} /> 1/3
      </label>
      <label className={clsx('btn btn-secondary', value === 6 && 'active')}>
        <input type="radio" value={6} checked={value === 6} onChange={handleChange} /> 1/2
      </label>
      <label className={clsx('btn btn-secondary', value === 8 && 'active')}>
        <input type="radio" value={8} checked={value === 8} onChange={handleChange} /> 2/3
      </label>
      <label className={clsx('btn btn-secondary', value === 10 && 'active')}>
        <input type="radio" value={10} checked={value === 10} onChange={handleChange} /> 3/4
      </label>
      <label className={clsx('btn btn-secondary', value === 12 && 'active')}>
        <input type="radio" value={12} checked={value === 12} onChange={handleChange} /> Full
      </label>
    </div>
  );
};

export default SizeInput;
