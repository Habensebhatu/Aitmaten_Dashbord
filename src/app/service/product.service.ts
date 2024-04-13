import { Injectable } from '@angular/core';
import { Product } from '../class/class';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  productsUpdated = new Subject<Product[]>();
  private readonly apiUrl = 'https://localhost:7087/api/Product';
  constructor(private http: HttpClient) { }

  setProducts(productData: FormData): Observable<Product> {
    console.log("productData", productData)
    return this.http.post<Product>(this.apiUrl, productData);
}

addProductToCache(product: Product): void {
  this.products.push(product);
  this.productsUpdated.next([...this.products]);
}


getProductsPageNumber(pageNumber: number, pageSize: number): Observable<Product[]>{
  console.log("pageNumber", pageNumber, "pageSize", pageSize)
 const observable = this.http.get<Product[]>(`${this.apiUrl}/PageNumber/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  observable.subscribe({
    next: pruducts => {
      this.products = pruducts;
    },
    error: error => {
      console.error('Error getting categories: ', error);
    }
  });

  return observable;
  }

  getProducts(): Observable<Product[]>{
   const observable = this.http.get<Product[]>(this.apiUrl);
    observable.subscribe({
      next: pruducts => {
        this.products = pruducts;
      },
      error: error => {
        console.error('Error getting categories: ', error);
      }
    });
  
    return observable;
    }

  getProductsBYCategory(category: string, pageNumber: number, pageSize: number): Observable<Product[]>{
    console.log("pageNumber", pageNumber, "pageSize", pageSize)
   const observable = this.http.get<Product[]>(`${this.apiUrl}/category/${category}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    observable.subscribe({
      next: pruducts => {
        this.products = pruducts;
      },
      error: error => {
        console.error('Error getting categories: ', error);
      }
    });
  
    return observable;
    }
    getProductsAllBYCategory(category: string): Observable<Product[]>{
     const observable = this.http.get<Product[]>(`${this.apiUrl}/GetProductsByCategory/${category}`);
      observable.subscribe({
        next: pruducts => {
          this.products = pruducts;
        },
        error: error => {
          console.error('Error getting categories: ', error);
        }
      });
    
      return observable;
      }

  showPopularOnlyProducts(): Observable<Product[]>{
   const observable = this.http.get<Product[]>(this.apiUrl);
    observable.subscribe({
      next: pruducts => {
        this.products = pruducts;
      },
      error: error => {
        console.error('Error getting categories: ', error);
      }
    });
  
    return observable;
    }

  getPopularProducts(): Product[] {
    return this.products.filter(product => product.isPopular);
  }
  

  removeProducts(product: Product): Observable<Product>  {
    return this.http.delete<Product>(`${this.apiUrl}/${product.productId}`);
  }
  
  updateProduct(formData: FormData) {
    console.log("formDataformData", formData)
    return this.http.put<Product>(this.apiUrl, formData);
  }
   
}
