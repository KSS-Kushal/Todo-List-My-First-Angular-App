import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() backgroundColor: string = '#008DDA';
  @Input() hoverBackgroundColor: string = '#41C9E2';
  hover:boolean = false;
  borderColor:string;
  hoverBorderColor: string;
  @Output() onClick = new EventEmitter()
  constructor() {
    this.borderColor= this.backgroundColor;
    this.hoverBorderColor = this.hoverBackgroundColor;
  }
  handleClick(){
    this.onClick.emit();
  }
  ngOnInit(): void {
    this.borderColor= this.backgroundColor;
    this.hoverBorderColor = this.hoverBackgroundColor;
  }
}
