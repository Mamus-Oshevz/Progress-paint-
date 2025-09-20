const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API endpoint for handling orders
app.post('/api/orders', (req, res) => {
    const orderData = req.body;
    console.log('Received order:', orderData);
    // Here you would typically process the order, e.g., save it to a database
    res.status(200).send({ message: 'Order received successfully' });
});

// API endpoint for handling contact messages
app.post('/api/contact', (req, res) => {
    const contactData = req.body;
    console.log('Received contact message:', contactData);
    // Here you would typically process the message, e.g., send an email
    res.status(200).send({ message: 'Message received successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});