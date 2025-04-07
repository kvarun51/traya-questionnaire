'use client';

import { useEffect, useState } from 'react';
import { Button, Spin } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { initializeOrGetSession } from '@/lib/session';

const Wrapper = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

function HomePageContent() {
  const [hasProgress, setHasProgress] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    const { hasProgress } = initializeOrGetSession();
    setHasProgress(hasProgress);
  }, []);

  if (hasProgress === null) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }

  const clickHandler = async () => {
    router.push('/questionnaire');
  };

  return (
    <Wrapper>
      <Title>Welcome to Traya Hair Test</Title>
      <Button type="primary" size="large" onClick={clickHandler}>
        {hasProgress ? 'Resume Hair Test' : 'Take Hair Test'}
      </Button>
    </Wrapper>
  );
}

export default HomePageContent;
