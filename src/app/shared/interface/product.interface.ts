export interface FeaturedProduct {
    _id: string,
    reviews: [],
    name: string,
    price: number,
    quantity: number,
    images: [],
    isFeatured: boolean,
    totalReview: number,
    avgStars: number | null;
}