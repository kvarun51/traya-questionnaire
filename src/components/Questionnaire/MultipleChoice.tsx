'use client';

import { Checkbox, Button } from 'antd';
import { useState } from 'react';
import { setQuestionProgress } from '@/lib/session';
import type { Question } from '@/lib/useCurrentQuestion';

type Props = {
  question: Question;
  onNext?: () => void;
};

export default function MultipleChoice({ question, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (checkedValues: any) => {
    setSelected(checkedValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestionProgress(question.id, selected);
    setSelected([]); // Clear selections after submit
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <Checkbox.Group
        value={selected}
        onChange={handleChange}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {question.optionMap?.map((option, index) => (
          <Checkbox key={index} value={option.value}>
            {option.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Button type="primary" htmlType="submit" style={{ marginTop: 12 }}>
        Submit
      </Button>
    </form>
  );
}
