'use client';

import { Question } from '@/lib/useCurrentQuestion';

type Props = {
  question: Question;
};

export default function TextInput({ question }: Props) {
  return (
    <div>
      <p>Text Input Component</p>
    </div>
  );
}
