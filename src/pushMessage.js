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
            const text = message.text
            // アンケートのとき
            if (text.match(/^アンケート.*/)) {
                const texts = text.split(/\n/)
                content = {
                    'type': 'template',
                    'altText': 'this is a confirm template',
                    'template': {
                        'type': 'confirm',
                        'text': texts[1],
                        'actions': [{
                                'type': 'message',
                                'label': texts[2],
                                'text': texts[2]
                            },
                            {
                                'type': 'message',
                                'label': texts[3],
                                'text': texts[3]
                            }
                        ]
                    }
                }
            } else { // 普通の文字列のとき
                content = {
                    type: 'text',
                    text: message.text
                }
            }
            break
        }
        case 'image': { // 画像のとき
            break
        }
        case 'sticker': { // スタンプのとき
            break
        }
    }
    client.pushMessage(groupId, content)
}