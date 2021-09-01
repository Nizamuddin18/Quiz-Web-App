import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  //load all Quiz;
  public quiz(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
  
  //add Quiz
  public addNewQuiz(quiz: any){
    return this.http.post(`${baseUrl}/quiz/` , quiz);
  }

  //deleteQuiz
  public deleteQuiz(qid: any){
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
  }


  // get Single Quiz
  public getQuiz(qid: any){
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  // get Quiz of Particular Category
  public getQuizOfCategory(cid: any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

   // get Quiz of Particular Category and is Active
   public getActiveQuizOfCategory(cid: any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

   // get Active Quiz
   public getActiveQuiz(){
    return this.http.get(`${baseUrl}/quiz/active/`);
  }
  
  //update
  public update(quiz : any){
    return this.http.put(`${baseUrl}/quiz/` , quiz);
  }
}
