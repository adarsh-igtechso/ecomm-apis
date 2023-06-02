import Stripe from "stripe";
import { Router } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const DOMAIN = process.env.DOMAIN;

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const paymentRouter = Router();

paymentRouter.get('/',(req, res)=>{
    res.status(200).json({msg:"success"})
})

paymentRouter.post("/", async (req, res) => {
    const {name, amount} = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
            currency: "inr",
            product_data: {
              name
            },
            unit_amount: Number(amount),
          },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}/payment/success`,
    cancel_url: `${DOMAIN}/payment/cancel`,
  });

  res.json({ url: session.url })
//   res.redirect(session.url)
});


paymentRouter.get('/success',(req, res)=>{
    res.status(200).json({msg:"success"})
})

paymentRouter.get('/cancel',(req, res)=>{
    res.status(200).json({msg:"payment fail"})
})