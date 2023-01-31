export const isDev = process.env.NODE_ENV === 'development';

const host = import.meta.env.VITE_MODE_HOST;

const name = import.meta.env.VITE_MODE_NAME;

let baseURL = '';
let safe = '';

if (isDev) {
  // baseURL = '192.168.50.234:9000/api';
  baseURL = 'infodoxx.co/api';

  // safe = 's';
} else {
  baseURL = host;
  safe = '';
}

export const server = {
  baseURL,
  safe,
};
