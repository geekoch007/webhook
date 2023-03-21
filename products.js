const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// check client orders

// webhook endpointh
app.post('/webhook', (req, res) => {
  const {
    order_id, order_product, quality,
    total_price, client, age, email, phone,
    location, createdAt, updatedAt
  } = req.body;

  const order = {
    order_id, order_product, quality,
    total_price, client, age, email, phone,
    location, createdAt, updatedAt
  };
  
  console.log(order);

  if (fs.existsSync(`${client}.json`)) {

    const orders = JSON.parse(fs.readFileSync(`${client}.json`));
    orders.push(order);
    fs.writeFileSync(`${client}.json`, JSON.stringify(orders), (err) => {
      if (err) throw err;
      console.log('Data saved to file');
    });
    res.json({ message: 'Order placed successfully', order });

  } else {

    fs.writeFileSync(`${client}.json`, "[]");
    const orders = JSON.parse(fs.readFileSync(`${client}.json`));
    orders.push(order);
    fs.writeFileSync(`${client}.json`, JSON.stringify(orders), (err) => {
      if (err) throw err;
      console.log('Data saved to file');
    });
    res.json({ message: 'Order placed successfully', order });

  }

  // res.send('Data received');
});

// start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
