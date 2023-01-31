interface ImportMetaEnv {
  readonly VITE_MODE_NAME: string;
  readonly VITE_MODE_HOST: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
