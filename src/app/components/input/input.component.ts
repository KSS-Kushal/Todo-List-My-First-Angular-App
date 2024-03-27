import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextComponent } from '../text/text.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, TextComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() id!: string;
  @Input() type: string = 'text';
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() name!: string;
  @Input() value: string = '';

  @Output() handleChange = new EventEmitter();

  onChange(value: string){
    this.handleChange.emit(value);
  }
}
