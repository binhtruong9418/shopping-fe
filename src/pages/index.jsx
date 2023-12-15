/* eslint-disable @next/next/no-img-element */

import {
  Flash
} from "@/components/icon/SvgPage";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import AppLayout from "@/layouts/AppLayout";
import CategoryCard from "@/components/home/CategoryCard";
import ProductCard from "@/components/ProductCard";
import {Skeleton} from "antd";

const Home = () => {
  const {data: categoriesData = {}, isLoading} = useQuery({
    queryKey: "getCategories",
    queryFn: () => apiServices.getCategories(),
  });

  const {data: productsData = {}} = useQuery({
    queryKey: "getAllProducts",
    queryFn: () =>
      apiServices.getAllProducts({
        page: 0,
        limit: 12,
        sortBy: "quantity",
        sortDirection: "DESC",
      }),
  });

  //get data from api response
  const {data: categories = []} = categoriesData;
  const {data: {contents: products = []} = {}} = productsData;


  return (
    <div style={{paddingBottom: "50px"}} id="homePage">

      <div style={{padding: "20px 0px"}} className="breadcrumb">
        <div
          style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
          className="container"
        >
          Trang chủ
        </div>
      </div>
      <div className="container">
        <section className="categories">
          <div className="title_section">Danh mục quà</div>
          <div className="row">
            {isLoading ? (
              <Skeleton/>
            ) : (
              categories.map((category, index) => (
                <div key={category.id} className="box_categories  col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <CategoryCard category={category}/>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="flashSale">
          <div className="title_section d-flex align-items-center">
            {" "}
            <Flash/>
            <div style={{margin: "0px 15px"}}>Sản phẩm đổi thưởng mới</div>
          </div>
          <div className="row justify-content-between">
            {isLoading ? (
              <Skeleton/>
            ) : (
              products.map((product, index) => (
                <div key={product.id} className="box_flashSale col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 mt-5">
                  <ProductCard product={product}/>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default Home;
