'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { CountryIcon } from '@/constant/region';
import { regionAtom } from '@/recoil/region';

const Region = () => {
  const [region, setRegion] = useRecoilState(regionAtom);
  const onRegionChange = (_region: number) => setRegion(_region);

  return (
    <div className="fixed top-2 right-2">
      <select
        className="border rounded bg-black p-2"
        defaultValue={region}
        onChange={(e) => onRegionChange(Number(e.target.value))}
      >
        {Object.entries(CountryIcon).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Region;
