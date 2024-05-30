import { useContext, useEffect, useRef, useState } from 'react';
import CardItem1 from './Card-Item-1';

export default function Card({ className }) {
  return (
    <div
      className={`flex h-[37.6875rem] gap-[1px] bg-pr-2 sm:overflow-scroll ${className}`}>
      <CardItem1></CardItem1>
      <CardItem1></CardItem1>
    </div>
  );
}
