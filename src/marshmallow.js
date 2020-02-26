export const marshmallow = (text) => {
    let reply_text = text
    const ng_word = ['うるせ', 'おいコラ', 'オイこら', 'おいこら', 'てめ', '死ね', '氏ね', 'タヒね', 'しね', 'クソ', '殺す', 'ブス', 'バカ', 'アホ', 'ぶす', 'くそ', 'ころす', 'コロス', 'ブサイク', '不細工', 'ぶさいく', 'ばか', '馬鹿', 'あほ', '阿呆', '莫迦', '糞', '雑魚', 'ザコ', 'ざこ', '死んで', '可愛くない']
    for (let i = 0; i < ng_word.length; i++) {
        const result = reply_text.indexOf( ng_word[i] )
        if(result !== -1){
            reply_text = reply_text.replace(ng_word[i], 'にゃーん')
        }
    }
    return reply_text
}