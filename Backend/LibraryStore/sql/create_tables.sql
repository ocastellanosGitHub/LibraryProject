-- SQL Server / T-SQL compatible definitions

-- Libraries table
CREATE TABLE libraries (
    id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(200) NOT NULL
);

-- Books table
CREATE TABLE books (
    id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    library_id UNIQUEIDENTIFIER NOT NULL,
    title NVARCHAR(200) NOT NULL,
    author NVARCHAR(200) NOT NULL,
    -- store normalized ISBN (digits only) - length 10 or 13; we use 13 to cover ISBN-13
    isbn VARCHAR(13) NOT NULL,
    CONSTRAINT fk_books_library FOREIGN KEY (library_id) REFERENCES libraries(id) ON DELETE CASCADE
);

-- Optional: ensure ISBN uniqueness per library
CREATE UNIQUE INDEX ix_books_library_isbn ON books(library_id, isbn);

-- Users table (T-SQL / SQL Server)
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL CONSTRAINT ux_users_username UNIQUE,
    email NVARCHAR(100) NOT NULL CONSTRAINT ux_users_email UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(50) NULL,
    last_name NVARCHAR(50) NULL,
    role NVARCHAR(20) NOT NULL DEFAULT ('User'),
    is_active BIT NOT NULL DEFAULT (1),
    created_at DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
    updated_at DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME()
);

-- Seed sample users (development only - store hashed passwords in production)
INSERT INTO users (username, email, password_hash, role)
VALUES
    ('admin', 'admin@example.com', 'adminpass', 'Admin'),
    ('user',  'user@example.com',  'userpass',  'User');

