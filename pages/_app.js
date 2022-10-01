import App, { Container } from "next/app";
import "../styles/globals.css";
import { AppContextProvider } from "../contexts/Context";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    );
  }
}

export default MyApp;
