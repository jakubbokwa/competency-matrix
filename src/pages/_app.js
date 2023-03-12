import "@/styles/globals.css";
import { ModalProvider } from "hooks/useModalContext";

export default function App({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Component {...pageProps} />;
    </ModalProvider>
  );
}
