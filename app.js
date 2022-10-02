const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  // const restaurantOne = {
  //   id: 1,
  //   title: 'Sababa 沙巴巴中東美食',
  //   image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg',
  //   category: '中東料理',
  //   evaluation: '4.1',
  // }
  res.render('index', { restaurants: restaurantList.results })
  // res.send('This is my restaurant list.')
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('req.params.restaurant_id:', req.params.restaurant_id)
  const restaurant = restaurantList.results.find((restaurant) => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  // const restaurantOne = {
  //   id: 8,
  //   name: '布娜飛比利時啤酒餐廳',
  //   image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5634/08.jpg',
  //   category: '義式餐廳',
  //   address: '台北市松山區市民大道四段 185 號',
  //   map: 'https://goo.gl/maps/V9mKwVJ4s5v',
  //   tel: '02 2570 1255',
  //   description: `我們希望帶給您的，不只是啤酒，有美食，還有一份對生活的熱情。 義大利語「Bravo」的原意─「喝采」、「讚揚」， 我想著如果有一個大家都能輕鬆品嚐美酒、享受美食的地方，那就真的是太棒了！
  //       因為這個念頭，加上一股對比利時啤酒的熱情， 於是「Bravo Beer布娜飛比利時啤酒餐廳」在2006年誕生了...`,
  // }
  res.render('show', { restaurant: restaurant })

})

app.get('/search', (req, res) => {
  console.log('req.query:', req.query)
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword)
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })

})

app.listen(port, () => {
  console.log(`express is listening on localhost:${port}`)
})