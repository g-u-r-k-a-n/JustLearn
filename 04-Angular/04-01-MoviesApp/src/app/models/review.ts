export class Review {
    constructor(
        public readonly author: string,
        public readonly author_details: AuthorDetails,
        public readonly content: string,
        public readonly created_at: Date,
        public readonly id: string,
        public readonly updated_at: Date,
        public readonly url: string
    ) { }
}

class AuthorDetails {
    constructor(
        public readonly name: string,
        public readonly username: string,
        public readonly avatar_path: string,
        public readonly rating: number
    ) { }
}