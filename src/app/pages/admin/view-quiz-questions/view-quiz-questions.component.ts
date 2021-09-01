import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qid  :any;
  title : any;
  questions = [
    {
      answer : '',
      content : '',
      image : '',
      option1 : '',
      option2 : '',
      option3 : '',
      option4 : '',
      quesId : '',
      quiz : {
        "active" : "",
        "category" : {
          "cid" : "",
          "description" : "",
          "title" : ""
        },
        "description" : "",
        "maxMarks" : "",
        "noOfQuestions" : "",
        "qid" : "",
        "title" : "",
      }
    }
  ];
  constructor(
    private route : ActivatedRoute,
    private questionService : QuestionService
  ) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params.qid;
    this.title = this.route.snapshot.params.title;
    this.questionService.getQuestionOfQuiz(this.qid).subscribe(
    (data  :any)=>{
      console.log(data);
      this.questions = data;
    }, 
    (error : any)=>{
      console.log(error);
    }
    );
  }

  public deleteQuestion(quesId : any){
    Swal.fire({
      icon : 'info',
      showCancelButton : true,
      confirmButtonText : 'Delete',
      title : 'Are you sure , want to Delete this Question'
    }).then((result)=>{
      if(result.isConfirmed){
        //confirm Delete

        this.questionService.deleteQuestion(quesId).subscribe(
          (data  :any)=>{
            Swal.fire('Deleted!' , 'Question Deleted Successfully!' , 'success');
            this.questions = this.questions.filter((question : any) => question.quesId != quesId);
          },
          (error : any)=>{
            Swal.fire('Erroe!' , 'Could not Delete Question!' , 'error');
          }
        );

      }
    }); 

  }

  public update(){
    alert('Update');
  }

}
