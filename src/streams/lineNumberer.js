import { Transform } from "stream";

const lineNumberer = () => {
  let lineNumber = 1;

  const transformer = new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split("\n");

      const result = lines
        .map((line) => `${lineNumber++} | ${line}`)
        .join("\n");

      this.push(result);
      callback();
    },
  });

  process.stdin.pipe(transformer).pipe(process.stdout);
};

lineNumberer();
