import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent implements OnInit {

  @Input() text!: string;
  @Input() fontSize = 14;
  @Input() fontWeight = 400;
  @Input() color = '#414141';
  @Input() className: any = '';

  constructor(){}
  ngOnInit(): void {
      
  }
}
