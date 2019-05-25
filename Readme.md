Twilone
=======

Twilone is a convinient clone of Twitter.

## Setup

1. Clone the repository.

```bash
git clone https://github.com/fofanoff/Twilone.git
```

2. Create the `.env` file specifying the database and web server configuration parameters.

```bash
# Inside .env file...

# Database Configuration
TWILONE_DB_HOST=
TWILONE_DB_PORT=
TWILONE_DB_NAME=
TWILONE_DB_USER=
TWILONE_DB_PASSWORD=
TWILONE_DB_DIALECT= # one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'

# Web Server Configurations
TWILONE_PORT=
```

3. Install all the dependencies.

```bash
npm install
```

4. Start the server.

```bash
node index.js
```

## Credits

Konstantin F.