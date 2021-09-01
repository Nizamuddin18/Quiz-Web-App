import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { __param } from 'tslib';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catid : any;
  quizzes : any;
  constructor(private categoryService : CategoryService,
    private quizService : QuizService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : any)=>{
      this.catid = params.catid;
      console.log("Category ID : " + this.catid);
      if(this.catid == 0){
        //load all quizzes
        this.quizService.getActiveQuiz().subscribe((data)=>{
          this.quizzes = data;
          console.log("Quizzes: " + this.quizzes);
        },
        (error  :any)=>{
          Swal.fire('Error!' , 'Error in Loading Quizzes!' , 'error');
          console.log(error);
        });
      }else{
        //load quizzes based on category
        this.quizService.getActiveQuizOfCategory(this.catid).subscribe((data : any)=>{
          this.quizzes = data;
        },
        (error : any)=>{
          Swal.fire('Error !' , 'Error in Loading Data' , 'error');
        });

      }
    },
    (error: any)=>{
      console.log(error);
    });
  }

}
