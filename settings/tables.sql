CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" TEXT NOT NULL ,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt"  date  default NOW()
);

CREATE TABLE "shortUrls" (
    "id" SERIAL PRIMARY KEY,
	"userId" INT NOT NULL REFERENCES "users"("id") ,
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"visitCount" INT NOT NULL default 0,
    "createdAt"  date  default NOW()
);