// モジュールのインポート
import express from 'express'
import * as line from '@line/bot-sdk'
import crypto from 'crypto'
import dotenv from 'dotenv'
// メインの関数のインポート
import {
    mainFunction
} from './main'
// dotenvの有効化
dotenv.config()

// heroku上の環境変数の取得
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const SECRET_KEY = process.env.SECRET_KEY
const config = {
    channelAccessToken: ACCESS_TOKEN,
    channelSecret: SECRET_KEY,
}

// 各種変数の初期化
const app = express()
const PORT = process.env.PORT || 3000

// CORS対策
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// LINEから送られてきたものかどうかの検証
const validateSignature = (signature, body) => {
    return signature === crypto.createHmac('SHA256', config.channelSecret).update(JSON.stringify(body)).digest('base64');
}

// ここから
app.post('/webhook', line.middleware(config), (req, res) => {
    // とりあえず200番を返す
    res.status(200).end()
    // LINEかどうかの確認
    if (!validateSignature(req.headers['x-line-signature'], req.body)) return
    // 色々処理する別ファイルの関数に渡す
    mainFunction(req.body.events[0])
})

// サーバーの起動
app.listen(PORT)
console.log(`Server running at ${PORT}`)