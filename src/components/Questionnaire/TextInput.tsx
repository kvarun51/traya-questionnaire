'use client';

import { Input, Button, Space } from 'antd';
import { useState } from 'react';
import { setQuestionProgress } from '@/lib/session';
import type { Question } from '@/lib/useCurrentQuestion';

type Props = {
    question: Question;
    onNext?: () => void;
    onPrev?: () => void;
};

export default function TextInput({ question, onNext, onPrev }: Props) {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        setQuestionProgress(question.id, value);
        setValue(''); // Clear the input field
        if (onNext) onNext();
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type your answer..."
            />
            <Space style={{ marginTop: 12 }}>
                {!question.first_question && <Button onClick={onPrev}>Prev</Button>}
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Space>
        </form>
    );
}
