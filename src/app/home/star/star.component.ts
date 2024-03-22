import { Component,Input, SimpleChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  @Input() Rating:number
  @Input() nameRating:string=""
  starWidth: number=0
  @Output() outRating:EventEmitter<string>=new EventEmitter<string>()
  constructor(){
    this.Rating=0
    this.starWidth=this.Rating*90/5;
  }
  ngOnChanges(): void {
      this.starWidth = this.Rating * 90 / 5;
  }
  
  viewRating(): void {
    this.outRating.emit(`Rating ${this.Rating}  ${this.nameRating}`);
  }
}

