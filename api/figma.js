export default function handler(req, res) {
  res.status(200).json({
    debug: "VERSION 2",
    timestamp: Date.now()
  });
}