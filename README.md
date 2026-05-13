# Install & Run
```sh
npm run install
npm run dev
```

# DB
```sh
cd database
docker compose up -d

# STOP
docker compose down -v

# Connect
docker exec -it my_postgres_db psql -U blackadi -d blackadi_database
```