import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{

  @Input()
  public gif! : Gif

  //se va a ejecutar cuando el componente se está inicializando
  ngOnInit(): void {
    //si gif es nulo entonces lanza un error
    if (!this.gif) throw new Error('Gif property is required');
  }

}
