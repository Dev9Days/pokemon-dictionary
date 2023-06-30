import React, { useState } from 'react';
import { LiaSearchSolid, LiaTimesSolid } from 'react-icons/lia';
import { Else, If, Then } from 'react-if';
import Button from '../button';

interface IProps {
  searchNo: number;
  onSearch(no: number): void;
}

const Search = ({ searchNo, onSearch }: IProps) => {
  const [input, setInput] = useState('');
  const search = () => {
    const no = Number(input);
    if (!input) {
      onSearch(0);
      return;
    }
    if (Number.isNaN(no)) {
      alert('올바른 포켓몬 번호를 입력해주세요.');
      return;
    }
    if (no < 1 || no > 1010) {
      alert('1 ~ 1010 사이의 번호를 입력해주세요.');
      return;
    }
    onSearch(no);
  };
  const clear = () => {
    setInput('');
    onSearch(0);
  };
  return (
    <div className="flex mb-6">
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="포켓몬 번호로 검색하세요."
        className="border rounded bg-black px-3 py-2 w-full"
        onKeyDown={({ code }) => (code === 'Enter' || code === 'NumpadEnter') && search()}
        onInput={(e) => setInput(e.currentTarget.value)}
      />
      <div className="ml-2">
        <If condition={searchNo}>
          <Then>
            <Button className="border-0" onClick={clear}>
              <LiaTimesSolid style={{ width: 38, height: 38 }} />
            </Button>
          </Then>
          <Else>
            <Button className="border-0" onClick={search}>
              <LiaSearchSolid style={{ width: 38, height: 38 }} />
            </Button>
          </Else>
        </If>
      </div>
    </div>
  );
};

export default Search;
