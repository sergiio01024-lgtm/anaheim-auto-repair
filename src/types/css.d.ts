/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare namespace React {
  interface HTMLAttributes<T> {
    fetchPriority?: "high" | "low" | "auto";
    fetchpriority?: "high" | "low" | "auto";
  }
  interface ImgHTMLAttributes<T> {
    fetchPriority?: "high" | "low" | "auto";
    fetchpriority?: "high" | "low" | "auto";
  }
}
