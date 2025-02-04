export const config = {
  runtime: 'edge',
};

export default function handler(req, res) {
  res.status(200).json({ message: "Hello from Edge!" });
}
