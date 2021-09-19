import { Component, OnInit } from '@angular/core';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-category-side-bar',
  templateUrl: './category-side-bar.component.html',
  styleUrls: ['./category-side-bar.component.css'],
})
export class CategorySideBarComponent implements OnInit {
  categories: Category[];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {}
}
