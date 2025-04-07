'use client';

import { Question } from '@/lib/useCurrentQuestion';

type Props = {
  question: Question;
};

export default function MultipleChoice({ question }: Props) {
  return (
    <div>
      <p>Multiple Choice Component</p>
    </div>
  );
}
