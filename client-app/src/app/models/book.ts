
    export interface Book
    {
        id: number;
        authors: string;
        title: string;
        description: string;
        publisher: string;
        year: number;
        isbn: string;
        category: string;
        ratings: number[];
        reviews: Review[];
    }

    interface Review {
        reviewer: string;
        review: string;
    }