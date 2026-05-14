# Database Setup

This directory contains the PostgreSQL database configuration for the Face Recognition app.

## Files

- `docker-compose.yml` - Docker Compose configuration for PostgreSQL
- `init.sql` - Database initialization script with tables and sample data

## Quick Start

1. Make sure Docker is installed and running
2. Start the database:

```sh
cd database
docker compose up -d
```

3. The database will be available at:
   - Host: localhost
   - Port: 5432
   - Database: face-recognition
   - User: admin
   - Password: Test1234

## Database Schema

The `init.sql` creates:
- `users` table with columns: id, name, email, password, entries, joined

## Environment Variables

Make sure your backend `.env` file has:

```env
POSTGRES_DB=face-recognition
POSTGRES_USER=admin
POSTGRES_PASSWORD=Test1234
DB_HOST=localhost
DB_PORT=5432
```

## Notes

- The database persists data in a Docker volume
- To reset the database, run `docker compose down -v` then `docker compose up -d`
- The init script runs automatically when the container starts for the first time</content>
<parameter name="filePath">/home/blackadi/Documents/NodeJS/face-recognition/database/README.md