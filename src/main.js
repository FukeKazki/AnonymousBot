// モジュールのインポート
import * as line from '@line/bot-sdk'
import dotenv from 'dotenv'
import database from './database'
import {
    pushMessage
} from './pushMessage'
import {
    marshmallow
} from './marshmallow'
dotenv.config()
// heroku上の環境変数の取得
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const SECRET_KEY = process.env.SECRET_KEY
const config = {
    channelAccessToken: ACCESS_TOKEN,
    channelSecret: SECRET_KEY,
}

// 初期化
const client = new line.Client(config)
const db = new database

// メインの関数
export const mainFunction = async (event) => {
    console.log(event)
    const eventType = event.type
    const source = event.source

    switch (eventType) {
        case 'message': {
            const userId = source.userId
            const message = event.message
            switch (source.type) {
                case 'user': {
                    const result = await db.findGroup(userId)
                    if (result[0]) {
                        console.log('返信します!')
                        const groupId = result[0].group_id
                        // ましゅまろ言葉に変換
                        if (message.type === 'text') {
                            message.text = marshmallow(message.text)
                        }
                        // グループへ送信
                        pushMessage(groupId, message)
                        // 返信
                        replyText(event.replyToken, '送信しました！')
                    } else {
                        console.log('groupが見つかりません！')
                    }
                    break
                }
                case 'group': {
                    const result = await db.findGroup(userId)
                    if (!result[0]) {
                        const groupId = source.groupId
                        console.log('挿入します!')
                        db.addUser(userId, groupId)
                    } else {
                        console.log('特に何もしません!')
                    }
                    break
                }
            }
            break
        }
        case 'follow': {}
        case 'unfollow': {}
        case 'join': {}
        case 'leave': {}
        case 'memberJoined': {}
        case 'memberLeft': {}
        case 'postback': {}
    }
}

const debugDB = async () => {
    const result = await db.query('SELECT * FROM line_user')
    console.log(result)
}

const replyText = (token, text) => {
    client.replyMessage(token, {
        type: 'text',
        text: text
    })
}