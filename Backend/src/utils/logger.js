const isDev = process.env.NODE_ENV !== 'production';

function format(level, args) {
  const timestamp = new Date().toISOString();
  return [`[${timestamp}] [${level}]`, ...args];
}

export const logger = {
  info: (...args) => {
    if (isDev) console.info(...format('INFO', args));
  },
  warn: (...args) => {
    console.warn(...format('WARN', args));
  },
  error: (...args) => {
    console.error(...format('ERROR', args));
  },
  debug: (...args) => {
    if (isDev) console.debug(...format('DEBUG', args));
  },
};

export default logger;
