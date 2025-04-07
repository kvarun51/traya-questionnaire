'use client';

import { useState } from 'react';
import { Radio, Button } from 'antd';
import type { Question } from '@/lib/useCurrentQuestion';
import { setQuestionProgress } from '@/lib/session';

type Props = {
  question: Question;
  onNext?: () => void;
};

export default function SingleChoice({ question, onNext }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Auto-submit after selection
    setQuestionProgress(question.id, value);
    if (onNext) onNext();
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Radio.Group onChange={handleChange} value={selectedValue}>
        {question.optionMap?.map((option, index) => (
          <Radio key={index} value={option.value}>
            {option.name}
          </Radio>
        ))}
      </Radio.Group>

      {/* Optional manual submit */}
      {/* <Button
        type="primary"
        onClick={() => {
          if (selectedValue) {
            setQuestionProgress(question.id, selectedValue);
            if (onNext) onNext();
          }
        }}
        style={{ marginTop: 12 }}
        disabled={!selectedValue}
      >
        Submit
      </Button> */}
    </div>
  );
}
