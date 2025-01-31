export async function json(req, res) {
  const buffers = [];

  // Percorre toda a string enquanto a string não 
  // for percorrida inteira ele não executa o resto do código
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null
  }

  res.setHeader('Content-type', 'application/json'); 
}