'use client';

import { useEffect, useState } from 'react';
import { Radio, Button, Space } from 'antd';
import type { Question } from '@/lib/useCurrentQuestion';
import { setQuestionProgress } from '@/lib/session';
import { getStoredAnswer } from '@/lib/getStoredAnswer';

type Props = {
  question: Question;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function SingleChoice({ question, onNext, onPrev }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredAnswer(question.id);
    if (stored) setSelectedValue(stored);
  }, [question.id]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Radio.Group onChange={handleChange} value={selectedValue}>
        {question.optionMap?.map((option: any, index: number) => (
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
              localStorage.setItem('use_gender', selectedValue);
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
