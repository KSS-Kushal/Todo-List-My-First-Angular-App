import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [CommonModule, TextComponent],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.css'
})
export class CheckBoxComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() value: boolean = false;
  @Output() onClick = new EventEmitter();

  onCheckBoxClick(){
    this.onClick.emit();
  }
}
