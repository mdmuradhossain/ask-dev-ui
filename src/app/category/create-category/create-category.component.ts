import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  category: Category;
  name = new FormControl('');
  description = new FormControl('');
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.createCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    });

    this.category = {
      name: '',
      description: '',
    };
  }

  ngOnInit(): void {}

  discard() {
    this.router.navigateByUrl('/');
  }

  createCategory() {
    this.category.name = this.createCategoryForm.get('name').value;
    this.category.description =
      this.createCategoryForm.get('description').value;

    this.categoryService.createCategory(this.category).subscribe(
      (data) => {
        this.router.navigateByUrl('/categories');
      },
      (error) => {
        throwError('Error occured', error);
      }
    );
  }
}
