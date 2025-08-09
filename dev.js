// Windows-compatible development server starter
process.env.NODE_ENV = 'development';
require('tsx/cjs').register();
require('./server/index.ts');