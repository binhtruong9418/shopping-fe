import './global.css'
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import UpdateUser from "@/hocs/UpdateUser";
import store from '../state'
import {QueryClient, QueryClientProvider} from "react-query";
//for cloudflare edge deployment
export const runtime = 'experimental-edge'

const queryClient = new QueryClient()
export default function App({Component, pageProps}) {

  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>

      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <UpdateUser>
            {getLayout(<Component {...pageProps} />)}
          </UpdateUser>
          <Toaster/>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
