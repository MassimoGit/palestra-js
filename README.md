# Gestione Palestra

Soluzione full-stack per la prova pratica "Gestione Palestra".

## Struttura

```text
soluzione-palestra/
  backend/      API REST Express + mysql2
  frontend/     SPA React + Vite
  database/     schema.sql con solo DDL
  postman/      collection JSON importabile in Postman
```

La home richiesta e la root dell'app React, implementata in
`frontend/src/pages/Home.jsx` e stilizzata in `frontend/src/index.css`.

## Avvio rapido

1. Importare `database/schema.sql` in MySQL.
2. Avviare backend:

```bash
cd backend
npm install
npm start
```

3. Avviare frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend: `http://localhost:3000`  
Frontend: `http://localhost:5173`
