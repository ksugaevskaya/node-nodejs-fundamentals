import { Transform } from "stream";

const filter = () => {
  const args = process.argv;
  const pattern = args[args.indexOf("--pattern") + 1];

  const transformer = new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split("\n");

      const filtered = lines
        .filter((line) => line.includes(pattern))
        .join("\n");

      if (filtered) {
        this.push(filtered + "\n");
      }
      callback();
    },
  });

  process.stdin.pipe(transformer).pipe(process.stdout);
};

filter();
