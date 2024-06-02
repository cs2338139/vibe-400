import { useContext, useEffect, useRef, useState } from 'react';
import CardItem1 from './Card-Item-1';
import CardItem2 from './Card-Item-2';
import CardItem3 from './Card-Item-3';
import CardItem4 from './Card-Item-4';

export default function Card({ className }) {
  return (
    <div
      className={`relative flex flex-col gap-[1px] bg-pr-2 sm:flex-row sm:overflow-scroll ${className}`}>
      <div className="relative flex h-[630px] gap-[1px] sm:h-[680px]">
        <CardItem1 />
        <CardItem2 />
      </div>
      <div className="relative flex h-[326px] gap-[1px] sm:h-[680px]">
        <CardItem3 />
        <CardItem4 />
      </div>
    </div>
  );
}
