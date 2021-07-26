import { defineConfig } from 'vite'
import windi from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [windi({ preflight: false })]
})
