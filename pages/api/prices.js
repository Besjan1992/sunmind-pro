export default function handler(req, res) {
  const { zone } = req.query;
  const dummyPrices = Array.from({ length: 24 }, (_, i) => ({
    hour: i + ":00",
    price: parseFloat((Math.random() * 2).toFixed(2))
  }));
  res.status(200).json(dummyPrices);
}