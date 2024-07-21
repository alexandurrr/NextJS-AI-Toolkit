import dynamic from "next/dynamic";

const ClientOnlyMessages = dynamic(() => import("./ClientOnlyMessages"), {
  ssr: false,
});

export default function ChatMessages() {
  return <ClientOnlyMessages />;
}
