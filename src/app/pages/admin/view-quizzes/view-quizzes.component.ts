import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qid : '',
      title : '',
      description : '',
      maxMarks : '',
      noOfQuestions : '',
      active : '',
      category : {
        "title" : "",
        "description" : ""
      }
    }
  ];
  constructor(private quizService : QuizService) { }

  ngOnInit(): void {
    this.quizService.quiz().subscribe(
      (data : any)=>{
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error : any)=>{
        console.log(error);
        Swal.fire("Error !" , "Error in loading data" , "error");
      }
    );
  }


  deleteQuiz(qid: any){
    Swal.fire({
      icon : 'info',
      title : "Are You Sure to Delete This Quiz ? ",
      confirmButtonText : 'Delete',
      showCancelButton : true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete

        this.quizService.deleteQuiz(qid).subscribe(
          (data : any)=>{
            Swal.fire('Success !' , "Quiz Deleted" , 'success');
            this.quizzes = this.quizzes.filter((quiz : any) => quiz.qid != qid);
          },
          (error : any)=>{
            Swal.fire('Error !' , "Error in Deletion" , 'error');
          }     
        );
      }
    })
  }
}

