export type ColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning';

declare interface TestInterface {
  name: string;
}

declare module 'react/jsx-runtime' {
  export default any;
}
