import { SymptQuestion } from './sympt-question';

export interface Questionnaire {
    questions: SymptQuestion[];
    quiz_title: string;
    quiz_description?:string;
    referrence?:string;
}
