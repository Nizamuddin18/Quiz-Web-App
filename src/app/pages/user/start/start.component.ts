import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid : any;
  catid : any;
  timer : any;
  questions : any;
  marksScored = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  event: any;
  constructor(private location : LocationStrategy,
    private route : ActivatedRoute,
    private questionService : QuestionService
    ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params.qid;
    this.catid = this.route.snapshot.params.catid;
    console.log("Quiz ID received from Activated Route : " + this.qid);
    console.log("Category ID received from Activated Route : " + this.catid);
    this.questionService.getQuestionOfQuizTest(this.qid).subscribe((data  :any)=>{
      console.log(data);
      this.questions = data;
      this.startTimer();
      this.timer = this.questions[0].quiz.noOfQuestions * 60;
      this.questions.forEach((q)=>{
        q['givenAnswers'] = '';
      });
    },
    (error : any)=>{
      Swal.fire('Error ! ' , 'Error in Loading Questions' , 'error');
    });
  }

  onRightClick() {
    this.event.preventDefault();
  }

  preventBackButton(){
    history.pushState(null , '' , this.location.getBaseHref());
    this.location.onPopState(()=>{
      history.pushState(null , '' , this.location.getBaseHref());

    });
  }

  evaluateQuiz(){
    this.isSubmit = true;
    this.questions.forEach(q => {
      if(q.givenAnswers == q.answer){
        this.correctAnswers++;
        let singleQuestionMarks = this.questions[0].quiz.maxMarks/this.questions[0].quiz.noOfQuestions;
        this.marksScored += singleQuestionMarks;
      }

      if(q.givenAnswers.trim() != ''){
        this.attempted++;
      }
    });
    console.log("Total Correct Answers : " + this.correctAnswers);
    console.log("Total Marks Scored : " + this.marksScored);
    console.log("Total Number of Questions Attempted : " + this.attempted);
  }

  submitQuiz(){
    Swal.fire({
      title : 'Do You want to Submit the Quiz ? ',
      showCancelButton : true,
      confirmButtonText : 'Submit',
      icon : 'info',
    }).then((result)=>{
      if(result.isConfirmed){
        this.evaluateQuiz();
      }else if(result.isDenied){
        Swal.fire('Changes are not saved' , ''  , 'warning');
      }
    },
    );
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer <= 0){
        this.evaluateQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  getFormattedTimer(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm*60;
    return `${mm} min : ${ss} sec`;
  }
}
