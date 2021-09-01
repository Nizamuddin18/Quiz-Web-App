import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qid : any;
  title : any;
  question = {
      content : '',
      image : '',
      option1 : '',
      option2 : '',
      option3 : '',
      option4 : '',
      answer : '',
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
    };

  constructor(private route : ActivatedRoute,
    private questionService : QuestionService,
    private snack : MatSnackBar,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params.qid;
    this.title = this.route.snapshot.params.title;
    this.question.quiz.qid = this.qid;
  }

  formSubmit(){
    if(this.question.content.trim() == '' || this.question.content.trim() == null){
      this.snack.open('Content is Required!' , '',{
        duration : 3000,
        horizontalPosition : 'center'
      });
      return;
    }
    this.questionService.addNewQuestion(this.question).subscribe(
      (data : any)=>{
        this.question.content = '';
        this.question.image = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3  = '';
        this.question.option4  = '';
        this.question.quiz.active = 'false';
        this.question.quiz.description = '';
        this.question.quiz.maxMarks = '';
        this.question.quiz.noOfQuestions = '';
        this.question.quiz.qid = '';
        this.question.quiz.title = '';
        this.question.quiz.category.cid = '';
        this.question.quiz.category.description = '';
        this.question.quiz.category.title = '';
        Swal.fire("Success!" , "Question is Added Successfully" , "success").then((e)=>{
          this.router.navigate(['/admin/questions']);
        });
      },
      (error : any)=>{
        console.log(error);
        Swal.fire("Error!" , "Server Error" , "error");
      });
  }
}
