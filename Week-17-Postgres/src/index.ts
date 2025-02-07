import { Client } from "pg";

const pgClient = new Client({
    user: "neondb_owner",
    password: "npg_LV1FjP2dIaMA",
    host: "ep-muddy-glitter-a18a91j0-pooler.ap-southeast-1.aws.neon.tech",
    port: 5432,
    database: "neondb",
    ssl: true
});

async function main() {
    try {
        await pgClient.connect();
        console.log('Postgres connect success');
        // const result = pgClient.query(`CREATE TABLE users(
        //     id SERIAL PRIMARY KEY,
        //     username VARCHAR(50) UNIQUE NOT NULL,
        //     email VARCHAR(50) UNIQUE NOT NULL,
        //     password VARCHAR(50) NOT NULL,
        //     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        //  );`);
        // const result = await pgClient.query(`INSERT INTO users (username, email, password) VALUES ('Mukesh69', 'firebreast@mail.com','noentry');`);
        const result = await pgClient.query(`SELECT * FROM users;`);
        console.log(result.rows);
    } catch (err) {
        console.log('Postgres connect failed');
        console.log(err);
    }
    return;
}

main();