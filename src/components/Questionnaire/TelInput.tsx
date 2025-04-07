'use client';

import { Question } from '@/lib/useCurrentQuestion';

type Props = {
  question: Question;
};

export default function TelInput({ question }: Props) {
  return (
    <div>
      <p>Telephone Input Component</p>
    </div>
  );
}
