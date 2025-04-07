'use client';

import { Question } from '@/lib/useCurrentQuestion';

type Props = {
  question: Question;
};

export default function SingleChoice({ question }: Props) {
  return (
    <div>
      <p>Single Choice Component</p>
    </div>
  );
}
