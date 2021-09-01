import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  qid = "";
  quiz: any;
  categories : any;
  constructor(
    private route : ActivatedRoute,
    private quizService : QuizService,
    private categoryService : CategoryService,
    private router : Router) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params.qid;
    this.quizService.getQuiz(this.qid).subscribe(
      (data : any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error : any)=>{
        console.log(error);
      }
    );

    this.categoryService.categories().subscribe(
      (data : any)=>{
        this.categories = data;
      },
      (error : any)=>{
        console.log(error);
      }
    );
  }

  public updateData(){
   this.quizService.update(this.quiz).subscribe(
     (data : any)=>{
      Swal.fire("Updated !" , "Quiz Updated Sucessfully " , 'success').then((e)=>{
        this.router.navigate(['/admin/quizzes']);
      });

     },
     (error  :any)=>{
      Swal.fire("Error !" , "Error in Updating " , 'error');
     }
   );
  }
}
