# Ecommerce Website

This is an ecommerce website where users can browse and purchase products. The website includes a user-friendly interface for filtering products by category, brand, description, rating, and searching for specific products. Users can also add products to their cart and place orders.


[![Video](https://img.youtube.com/vi/RxHY2A4TqNo/0.jpg)](https://www.youtube.com/watch?v=RxHY2A4TqNo "Watch the video")

[Frontend Website Repo](https://github.com/anoop102910/shoploom-next-js)

## Features

- User registration and login
- Product browsing and filtering
- Product details and reviews
- Product addition to cart and order placement
- Admin panel for adding new categories, brands, and products
- Detailed statistics of the ecommerce website

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Joi for data validation
- Cloudinary for image hosting


## Entities

- User
- Category
- Brand
- Product
- Review
- Address
- WishlistItem
- CartItem
- Order
- OrderItem

## API Endpoints

### Authentication Routes

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

### User Routes

- GET /api/users/me
- PUT /api/users/update-profile
- GET /api/users/
- PUT /api/users/:id

### Brand Routes

- POST /api/brands/
- GET /api/brands/
- GET /api/brands/:id
- PUT /api/brands/:id
- DELETE /api/brands/:id

### Product Routes

- POST /api/products/
- GET /api/products/
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id

### Category Routes

- POST /api/categories/
- GET /api/categories/
- GET /api/categories/:id
- PUT /api/categories/:id
- DELETE /api/categories/:id

### Cart Item Routes

- POST /api/cartitems/
- GET /api/cartitems/
- DELETE /api/cartitems/:id

### Wishlist Item Routes

- POST /api/wishlistitems/
- GET /api/wishlistitems/
- DELETE /api/wishlistitems/:id

### Address Routes

- POST /api/addresses/
- GET /api/addresses/
- GET /api/addresses/:id
- PUT /api/addresses/:id
- DELETE /api/addresses/:id

### Review Routes

- POST /api/reviews/
- GET /api/reviews/
- GET /api/reviews/:id
- PUT /api/reviews/:id
- DELETE /api/reviews/:id

### Order Routes

- POST /api/orders/
- GET /api/orders/
- GET /api/orders/:id
- PUT /api/orders/:id

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add the necessary environment variables
4. Run `npm start` to start the server

## Usage

1. Register as a user or log in as an existing user
2. Browse products by category, brand, description, rating, or search for specific products
3. View product details and reviews
4. Add products to cart and place orders
5. Access the admin panel to add new categories, brands, and products
6. View detailed statistics of the ecommerce website

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push your branch to your forked repository
5. Create a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the nodejs, expressjs, postgres, cloudinary, and other libraries and frameworks used in this project.

