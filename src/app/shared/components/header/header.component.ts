import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    const searchTerm = this.searchForm.get('searchQuery')?.value;
    if (searchTerm.trim() !== '') {
      this.router.navigate(['/products'], { queryParams: { search: searchTerm } });
    }
  }

  clearSearch(): void {
    this.searchForm.get('searchQuery')?.setValue('');
    this.router.navigate(['/products']);
  }
}