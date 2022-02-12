import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider} from 'effector-react/scope'
import { fork, Scope, serialize } from 'effector'

let clientScope: Scope;

function MyApp({ Component, pageProps }: AppProps) {
  const scope = fork({
    values: {
      ...(clientScope && serialize(clientScope)),
      ...pageProps.initialState,
    },
  });
  
  return (
    <Provider value={scope}>
      <Component {...pageProps} />
     </Provider>
  );
}

export default MyApp
