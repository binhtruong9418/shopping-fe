import AppLayout from "@/layouts/AppLayout";
import {useRef, useState} from "react";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {Pagination} from "antd";
import ProductCard from "@/components/ProductCard";
import {productFilters} from "@/constant/constant";


const AllProducts = () => {
    const [currentFilter, setCurrentFilter] = useState('all')
    const [dataSearch, setDataSearch] = useState({
        page: 0, limit: 8, sortBy: "", sortDirection: ""
    })
    const topProductRef = useRef(null);

    const {
        data: productData = {}, isLoading
    } = useQuery(["apiServices.getAllProducts", dataSearch], ({queryKey}) => apiServices.getAllProducts(queryKey[1]), {
        keepPreviousData: true
    })

    const {data: {contents: allProducts = []} = {}} = productData;
    return (<div id="AllShop">
        <div style={{ padding: "20px 0px" }} className="breadcrumb">
            <div
                style={{ fontSize: "14px", fontWeight: "400", color: "#01040D" }}
                className="container"
            >
                Trang chủ {">"} Sản phẩm
            </div>
        </div>
        <div className="container">
            <section>
                <div className="pb-5 mt-3">
                    <div
                        style={{
                            fontSize: "24px", fontWeight: "700", color: "#01040D",
                        }}
                        ref={topProductRef}
                    >
                        Tất cả sản phẩm
                    </div>
                    <div className="Tabs mt-3 d-flex tabs_reponsive">
                        {productFilters.map(item => (<div className="mt-3" key={item.code}>
                            <button
                                className={currentFilter === item.code ? 'products-filter-btn active' : 'products-filter-btn'}
                                onClick={() => {
                                    setCurrentFilter(item.code)
                                    setDataSearch({
                                        ...dataSearch,
                                        page: 0,
                                        sortBy: item.filter.sortBy,
                                        sortDirection: item.filter.sortDirection,
                                    })
                                }}
                            >
                                {item.text}
                            </button>
                        </div>))}
                    </div>
                    <div className="row justify-content-between">
                        {
                            allProducts.map((product, index) => (
                                <div key={product.id} className="col-3 mt-5 position-relative">
                                    <ProductCard product={product}/>
                                </div>))
                        }
                    </div>
                </div>
            </section>
        </div>
        <Pagination
            className="text-center mt-5"
            current={dataSearch.page + 1}
            onChange={(page, pageSize) => {
                if (topProductRef.current) {
                    topProductRef.current.scrollIntoView({
                        behavior: "smooth"
                    });
                }
                setDataSearch({
                    ...dataSearch, page: page - 1, limit: pageSize,
                })
            }}
            total={productData.data?.totalElements}
            pageSize={dataSearch.limit}
            // showSizeChanger={true}
        />;
    </div>);
};

AllProducts.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default AllProducts;
