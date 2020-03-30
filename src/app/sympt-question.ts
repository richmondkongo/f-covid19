import { Response } from './response';

export interface SymptQuestion {
    questId?: string;
    answers: string[];
    correct: Response;
    position?:number;
    prompt?:string;
    next?:string;
    prev?:string;
}
