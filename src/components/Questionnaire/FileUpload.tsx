'use client';

import { Question } from '@/lib/useCurrentQuestion';

type Props = {
  question: Question;
};

export default function FileUpload({ question }: Props) {
  return (
    <div>
      <p>File Upload Component</p>
    </div>
  );
}