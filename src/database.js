import {
    Pool
} from 'pg'
import dotenv from 'dotenv'
dotenv.config()

module.exports = class db {
    constructor() {
        // プールの作成
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            },
        })
    }

    // 通常クエリ
    async query(param) {
        const client = await this.pool.connect()
        const {
            rows
        } = await client.query(param)
        client.release()
        return rows
    }
    // グループとユーザが紐付けされているか確認
    async findGroup(userId) {
        const query = {
            name: 'fetch-group',
            text: 'SELECT group_id FROM line_user WHERE user_id = $1',
            values: [userId]
        }
        return new Promise(async (resolve, reject) => {
            try {
                const client = await this.pool.connect()
                const {
                    rows
                } = await client.query(query)
                client.release()
                resolve(rows)
            } catch (e) {
                reject(e)
            }
        })
    }
    // ユーザとグループを追加
    async addUser(userId, groupId) {
        const insertText = 'INSERT INTO line_user (user_id, group_id) VALUES ($1, $2)'
        const client = await this.pool.connect()
        try {
            await client.query(insertText, [userId, groupId])
        } catch (err) {
            console.log("add user error", err)
        }
        client.release()
    }
}