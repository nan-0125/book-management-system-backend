export class Book {
  constructor(
    id: number,
    name: string,
    author: string,
    description: string,
    cover: string,
  ) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.description = description;
    this.cover = cover;
  }
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}
