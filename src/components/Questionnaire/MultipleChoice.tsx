'use client';

import { Checkbox, Button } from 'antd';
import { useEffect, useState } from 'react';
import { setQuestionProgress } from '@/lib/session';
import type { Question } from '@/lib/useCurrentQuestion';
import { getStoredAnswer } from '@/lib/getStoredAnswer';

type Props = {
  question: Question;
  onNext?: () => void;
  onPrev?: () => void;
};

export default function MultipleChoice({ question, onNext, onPrev }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const stored = getStoredAnswer(question.id);
    if (stored && Array.isArray(stored)) setSelected(stored);
  }, [question.id]);

  const handleChange = (checkedValues: any) => {
    setSelected(checkedValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestionProgress(question.id, selected);
    setSelected([]);
    if (onNext) onNext();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <Checkbox.Group
        value={selected}
        onChange={handleChange}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        {question.optionMap?.map((option: any, index: number) => (
          <Checkbox key={index} value={option.value}>
            {option.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
      {!question.first_question && <Button onClick={onPrev}>Prev</Button>}
      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: 12 }}
        disabled={selected.length === 0}
      >
        Submit
      </Button>
    </form>
  );
}
