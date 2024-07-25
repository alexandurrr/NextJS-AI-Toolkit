"use client";

import { ImageGenProvider } from "../../context/ImageGenContext";

export default function ImageGenLayout({ children }) {
  return <ImageGenProvider>{children}</ImageGenProvider>;
}
