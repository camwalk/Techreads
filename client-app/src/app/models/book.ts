export interface Book {
    id: number;
    authors: Author[];
    title: string;
    description: string;
    publisher: string;
    year: number;
    isbn: string;
    category: string;
    reviews: Review[];
}

interface Review {
    reviewer: string;
    review: string;
    rating: number;
}

interface Author {
    name: string;
}