import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-to-top-button',
  templateUrl: './go-to-top-button.component.html',
  styleUrls: ['./go-to-top-button.component.css']
})

export class GoToTopButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let goToTopButton = document.getElementById("go-to-top")!;
    goToTopButton.hidden = true;
    window.onscroll = (e) => {
        if (window.scrollY !== 0) {
            goToTopButton.hidden = false;
        } else {
            goToTopButton.hidden = true;
        }
    };
    goToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
