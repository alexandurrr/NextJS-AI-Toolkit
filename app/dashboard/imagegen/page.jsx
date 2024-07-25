import dynamic from "next/dynamic";

const ImageGenerator = dynamic(() => import("./ImageGenerator"), {
  ssr: false,
});

export default function Page() {
  return <ImageGenerator />;
}
