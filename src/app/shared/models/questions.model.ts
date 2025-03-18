export interface Question {
  id: string;
  label: string;
  placeholder?: string;
  type: string;
  mandatory?: boolean;
  validators: {}[];
  enabled?: boolean;
  allowed_values?: boolean;
  allow_upload?: boolean;
  multiple_answers?: boolean;
  sub_questions: Question[];
  options?: Option[];
  multiplechoice?: boolean;
  dependant_question?: string;
  predecessor?: string;
  initial_state?: string;
  min_value?: string;
  max_value?: string;
  currency?: any;
  company?: any;
  field_sets?: {
    label: string;
  };
}
export interface Option {
  id: string;
  label: string;
  question?: string;
  dependant_questions: string[];
}
export enum FieldValidators {
  EMAIL = 'email',
  PATTERN = 'pattern',
  MINLENGTH = 'minLength',
  MAXLENGTH = 'maxLength',
  MIN = 'min',
  MAX = 'max',
}
