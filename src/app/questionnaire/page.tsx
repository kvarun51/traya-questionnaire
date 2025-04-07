'use client';

import { useCurrentQuestion } from '@/lib/useCurrentQuestion';
import Questionnaire from '@/components/Questionnaire';
import { Spin } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default function QuestionnairePage() {
  const currentQuestion = useCurrentQuestion();
console.log(currentQuestion)
  if (!currentQuestion) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Questionnaire question={currentQuestion} />
    </Wrapper>
  );
}
