'use client';

import { Question } from '@/lib/useCurrentQuestion';
import FileUpload from './FileUpload';
import TextInput from './TextInput';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';// import the function

type Props = {
  question: Question;
  getNextQuestion: () => Question | null;
  getPreviousQuestion: () => Question | null;
};

export default function Questionnaire({ question, getNextQuestion, getPreviousQuestion }: Props) {

  const onNext = () => {
    const next = getNextQuestion();
    if (!next)
      console.log('🎉 No more questions');
  };

  const renderQuestionComponent = () => {
    switch (question.type) {
      case 'multiple_choice':
        return <MultipleChoice key={question.id} question={question} onNext={onNext} />;
      case 'single_choice':
        return <SingleChoice key={question.id} question={question} onNext={onNext} onPrev={getPreviousQuestion} />;
      case 'file':
        return <FileUpload key={question.id} question={question} onNext={onNext} />;
      case 'text':
        return <TextInput key={question.id} question={question} onNext={onNext} onPrev={getPreviousQuestion} />;
      default:
        return <p>Unsupported question type: {question.type}</p>;
    }
  };

  return (
    <div>
      <h2>{question.text}</h2>
      {renderQuestionComponent()}
    </div>
  );
}
