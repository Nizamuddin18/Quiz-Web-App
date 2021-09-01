import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid : any;
  catid : any;
  quiz : any;
  constructor(
    private route : ActivatedRoute,
    private quizService : QuizService
  ) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params.qid;
    this.catid = this.route.snapshot.params.catid;
    console.log("Quiz ID received from Activated Routes : " + this.qid);
    console.log("Category ID received from Activated Routes : " + this.catid);
    this.quizService.getQuiz(this.qid).subscribe((data  :any)=>{
      console.log(data);
      this.quiz = data;
    },
    (error : any)=>{
      Swal.fire('Error ! ' , 'Error in Loading Quiz Data' , 'error');
    });
  }

}
