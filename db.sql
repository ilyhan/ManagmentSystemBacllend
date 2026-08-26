-- Создание типа доп ифнормации
CREATE TYPE info_type AS ENUM ('Mobile', 'Telegram', 'Email');
-- Создание типа для грейда
CREATE TYPE level_type AS ENUM (
    'Trainee',
    'Junior',
    'Strong Junior',
    'Middle',
    'Strong Middle',
    'Senior',
    'Lead'
);
-- Создание скилла 
CREATE TYPE skill_type AS ENUM (
    'Frontend',
    'Backend',
    'Product Manager',
    'Analyst',
    'QA'
);
-- Создание таблицы пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
-- Создание таблицы должности 
CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    level level_type,
    skill skill_type,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Создание таблицы ролей
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50) UNIQUE NOT NULL
);
-- Создание таблицы связи пользователей и ролей
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
-- Создание таблицы проектов
CREATE TABLE board (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    name_id VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by INT REFERENCES users(id)
);
-- Создание таблицы задач
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    current_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Backlog',
    priority VARCHAR(50) NOT NULL DEFAULT 'Low',
    assignee_id INT,
    board_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE
    SET NULL,
        FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE
);
--создание таблицы доп информации о пользователях
CREATE TABLE extra_info (
    id SERIAL PRIMARY KEY,
    type info_type NOT NULL,
    value VARCHAR(40) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
--создание таблицы для информации о сотрудниках проекта
CREATE TABLE board_users (
    id SERIAL PRIMARY KEY,
    board_id INT NOT NULL,
    user_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
--создание таблицы для трекинга времени
CREATE TABLE tracking (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    board_id INT,
    date DATE,
    description TEXT,
    reservedHours NUMERIC(4, 2) NOT NULL CHECK (
        reservedHours > 0
        AND reservedHours <= 24
    ),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (board_id) REFERENCES board(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);