// モジュールのインポート
import * as line from '@line/bot-sdk'
import dotenv from 'dotenv'
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

// メインの関数
export const mainFunction = (events) => {
    // 返信する相手のキー
    const replyToken = events[0].replyToken
    // 送られてきたメッセージ
    const messageText = events[0].message.text

    // テキストの返信
    replyText(replyToken, messageText)
}

// ここも切り出せそう
const replyText = (token, text) => {
    client.replyMessage(token, {
        type: 'text',
        text: text
    })
}