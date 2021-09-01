import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http : HttpClient
  ) { }

  // get  Question of Particular Quiz(Admin Use)
  public getQuestionOfQuiz(quizId: any){
    return this.http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

   // get Question of Particular Quiz(Test Use)
   public getQuestionOfQuizTest(quizId: any){
    return this.http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  //add Question
  public addNewQuestion(question: any){
    return this.http.post(`${baseUrl}/question/` , question);
  }

  //load all Question;
  public question(){
    return this.http.get(`${baseUrl}/question/`);
  }
  
  
  //delete Question
  public deleteQuestion(questionId: any){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  //update Question
  public updateQuestion(question : any){
    return this.http.put(`${baseUrl}/question/` , question);
  }
}
