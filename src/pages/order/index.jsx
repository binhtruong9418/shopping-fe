/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Confirmed,
  Photo,
  Start,
  Tracking,
  Video,
} from "@/components/icon/SvgPage";
import AppLayout from "@/layouts/AppLayout";
import {LiaShippingFastSolid} from "react-icons/lia";
import {FcCancel} from "react-icons/fc";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {useEffect, useState} from "react";
import {log} from "next/dist/server/typescript/utils";
import {formatPrice} from "@/utils";
import {allOrderStatus} from "@/constant/constant";
import {Skeleton} from "antd";
import toast from "react-hot-toast";
import ReviewProductModal from "@/components/review/ReviewProductModal";
import {useRouter} from "next/router";

const Order = () => {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState([allOrderStatus.SHIPPING, allOrderStatus.COMPLETED])
  const [activeStatus, setActiveStatus] = useState(1);  // 1: shipping, 2: completed, 3: cancelled
  const [isOpenReviewProduct, setIsOpenReviewProduct] = useState(false);
  const {data: ordersData = {}, isLoading: isLoadingOrders, refetch: refetchOrders} = useQuery({
    queryKey: ["getAllOrders", orderStatus], queryFn: ({queryKey}) => apiServices.getAllOrders({
      status: queryKey[1]
    })
  })

  const listOrderStatus = [
    {
      id: 1,
      label: "Chờ giao hàng",
      status: [allOrderStatus.SHIPPING, allOrderStatus.COMPLETED],
      icon: <LiaShippingFastSolid
        style={{
          width: "40px",
          height: "40px",
          viewBox: "0 0 40 40",
          margin: " 0 auto",
          cursor: "pointer",
        }}
      />
    },
    {
      id: 2,
      label: "Đã nhận hàng",
      status: [allOrderStatus.RECEIVED],
      icon: <Confirmed/>
    },
    {
      id: 3,
      label: "Đã hủy",
      status: [allOrderStatus.CANCELLED],
      icon: <FcCancel
        style={{
          width: "40px",
          height: "40px",
          viewBox: "0 0 40 40",
          margin: " 0 auto",
          cursor: "pointer",
        }}
      />
    }
  ]


  const {data: {contents: allOrders = []} = {}} = ordersData

  const showDeliveringOrders = () => {
    setOrderStatus([allOrderStatus.SHIPPING, allOrderStatus.COMPLETED]);
  }

  const showCompletedOrders = () => {
    setOrderStatus([allOrderStatus.RECEIVED]);
  }

  const showCancelledOrders = () => {
    setOrderStatus([allOrderStatus.CANCELLED])
  }

  const handleConfirmOrder = async (id) => {
    const confirmOrderData = await apiServices.confirmOrder(id)
    await refetchOrders()
    console.log(confirmOrderData)
  }

  const submitConfirmOrder = async (id) => {
    toast.promise(handleConfirmOrder(id), {
      success: () => `Confirm your order successfully. Order code: ${id}`,
      loading: () => "Confirming your order...",
      error: (err) => `${err.message}`
    })
  }

  const handleCancelOrder = async (id) => {
    const cancelOrderData = await apiServices.cancelOrder(id)
    await refetchOrders()
    console.log(cancelOrderData)
  }

  const submitCancelOrder = async (id) => {
    toast.promise(handleCancelOrder(id), {
      success: () => `Cancel your order successfully. Order code: ${id}`,
      loading: () => "Cancelling your order...",
      error: (err) => `${err.message}`
    })
  }


  return (
    <main>
      <div id="order">
        <div style={{padding: "20px 0px"}} className="breadcrumb">
          <div
            style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
            className="container"
          >
            Trang chủ {">"} đơn hàng
          </div>

        </div>
        <div className="container">
          <div
            style={{
              fontSize: "24px", fontWeight: "700", color: "#01040D",
            }}
          >
            Tất cả đơn hàng
          </div>
          <section className="mainOrder size_container_elm">
            <nav>
              <ul className="d-flex justify-content-between mb-3">
                {
                  listOrderStatus.map((item) => {
                    return (
                      <li key={item.id}
                          onClick={() => {
                            setOrderStatus(item.status)
                            setActiveStatus(item.id)
                          }}
                          style={{cursor: 'pointer'}}
                      >
                        {item.icon}
                        <p
                          style={activeStatus === item.id ? {
                            fontSize: "12px",
                            marginTop: "10px",
                            fontWeight: "bold"
                          } : {
                            fontSize: "12px",
                            marginTop: "10px",
                            fontWeight: "400"
                          }}
                        >
                          {item.label}
                        </p>
                      </li>
                    )
                  })
                }
              </ul>
            </nav>
          </section>
          {isLoadingOrders ? <Skeleton/> :
            allOrders.length === 0 ? <div>No order found...</div> :
              allOrders.map((order) => {
                return (
                  <section className="productOrder size_container_elm" key={order.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="title_elm">Sản phẩm</div>
                      <div>
                        <button
                          style={{
                            padding: "6px 12px 6px 12px",
                            borderRadius: "8px",
                            background: "#07BFA51A",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#07BFA5",
                          }}
                          type="button"
                        >
                          Mã đơn hàng: {order.id}
                        </button>
                      </div>
                    </div>
                    {
                      order?.orderDetails?.map((orderItem) => {
                        return (
                          <div className="d-flex align-items-center mb-3"
                               key={order.orderDetails?.id}>
                            <img src={orderItem?.product?.images.split(',')[0]}
                                 alt={orderItem?.product?.name}
                                 width={60} height={60}
                                 style={{borderRadius: 10}}
                            />
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#01221D",
                                marginLeft: "20px",
                              }}
                            >
                              {orderItem.product.name} <b>{` x${orderItem.quantity}`}</b>
                            </span>
                          </div>
                        )
                      })
                    }
                    <div style={{display: "flex", justifyContent: "space-between"}}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#01221D",
                }}
              >
                {order.orderDetails.length} Sản phẩm
              </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#01221D",
                        }}
                      >
                {formatPrice(order.amount)} Điểm
              </span>
                    </div>
                    {
                      activeStatus === 1 && (
                        <>
                          <button
                            style={{
                              background: order.status === allOrderStatus.COMPLETED ? "#01040D" : "gray",
                              color: "#fff",
                              width: "100%",
                              padding: "20px",
                              borderRadius: "15px",
                              marginTop: "30px",
                            }}
                            disabled={order.status !== allOrderStatus.COMPLETED}
                            onClick={() => submitConfirmOrder(order.id)}
                          >
                            Đã nhận được hàng
                          </button>
                          {
                            order.status === allOrderStatus.SHIPPING && (
                              <button
                                style={{
                                  background: "#01040D",
                                  color: "#fff",
                                  width: "100%",
                                  padding: "20px",
                                  borderRadius: "15px",
                                  marginTop: "30px",
                                }}
                                onClick={() => submitCancelOrder(order.id)}
                              >
                                Hủy đơn hàng
                              </button>
                            )
                          }
                        </>
                      )
                    }
                    {
                      activeStatus === 2 && (
                        <>
                          <button
                            style={{
                              background: "#01040D",
                              color: "#fff",
                              width: "100%",
                              padding: "20px",
                              borderRadius: "15px",
                              marginTop: "30px",
                            }}
                            onClick={async () => {
                              await router.push(`/order/${order?.id}/review`)
                            }}
                          >
                            Đánh giá sản phẩm
                          </button>
                        </>
                      )
                    }
                    {
                      activeStatus === 3 && (
                        <>
                          <button
                            style={{
                              background: "#01040D",
                              color: "#fff",
                              width: "100%",
                              padding: "20px",
                              borderRadius: "15px",
                              marginTop: "30px",
                            }}
                            onClick={async () => {
                             await router.push(`/products/${order?.orderDetails?.[0]?.product?.id}`)
                            }}
                          >
                            Mua lại
                          </button>
                        </>
                      )
                    }
                  </section>
                )
              })
          }

        </div>
      </div>
      {/*<ReviewProductModal*/}
      {/*    isOpen={isOpenReviewProduct}*/}
      {/*    setIsOpen={setIsOpenReviewProduct}*/}
      {/*    order={}*/}
      {/*/>*/}
    </main>
  );
};

Order.getLayout = (page) => (<AppLayout>{page}</AppLayout>)

export default Order;
