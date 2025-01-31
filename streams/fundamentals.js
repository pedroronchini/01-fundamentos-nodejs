import { Readable, Writable, Transform } from 'node:stream';

// Lê os dados
class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf)
      }
    }, 1000)
  }
}

// Lê os dados de um lugar e escreve dados para outro lugar
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

// Escreve dados 
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// new OneToHundredStream().pipe(process.stdout)
// new OneToHundredStream().pipe(new MultiplyByTenStream())
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())