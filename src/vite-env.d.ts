/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_COMPANY_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
