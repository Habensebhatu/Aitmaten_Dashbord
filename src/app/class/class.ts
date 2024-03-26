import { v4 as uuidv4 } from 'uuid';
import { ImageUpdateModel } from './ImageUpdateModel';

export class Product {
      public productId: string;
      public categoryId: string;
      public title: string;
      public piecePrice: number;
      public cratePrice: number;
      public crate: number;
      public piece: number;
      public categoryName: string;
      public description: string;
      public isPopular: boolean;
      public imageUrls: ImageUpdateModel[];


      constructor(data: any) {
        this.productId = uuidv4();
        this.categoryId = data.categoryId
        this.title = data.title;
        this.piecePrice = data.piecePrice;
        this.cratePrice = data.cratePrice;
        this.crate = data.crate;
        this.piece = data.piece
        this.categoryName = data.categoryName;
        this.description = data.description;
        this.imageUrls = data.imageUrls;
        this.isPopular = data.isPopular;

    }

  }