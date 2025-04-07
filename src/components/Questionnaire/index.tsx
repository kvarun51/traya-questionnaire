'use client';

import { Question } from '@/lib/useCurrentQuestion';
import FileUpload from './FileUpload';
import TelInput from './TelInput';
import TextInput from './TextInput';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';

type Props = {
  question: Question;
};

export default function Questionnaire({ question }: Props) {
  const renderQuestionComponent = () => {
    switch (question.type) {
      case 'multiple_choice':
        return <MultipleChoice question={question} />;
      case 'single_choice':
        return <SingleChoice question={question} />;
      case 'file':
        return <FileUpload question={question} />;
      case 'tel':
        return <TelInput question={question} />;
      case 'text':
        return <TextInput question={question} />;
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
