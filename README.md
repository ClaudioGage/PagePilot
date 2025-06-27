# PagePilot Backend

Backend service for PagePilot bookstore platform built with NestJS, Prisma, and SQLite.

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

3. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm test` - Run tests
- `npm run prisma:studio` - Open Prisma Studio database browser
- `npm run db:reset` - Reset database and reseed

## API Usage Instructions

### API Documentation
Interactive API documentation is available at: `http://localhost:3000/api`

### Base URL
```
http://localhost:3000
```

### Authors Endpoints

- `GET /authors` - List all authors
- `POST /authors` - Create a new author
- `GET /authors/:id` - Get author by ID
- `PUT /authors/:id` - Update author by ID
- `DELETE /authors/:id` - Delete author by ID

### Books Endpoints

- `GET /books` - List all books
- `POST /books` - Create a new book
- `GET /books/:id` - Get book by ID
- `PUT /books/:id` - Update book by ID
- `DELETE /books/:id` - Delete book by ID
- `GET /books/favorites` - Get all favorite books
- `PUT /books/:id/favorite` - Toggle book favorite status

### Example Requests

#### Create Author
```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J.K. Rowling",
    "bio": "British author best known for the Harry Potter series",
    "birthYear": 1965
  }'
```

#### Create Book
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Harry Potter and the Philosopher'\''s Stone",
    "summary": "A young wizard discovers his magical heritage",
    "publicationYear": 1997,
    "authorId": "your-author-id-here"
  }'
```

#### Get All Books
```bash
curl http://localhost:3000/books
```

#### Toggle Book Favorite
```bash
curl -X PUT http://localhost:3000/books/your-book-id/favorite
```

### Response Format

All responses are in JSON format. Successful responses return the requested data, while errors return an error message with appropriate HTTP status codes.

### Database

The application uses SQLite with Prisma ORM. The database file (`dev.db`) is created automatically in the project root when you run the migration commands.
