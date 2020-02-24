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

// ここから
export const pushMessage = (groupId, message) => {
    console.log(message)
    /**
     * type: text, image, video, audio, file, location, sticker
     */
    let content = {}
    switch (message.type) {
        case 'text': {
            content = {
                type: 'text',
                text: message.text
            }
            break
        }
        case 'image': {
            break
        }
        case 'sticker': {
            break
        }
    }
    client.pushMessage(groupId, content)
}