import { CookieConsent } from "@/components/cookie-consent";

const translations = {
  title: "We use cookies",
  description: "This website uses cookies to ensure you get the best experience on our website.",
  accept: "Accept",
  decline: "Decline",
};

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Component {...pageProps} />
      <CookieConsent translations={translations} />
    </>
  );
}

export default MyApp;
