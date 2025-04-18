const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const bodyParser = require("body-parser");

const stripe = Stripe("sk_test_YOUR_SECRET_KEY"); // Replace with your real Stripe secret key
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/create-setup-intent", async (req, res) => {
  const { email, name } = req.body;

  const customer = await stripe.customers.create({ email, name });

  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: setupIntent.client_secret,
    customerId: customer.id,
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
