export default async function handler(req, res) {
  const { zone = "SE3" } = req.query;

  // Dummypriser för demo – ersätts med riktiga Nord Pool senare
  const examplePrices = {
    SE1: Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, price: +(0.3 + Math.random() * 0.5).toFixed(2) })),
    SE2: Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, price: +(0.4 + Math.random() * 0.6).toFixed(2) })),
    SE3: Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, price: +(0.5 + Math.random() * 0.8).toFixed(2) })),
    SE4: Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, price: +(0.6 + Math.random() * 0.9).toFixed(2) }))
  };

  const prices = examplePrices[zone] || examplePrices.SE3;
  res.status(200).json(prices);
}