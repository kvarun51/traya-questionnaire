'use client';

import { useState } from 'react';
import { Question } from '@/lib/useCurrentQuestion';
import FileUpload from './FileUpload';
import TextInput from './TextInput';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';// import the function

type Props = {
  question: Question;
  getNextQuestion: () => Question | null;
};

export default function Questionnaire({ question, getNextQuestion }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(question);

  const onNext = () => {
    const next = getNextQuestion();
    if (next) {
      setCurrentQuestion(next); // update UI if client side only
      // OR if using routing: router.push(`/questionnaire/${next.id}`)
    } else {
      console.log('🎉 No more questions');
      // Redirect to summary page or thank you screen
    }
  };

  const renderQuestionComponent = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return <MultipleChoice key={question.id} question={currentQuestion} onNext={onNext} />;
      case 'single_choice':
        return <SingleChoice key={question.id} question={currentQuestion} onNext={onNext} />;
      case 'file':
        return <FileUpload key={question.id} question={currentQuestion} onNext={onNext} />;
      case 'text':
        return <TextInput key={question.id} question={currentQuestion} onNext={onNext} />;
      default:
        return <p>Unsupported question type: {currentQuestion.type}</p>;
    }
  };

  return (
    <div>
      <h2>{currentQuestion.text}</h2>
      {renderQuestionComponent()}
    </div>
  );
}
