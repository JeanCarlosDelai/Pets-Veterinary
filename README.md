# Pets Veterinary

# Challenge #2

Your last customer was very happy with the microservice you made, but now he have a few more additions that he want you to put in this service.
So, your new mission is to adapt the service in order to allow some new features such as:

## Functionalities

Auth

- POST/auth -> Authenticate the given user.

Tutors

- GET/tutors -> Retrieves all tutors. Authentication required.
- POST/tutor -> Create a new tutor.
- PUT/tutor/:id -> Updates a tutor. Authentication required.
- DELETE/tutor/:id -> Deletes a tutor. Authentication required.

Pets

- POST/pet/:tutorId-> Creates a pet and adds it to a tutor. Authentication required.
- PUT/pet/:petId/tutor/:tutorId -> updates a pet's info. Authentication required.
- DELETE/pet/:petId/tutor/:tutorId -> deletes a pet from a tutor. Authentication required.

## Installation

Clone repository to local machine

```sh
git clone https://github.com/JeanCarlosDelai/Pets-Veterinary.git
```

Access the cloned folder

```sh
cd Pets-Veterinary
```

Run NPM to install dependencies

```sh
npm install
```

Create a file called .env in the default directory and put the preferences

```sh
MONGO_URI= # MongoDB connection URI
JWT_SECRET=  # Secret key for JWT authentication
JWT_LIFETIME=  # JWT token lifetime (e.g., 1d, 2h, 30m)
```

Start the server

```sh
npm run dev
```

## Stack used

**Back-end:** TypeScript, Node.js.

<div>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40"/>
</div>

**Database:** MongoDB.

<div>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" width="40" height="40"/>
</div>

## Author

- [@Jeandelai](https://github.com/JeanCarlosDelai)
