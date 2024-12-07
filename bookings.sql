CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    package_name VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL
);