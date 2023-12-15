import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

const AppLayout = ({children}) => {
    return (
        <>
          <Head>
            <title>Đổi thưởng kế hoạch nhỏ</title>
            <link rel="icon" type="image/x-icon" href="/img/app-logo.png" />
          </Head>
          <div>
            <Header/>
            <main>{children}</main>
            <Footer/>
          </div>
        </>
    );
};

export default AppLayout;
