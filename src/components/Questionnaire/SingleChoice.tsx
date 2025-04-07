'use client';

import { useState } from 'react';
import { Radio, Button, Space } from 'antd';
import type { Question } from '@/lib/useCurrentQuestion';
import { setQuestionProgress } from '@/lib/session';

type Props = {
  question: Question;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function SingleChoice({ question, onNext, onPrev }: Props) {
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

      <Space style={{ marginTop: 12 }}>
        {!question.first_question && <Button onClick={onPrev}>Prev</Button>}
        <Button
          type="primary"
          onClick={() => {
            if (selectedValue) {
              setQuestionProgress(question.id, selectedValue);
              if (onNext) onNext();
            }
          }}
          disabled={!selectedValue}
        >
          Submit
        </Button>
      </Space>
    </div>
  );
}
