CREATE TABLE IF NOT EXISTS "users" (
  "id" serial NOT NULL PRIMARY KEY,
  "full_name" VARCHAR(250) NOT NULL,
  "user_name" VARCHAR(150) UNIQUE NOT NULL,
  "profile_picture_path" VARCHAR(3000),
  "email" VARCHAR(100) NOT NULL,
  "password" VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP 
);

CREATE TABLE IF EXISTS "posts"(
  "id" serial NOT NULL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "text" VARCHAR(6000),
  "media_path" VARCHAR(3000),
  "created_by" VARCHAR(300) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF EXISTS "comments"(
  "id" serial NOT NULL PRIMARY KEY,
  "user_id" INT NOT NULL,
  "post_id" INT NOT NULL,
  "text" VARCHAR(6000),
  "media_path" VARCHAR(3000),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP
);