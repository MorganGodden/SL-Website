/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Base URL of the sl-plugin HTTP endpoint that publishes chunk snapshots,
   * e.g. `http://127.0.0.1:8787`. No trailing slash.
   */
  readonly VITE_PLOTS_API_URL: string
  /**
   * Optional. Only needed if the plugin is configured with a shared secret;
   * sent as the `X-SnowLeagues-Secret` header. Leave unset in development.
   */
  readonly VITE_PLOTS_SECRET?: string
  /** Poll interval for the /plots change index, in milliseconds. */
  readonly VITE_PLOTS_POLL_MS?: string
  /** Minecraft server address, shown as a "join" hint. */
  readonly VITE_SERVER_IP?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@/presets/lara' {
  const Lara: any
  export default Lara
}

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}
