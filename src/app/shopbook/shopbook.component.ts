import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/Book';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css']
})
export class ShopbookComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;
  cartBooks: any;

  constructor(private router: Router, private httpClientService: HttpClientService) { }


  ngOnInit() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  //accéder à un objet local Storage.
  let data = localStorage.getItem('cart');
    if (data !== null) {
      this.cartBooks = JSON.parse(data);
    } else {
      this.cartBooks = [];
    }
  }


  //database  
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();

    //retenue mel api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {

      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }
  addToCart(bookId) {
    let book = this.books.find(book => {
      return book.id === +bookId;
    });
    let cartData = [];
    let data = localStorage.getItem('cart');
    //prse it to json 
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    cartData.push(book);
    //updated the cartBooks
    this.updateCartData(cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));
    book.isAdded = true;
  }

  updateCartData(cartData) {
    this.cartBooks = cartData;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartBooks = [];
    localStorage.clear();
  }

}
