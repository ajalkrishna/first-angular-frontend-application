import { Component, OnInit } from '@angular/core';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  globe=faGlobeAsia

  constructor() { }

  ngOnInit(): void {
  }

}
