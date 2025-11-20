# simple-notes-app-45066-45076

Backend (notes_backend) provides a simple Express REST API for managing notes with in-memory storage.

- Server: Express on port 3001
- Docs: Swagger UI at /docs
- Endpoints:
  - GET /notes
  - POST /notes
  - PUT /notes/:id
  - DELETE /notes/:id

Run:
- npm install
- npm start (starts on port 3001)
- Visit http://localhost:3001/docs

Example curl:
- List notes:
  curl -s http://localhost:3001/notes | jq

- Create note:
  curl -s -X POST http://localhost:3001/notes \
    -H "Content-Type: application/json" \
    -d '{"title":"First Note","content":"Hello"}'

- Update note:
  curl -s -X PUT http://localhost:3001/notes/1 \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated Title"}'

- Delete note:
  curl -i -X DELETE http://localhost:3001/notes/1