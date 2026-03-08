const progress = () => {
  const args = process.argv;

  const duration = Number(args[args.indexOf("--duration") + 1]) || 5000;
  const interval = Number(args[args.indexOf("--interval") + 1]) || 100;
  const length = Number(args[args.indexOf("--length") + 1]) || 30;

  let progress = 0;
  const step = interval / duration;

  const timer = setInterval(() => {
    progress += step;

    if (progress > 1) progress = 1;

    const percent = Math.round(progress * 100);

    const filled = Math.round(progress * length);
    const empty = length - filled;

    const bar = `[${"█".repeat(filled)}${" ".repeat(empty)}] ${percent}%`;

    process.stdout.write("\r" + bar);

    if (progress === 1) {
      clearInterval(timer);
      process.stdout.write("\nDone!\n");
    }
  }, interval);
};

progress();
