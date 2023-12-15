/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
    ArrowBottom,
    BoxPlus,
    Circle,
    Heart,
    Start,
} from "@/components/icon/SvgPage";
import {useInfiniteQuery, useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import ProductCard from "@/components/ProductCard";
import {Pagination, Skeleton} from "antd";
import AppLayout from "@/layouts/AppLayout";
import {current} from "@reduxjs/toolkit";
import {productFilters} from "@/constant/constant";
import {useCallback, useEffect, useState} from "react";
import {all} from "axios";
import {useRouter} from "next/router";
import queryString from "query-string";
import {formatPrice} from "@/utils";
import _debounce from 'lodash.debounce'

const SearchProduct = () => {
    const router = useRouter();
    const {q: queryParam} = router.query;
    const [currentFilter, setCurrentFilter] = useState("all");
    const [currentCategoriesFilter, setCurrentCategoriesFilter] = useState("");
    const [dataSearch, setDataSearch] = useState({
        page: 0,
        limit: 8,
        sortBy: "",
        sortDirection: "",
        q: "",
    });

    useEffect(() => {
        if (router.isReady) {
            setDataSearch({
                ...dataSearch,
                q: queryParam,
            });
        }
    }, [router.isReady, queryParam]);

    const {data: categoriesData = {}} = useQuery({
        queryKey: "getCategories",
        queryFn: () => {
            return apiServices.getCategories();
        },
    });

    const {data: maxPriceData = {}} = useQuery({
        queryKey: 'getMaxPrice', queryFn: () => {
            return apiServices.getMaxPrice();
        }
    })
    const maxPrice = Number(maxPriceData?.data)

    const {data: productsData = {}, isLoading: isLoadingProducts} = useQuery({
        queryKey: ["getProductsData", dataSearch],
        queryFn: ({queryKey}) => {
            return apiServices.getAllProducts(queryKey[1]);
        },
        keepPreviousData: true,
    });
    const {data: {contents: allProducts = []} = {}} = productsData;

    const {data: categories = []} = categoriesData;

    const handlePriceFilterDebounce = (value) => {
        setDataSearch({
            ...dataSearch,
            endPrice: value
        })
    }

    const debounceFn = useCallback(_debounce(handlePriceFilterDebounce, 300), [dataSearch])

    const [panelWidth, setPanelWidth] = useState(0);
    const [overlayActive, setOverlayActive] = useState(false);

    const openNav = () => {
        setPanelWidth("80%");
        setOverlayActive(true);
    };

    const closeNav = () => {
        setPanelWidth('0%');
        setOverlayActive(false);
    };


    return (
        <main>
            <div id="SearchProduct">
                <div style={{padding: "20px 0px"}} className="breadcrumb">
                    <div
                        style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
                        className="container"
                    >
                        Home {">"} Search {">"} {dataSearch.q}
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-xl-4  col-lg-4 mt-2 Sidepanel">
                            <div className="sideBar">
                                <div className="box-title-sidebar">Categories</div>
                                <nav className="list-title-product">
                                    <ul>
                                        {categories.map((category) => {
                                            return (
                                                <li
                                                    key={category.id}
                                                    className="d-flex justify-content-between pt-4 pb-2 mt-3 mb-1"
                                                    style={
                                                        currentCategoriesFilter === category.id
                                                            ? {fontWeight: "bold"}
                                                            : {}
                                                    }
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setCurrentCategoriesFilter(category.id);
                                                            setDataSearch({
                                                                ...dataSearch,
                                                                categoryId: category.id,
                                                            });
                                                        }}
                                                    >
                                                        {category.name}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                                <div
                                    className="mt-5 mb-5"
                                    style={{
                                        padding: "10px",
                                        borderTop: "1px solid #F4F5F6",
                                        borderBottom: "1px solid #F4F5F6",
                                        textAlign: "center",
                                    }}
                                >
                                    <button
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "#01221D",
                                        }}
                                    >
                                        Show All
                                    </button>
                                </div>
                                <div
                                    style={{
                                        borderBottom: "1px solid #F4F5F6",
                                    }}
                                >
                                    <div className="box-title-sidebar">Filters</div>
                                    {/*<div*/}
                                    {/*    className="mt-3"*/}
                                    {/*    style={{*/}
                                    {/*        fontSize: "12px",*/}
                                    {/*        fontWeight: "600",*/}
                                    {/*        color: "#01221D",*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    Color*/}
                                    {/*</div>*/}
                                    {/*<div className="d-flex justify-content-between mt-3">*/}
                                    {/*    <Circle/>*/}
                                    {/*    <Circle/>*/}
                                    {/*    <Circle/>*/}
                                    {/*    <Circle/>*/}
                                    {/*    <Circle/>*/}
                                    {/*    <Circle/>*/}
                                    {/*</div>*/}
                                    <div
                                        className="mt-3"
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: "#01221D",
                                        }}
                                    >
                                        Price
                                    </div>
                                    <div>
                                        <label htmlFor="customRange1" className="form-label">
                                            Range
                                        </label>
                                        <input
                                            type="range"
                                            className="form-range"
                                            id="customRange1"
                                            min={0}
                                            max={maxPrice}
                                            onChange={(e) => {
                                                debounceFn(e.target.value)
                                            }}
                                        ></input>
                                        <div className="d-flex justify-content-between mb-5">
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    color: "#01040D",
                                                }}
                                            >
                                                {formatPrice(dataSearch.endPrice || 0)} PP
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    color: "#01040D",
                                                }}
                                            >
                                                {formatPrice(maxPrice)} PP
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-5">
                                    <div className="box-title-sidebar">Rating</div>
                                    <button
                                        className="mt-4"
                                        style={{
                                            border: "1px solid #01040D",
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "16px",
                                        }}
                                    >
                                        <Start/>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="mt-5"
                                        style={{
                                            background: "#01040D",
                                            width: "100%",
                                            borderRadius: "16px",
                                            padding: "20px",
                                            fontSize: "15px",
                                            fontWeight: "700",
                                            color: "#fff",
                                        }}
                                    >
                                        Apply
                                    </button>
                                    <button
                                        className="mt-5 mb-5"
                                        style={{
                                            background: "#fff",
                                            width: "100%",
                                            borderRadius: "16px",
                                            padding: "20px",
                                            fontSize: "15px",
                                            fontWeight: "700",
                                            color: "#01040D",
                                            border: "1px solid #01040D",
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-2 content-SearchProduct">
                            <div
                                id="mySidepanel"
                                className="sidepanel"
                                style={{width: panelWidth}}
                            >
                                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
                                    &times;
                                </a>
                                <h2 className="title--filter">Filter</h2>
                                <div className="content--sidepane">
                                    <div className='title--categories'>
                                        categories
                                    </div>
                                    <nav className="list-title-product">
                                        <ul>
                                            {categories.map((category) => {
                                                return (
                                                    <li
                                                        key={category.id}
                                                        className="d-flex justify-content-between pt-4 pb-2 mt-3 mb-1"
                                                        style={
                                                            currentCategoriesFilter === category.id
                                                                ? {fontWeight: "bold"}
                                                                : {}
                                                        }
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                setCurrentCategoriesFilter(category.id);
                                                                setDataSearch({
                                                                    ...dataSearch,
                                                                    categoryId: category.id,
                                                                });
                                                            }}
                                                        >
                                                            {category.name}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div
                                className={`overlay ${overlayActive ? 'active' : ''}`}
                                onClick={closeNav}
                            ></div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="box-title-sidebar">
                                    Searched for {`"${dataSearch.q}"` || "all products"}
                                </div>
                                <button className="openbtn" onClick={openNav}>
                                    &#9776; Toggle Sidepanel
                                </button>
                            </div>
                            <div className="tabs mt-4">
                                <div className="row">
                                    <div className="Tabs d-flex tabs_reponsive">
                                        {productFilters.map((item) => {
                                            return (
                                                <div className="mt-3" key={item.code}>
                                                    <button
                                                        className={
                                                            currentFilter === item.code
                                                                ? "products-filter-btn active"
                                                                : "products-filter-btn"
                                                        }
                                                        onClick={() => {
                                                            setCurrentFilter(item.code);
                                                            setDataSearch({
                                                                ...dataSearch,
                                                                page: 0,
                                                                sortBy: item.filter.sortBy,
                                                                sortDirection: item.filter.sortDirection,
                                                            });
                                                        }}
                                                    >
                                                        {item.text}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                {isLoadingProducts ? (
                                    <Skeleton/>
                                ) : allProducts.length === 0 ? (
                                    <h2>No products match your search...</h2>
                                ) : (
                                    allProducts.map((product, index) => (
                                        <div key={product.id}
                                             className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 mt-4 position-relative"
                                             style={{zIndex: "-1"}}>
                                            <ProductCard product={product}/>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="text-center mt-5">
                                <Pagination
                                    current={dataSearch.page + 1}
                                    total={productsData?.data?.totalElements}
                                    pageSize={dataSearch.limit}
                                    onChange={(page, pageSize) => {
                                        setDataSearch({
                                            ...dataSearch,
                                            page: page - 1,
                                            limit: pageSize,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

SearchProduct.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default SearchProduct;