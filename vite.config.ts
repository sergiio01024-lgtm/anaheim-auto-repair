import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'mock-lead-api',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/lead' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const payload = JSON.parse(body);
                // Basic validation similar to api/lead.ts
                if (!payload.name || typeof payload.name !== 'string' || !payload.name.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Name is required." }));
                  return;
                }
                if (!payload.phone || typeof payload.phone !== 'string' || !payload.phone.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Phone number is required." }));
                  return;
                }
                const digitCount = payload.phone.replace(/\D/g, "").length;
                if (digitCount < 7 || digitCount > 15) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Phone number must have between 7 and 15 digits." }));
                  return;
                }
                if (!payload.service || typeof payload.service !== 'string') {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Invalid service category." }));
                  return;
                }
                if (!payload.make || typeof payload.make !== 'string' || !payload.make.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Vehicle make is required." }));
                  return;
                }
                if (!payload.model || typeof payload.model !== 'string' || !payload.model.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Vehicle model is required." }));
                  return;
                }
                const yearNum = Number(payload.year);
                if (isNaN(yearNum) || yearNum < 1900 || yearNum > new Date().getFullYear() + 2) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Vehicle year must be a valid integer." }));
                  return;
                }
                if (!payload.message || typeof payload.message !== 'string' || !payload.message.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: "Issue description is required." }));
                  return;
                }

                res.setHeader('Content-Type', 'application/json');
                res.writeHead(200);
                res.end(JSON.stringify({
                  success: true,
                  message: "Estimate request simulated successfully (Preview Mode).",
                  request_id: "preview-" + Math.random().toString(36).substring(2, 9)
                }));
              } catch (e) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: "Invalid JSON body." }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        muffler: path.resolve(__dirname, 'muffler-repair-anaheim.html'),
        catalytic: path.resolve(__dirname, 'catalytic-converter-anaheim.html'),
        brake: path.resolve(__dirname, 'brake-repair-anaheim.html'),
        engine: path.resolve(__dirname, 'engine-repair-anaheim.html'),
        transmission: path.resolve(__dirname, 'transmission-repair-anaheim.html'),
        maintenance: path.resolve(__dirname, 'auto-maintenance-anaheim.html'),
        contact: path.resolve(__dirname, 'contact.html'),
        privacy: path.resolve(__dirname, 'privacy.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});