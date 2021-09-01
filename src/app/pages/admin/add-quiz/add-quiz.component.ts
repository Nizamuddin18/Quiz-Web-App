import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quiz = {
    title : '',
    description : '',
    maxMarks : '',
    noOfQuestions : '',
    active : 'true',
    category : {
      cid : '',
      title : '',
      description : ''
    }
  }

  categories = [
    {
      cid : '',
      title : '',
      description : ''
    }
];
  constructor(
    private quizService : QuizService,
    private categoryService : CategoryService,
    private snack : MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data : any)=>{
        this.categories = data;
        console.log(data);
      },
      (error : any)=>{
        console.log(error);
        Swal.fire("Error!" , "Error in Loading Data from Server" , "error");
      }
    );
  }

  formSubmit(){
    if(this.quiz.title.trim() == '' || this.quiz.title.trim() == null){
      this.snack.open('Title is Required!' , '',{
        duration : 3000,
        horizontalPosition : 'center'
      });
      return;
    }
    this.quizService.addNewQuiz(this.quiz).subscribe(
      (data : any)=>{
        this.quiz.title = '';
        this.quiz.description = '';
        this.quiz.maxMarks = '';
        this.quiz.noOfQuestions = '';
        this.quiz.active  = 'false';
        this.quiz.category.cid = '';
        this.quiz.category.title = '';
        this.quiz.category.description = '';
        Swal.fire("Success!" , "Quiz is Added Successfully" , "success");
      },
      (error : any)=>{
        console.log(error);
        Swal.fire("Error!" , "Server Error" , "error");
      });
  }

}
