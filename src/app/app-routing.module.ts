import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
{
  path : '',
  component : HomeComponent,
  pathMatch : 'full',
},
{
  path : 'signup',
  component : SignupComponent,
  pathMatch : 'full',
},
{
  path : 'start/:catid/:qid',
  component : StartComponent,
},
{
  path : 'login',
  component : LoginComponent,
  pathMatch : 'full',
},{
  path : 'admin',
  component : AdminDashboardComponent,
  canActivate : [AdminGuard],
  children : [
    {
      path : 'profile',
      component : ProfileComponent,
    },
    {
      path : '',
      component : WelcomeComponent,
    },
    {
      path : 'categories',
      component : ViewCategoriesComponent,
    },
    {
      path : 'add-category',
      component : AddCategoryComponent,
    },
    {
      path : 'quizzes',
      component : ViewQuizzesComponent,
    },
    {
      path : 'add-quiz',
      component : AddQuizComponent,
    },
    {
      path : 'quiz/:qid',
      component : UpdateQuizComponent,
    },
    {
      path : 'view-questions/:qid/:title',
      component : ViewQuizQuestionsComponent,
    },
    {
      path : 'add-questions/:qid/:title',
      component : AddQuestionComponent,
    }
  ]
},{
  path : 'user-dashboard',
  component : UserDashboardComponent,
  canActivate : [UserGuard],
  children : [
    {
      path : ':catid',
      component : LoadQuizComponent,
    },
    {
      path : '',
      component : LoadQuizComponent,
    },
    {
      path : ':catid/instructions/:qid',
      component : InstructionsComponent,
    },
    
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
