import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    // const port = process.env.PORT || "10000";
    return defineConfig({
      plugins: [react()],
      define: {
        'process.env': process.env
      }
    });
}