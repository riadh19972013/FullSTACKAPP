import { Component, OnInit } from '@angular/core';

import { HttpClientService } from '../../service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;
  selectedBook: Book;
  action: string;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // bch yjina url y9olna chniya action el mawjouda
        this.action = params['action'];
	// yraja3 id mta3 book li nhebou nchofou details mte3ou ken action view
	const id = params['id'];
	// ken id mawjoud ytal3ou mel lista books
        if (id) {
          this.selectedBook = this.books.find(book => {
            return book.id === +id;
          });
        }
      }
    );
  }


  // tjina response mel base de donnes w bch nzidaha variable retrieved  
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();
    //njibou liste books li jetna mel api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {
    //instance lel classe book 
      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte=book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }
  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['admin', 'books'], { queryParams: { action: 'add' } });
  }
  viewBook(id: number) {
    this.router.navigate(['admin', 'books'], { queryParams: { id, action: 'view' } });
  }
}