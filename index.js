const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')('your_stripe_secret_key_here'); // Replace with your actual secret key

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files (CSS, JS)
app.use(express.static(__dirname));

// Serve the Transaction.html file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Transaction.html'));
});

// Handle the payment processing
app.post('/charge', async (req, res) => {
    const { stripeToken, email } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: 3000, // £30 in smallest currency unit (pence for GBP)
            currency: 'gbp',
            source: stripeToken,
            receipt_email: email,
            description: 'Transaction Payment',
        });

        res.json({ success: true, charge });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
