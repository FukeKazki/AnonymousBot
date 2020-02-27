// モジュールのインポート
import * as line from '@line/bot-sdk'
import dotenv from 'dotenv'
import {scraping} from './scraping'
dotenv.config()
// heroku上の環境変数の取得
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const SECRET_KEY = process.env.SECRET_KEY
const config = {
    channelAccessToken: ACCESS_TOKEN,
    channelSecret: SECRET_KEY,
}

function choose_at_random(arrayData){
    var arrayIndex = Math.floor(Math.random() * arrayData.length);
    return arrayData[arrayIndex];
}

// 初期化
const client = new line.Client(config)

// ここから
export const pushMessage = async (groupId, message) => {
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
            } 
            else if(text.match(/^現場猫.*/)){
                content = {
                    type: 'image',
                    originalContentUrl: 'https://4.bp.blogspot.com/-iXsqh1jkecI/XgNpGfsJq-I/AAAAAAAADxo/kYPeM1jk6aAce9M7UVWSsx3FnH2IetOpQCK4BGAYYCw/s1600/%25E3%2581%25A9%25E3%2581%2586%25E3%2581%2597%25E3%2581%25A6%25E5%25A4%259C%25E4%25B8%25AD%25E3%2581%25AB%25E9%25A1%2594.png' ,
                    previewImageUrl: 'https://4.bp.blogspot.com/-iXsqh1jkecI/XgNpGfsJq-I/AAAAAAAADxo/kYPeM1jk6aAce9M7UVWSsx3FnH2IetOpQCK4BGAYYCw/s1600/%25E3%2581%25A9%25E3%2581%2586%25E3%2581%2597%25E3%2581%25A6%25E5%25A4%259C%25E4%25B8%25AD%25E3%2581%25AB%25E9%25A1%2594.png'
                }
                client.pushMessage(groupId, {
                    type: 'text',
                    text: 'ヨシ！'
                })

            }
            else if(text.match(/^ねこ.*/ )){
                const cat = await scraping()
                content = {
                    type: 'template',
                    altText: 'this is a image carousel template',
                    template: {
                        type: 'image_carousel',
                        columns: [
                            {
                                imageUrl: choose_at_random(cat),
                                action: {
                                    type: 'message',
                                    label: 'ぷりてぃましゅまろ',
                                    text: 'ぷりてぃましゅまろ'
                                }
                            },
                            {
                                imageUrl: choose_at_random(cat),
                                action: {
                                    type: 'message',
                                    label: 'かわいい',
                                    text: 'かわいい'
                                }
                            },
                            {
                                imageUrl: choose_at_random(cat),
                                action: {
                                    type: 'uri',
                                    label: 'ねことは',
                                    uri: 'https://ja.wikipedia.org/wiki/%E3%83%8D%E3%82%B3'
                                }
                            }
                        ]
                    }
                    
                }
            }
            else { // 普通の文字列のとき
                content = {
                    type: 'text',
                    text: message.text
                }
            }
            break
        }
        case 'image': { // 画像のとき
            content = {
                type: 'sticker',
                packageId: '11538',
                stickerId: '51626525'
            }

            break
        }
        case 'sticker': { // スタンプのとき
            content = {
                type: 'sticker',
                packageId: '11538',
                stickerId: '51626521'
            }            
            break
        }
    }
    client.pushMessage(groupId, content)
}