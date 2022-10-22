import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  title = 'Q3.3.1 Grouping in Report Builder (Composition and Profile Report)';
  mvps = {}

  constructor() { }

  ngOnInit(): void {
  }

  onSelectMVP(mvp?: string) {
    console.log(mvp)
  }

}
