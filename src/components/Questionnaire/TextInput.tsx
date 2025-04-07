'use client';

import { Input, Button, Space } from 'antd';
import { useEffect, useState } from 'react'; // ✅ updated
import { setQuestionProgress } from '@/lib/session';
import type { Question } from '@/lib/useCurrentQuestion';
import { getStoredAnswer } from '@/lib/getStoredAnswer'; // ✅ new

type Props = {
    question: Question;
    onNext?: () => void;
    onPrev?: () => void;
};

export default function TextInput({ question, onNext, onPrev }: Props) {
    const [value, setValue] = useState('');

    useEffect(() => {
        const stored = getStoredAnswer(question.id);
        if (stored) setValue(stored);
    }, [question.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        setQuestionProgress(question.id, value);
        setValue('');
        if (onNext) onNext();
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type your answer..."
                autoFocus={true}
            />
            <Space style={{ marginTop: 12 }}>
                {!question.first_question && <Button onClick={onPrev}>Prev</Button>}
                <Button type="primary" htmlType="submit" disabled={!value}>
                    Submit
                </Button>
            </Space>
        </form>
    );
}
