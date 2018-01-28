import {Injectable} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class ImageService {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement = new Image();
  imageData: any;
  pixels: any;
  numPixels: number;
  functions: Object = {};


  constructor() {
  }

  setCanvas = (c) => {
    this.canvas = c;
    this.context = this.canvas.getContext('2d');
  };

  filetoCanvas = (fileElement) => {
    if (fileElement.target.files && fileElement.target.files[0]) {
      // create new FileReader object. Name it 'reader'
      const reader: FileReader = new FileReader();
      // create eventlistener: When load event of 'reader' is complete
      reader.addEventListener("loadend", () => {
        console.log(reader.result);
        this.image.src = reader.result;
        this.image.addEventListener('load', this.resetImage);
      });

      // set the src of this.image to file data and when data is loaded to this.image, call resetImage().
      // Use addEventListener instead of onload
       
      
      // set the src of this.image to file data and when data is loaded to this.image, call resetImage().
      // Use addEventListener instead of onload
      // some help: http://stackoverflow.com/questions/22255580/javascript-upload-image-file-and-draw-it-into-a-canvas

      // uncomment the following
       reader.readAsDataURL(fileElement.target.files[0]);
    }
  };

  resetImage = () => {
    // set canvas width and height to be the same as of image
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    // use drawImage method to draw image to canvas
    this.context.drawImage(this.image, 0,0 );
    // Uncomment the following
    this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.pixels = this.imageData.data;
    console.log(this.pixels);
     this.numPixels = this.imageData.width * this.imageData.height;
     console.log(this.numPixels);
  };

  applyFilters = () => {
    this.resetImage();
    for (let i in this.functions) {
      if (this.functions.hasOwnProperty(i)) {
        this.functions[i]();
      }
    }
  }

  
}
