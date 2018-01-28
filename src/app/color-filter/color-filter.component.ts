import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-color-filter',
  templateUrl: './color-filter.component.html',
  styleUrls: ['./color-filter.component.css']
})
export class ColorFilterComponent implements OnInit {

  private red: any = 0;
  private green: any = 0;
  private blue: any = 0;
  private strength: any = 0;

  constructor(private imageService: ImageService) {
  }


  private colorFilter = () => {
    // change brighness and contrast
    for (let i = 0; i < this.imageService.numPixels; i++) {
      this.imageService.pixels[i * 4] = this.imageService.pixels[i * 4] +
         this.red % (101 - this.strength);
      this.imageService.pixels[i * 4 + 1] = this.imageService.pixels[i * 4 + 1] +
      this.green % (101 - this.strength);
      this.imageService.pixels[i * 4 + 2] = this.imageService.pixels[i * 4 + 2] +
        this.blue % (101 - this.strength);
    }

    this.imageService.context.clearRect(0, 0, this.imageService.canvas.width, this.imageService.canvas.height);
    this.imageService.context.putImageData(this.imageService.imageData, 0, 0);

  };

  ngOnInit() {
    // Uncomment the following
    this.imageService.functions.colorFilter = this.colorFilter;
  }

}
