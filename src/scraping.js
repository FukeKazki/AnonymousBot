import client from 'cheerio-httpcli'
export const scraping = () => {
    return new Promise(async (resolve) => {
        const srcs = []
        const {
            $
        } = await client.fetch('https://ailovei.com/?p=16776')
        $("#mainEntity img").each(function (idx) {
            const src = $(this).attr('src')
            srcs.push(src)
        })
        resolve(srcs)
    })
}