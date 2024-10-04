const path = require('path');
const express = require('express');
const mongojs = require('mongojs');

// const cors = require('cors');
// app.use(cors());

const app = express();
app.use(express.json()); 

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

// Connect to MongoDB
const db = mongojs('mongodb+srv://Student:webdev2024student@cluster0.uqyflra.mongodb.net/webdev2024?retryWrites=true&w=majority', ['final_<Noam>_product', 'final_<Noam>_order']);

// Access collections
const productCollection = db.collection('final_<Noam>_product');
const orderCollection = db.collection('final_<Noam>_order');

// GET, POST, PUT, DELETE routes for products
app.get('/api/products', (req, res) => {
  productCollection.find((err, products) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(products);
  });
});


app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  orderCollection.insert(newOrder, (err, order) => {

    if (err) {
      return res.status(500).send(err);
    }
    res.json(order);
  });
});

app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  productCollection.update(
    { _id: mongojs.ObjectId(productId) },
    { $set: updatedProduct },
    { multi: false },
    (err, product) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(product);
    }
  );
});

app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  productCollection.remove({ _id: mongojs.ObjectId(productId) }, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Product deleted' });
  });
});



// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
