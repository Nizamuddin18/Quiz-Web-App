import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  categories : any;
  constructor(private categoryService : CategoryService,
    private snack : MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data)=>{this.categories = data;},(error)=>{
      this.snack.open('Error in Loading Categories from Server !' , '' , {
        duration : 3000,
      });
    });
  }

}
