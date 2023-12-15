/* eslint-disable @next/next/no-img-element */
import AppLayout from "@/layouts/AppLayout";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {Input, InputNumber, Skeleton} from "antd";
import {formatPrice} from "@/utils";
import Link from "next/link";
import {DeleteOutlined, LeftOutlined} from "@ant-design/icons";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import useAuth from "@/hooks/useAuth";

const Cart = () => {
  useAuth();
  const router = useRouter()
  const {data: ordersData = {}, isLoading: isLoadingCart, refetch: refetchOrders} = useQuery({
    queryKey: ["getAllOrders"], queryFn: ({queryKey}) => apiServices.getAllOrders({
      status: 1
    })
  })
  const {data: {contents: allOrders = []} = {}} = ordersData;

  let createdOrder = []
  //flat orderDetails
  allOrders.forEach((order) => {
    createdOrder = createdOrder.concat(order.orderDetails)
  })

  console.log("allOrders", allOrders)
  let totalPrice = 0;
  createdOrder.forEach((orderItem) => {
    totalPrice = totalPrice + orderItem.price * orderItem.quantity
  })

  const handleDeleteItem = async (item) => {
    try {
      const updateOrderData = await apiServices.updateOrderById(item.orderId, {
        "productId": item.productId,
        "quantity": 0
      })
      console.log(updateOrderData)
      await refetchOrders();
    } catch (err) {
      throw new Error(err)
    }

  }

  const handleChangeQuantityItem = async (value, item) => {
    try {
      if (value !== null) {
        const updateOrderData = await apiServices.updateOrderById(item.orderId, {
          "productId": item.productId,
          "quantity": value
        })
        console.log(updateOrderData)
        await refetchOrders()
      }
    } catch (err) {
      throw new Error(err.message)
    }

  }
  console.log(createdOrder)

  const handleCheckOut = async () => {
    try {
      let orderId = 0;
      allOrders.forEach((order) => {
        if (order.status === 1) {
          orderId = order.id;
        }
      })
      const checkOutData = await apiServices.purchaseOrder(orderId)
      await refetchOrders()
      router.push('/order')
    } catch (err) {
      throw new Error(err.message);
    }

  }

  const handleSubmitCheckOut = () => {
    toast.promise(handleCheckOut(), {
      success: () => {
        return "Purchased successfully!"
      },
      loading: "Purchasing...",
      error: (err) => {
        return `${err.message}`
      }
    })
  }

  const handleClearAllOrder = async () => {
    createdOrder.map(async (order) => {
      const deletedData = await apiServices.updateOrderById(order.orderId, {
        "productId": order.productId,
        "quantity": 0,
      })
      await refetchOrders()
      console.log(deletedData)
    })
  }

  return (
    <div id="cart">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 d-flex justify-content-between align-items-center">
            <div
              style={{fontSize: "22px", fontWeight: "700", color: "#01040D"}}
            >
              Giỏ hàng
            </div>
            <div>
              <button
                style={{
                  border: "1px solid red",
                  borderRadius: "12px",
                  padding: "2px 16px",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "red",
                }}
                onClick={() => handleClearAllOrder()}
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            {isLoadingCart ? <Skeleton/>
              :
              createdOrder.length === 0 ? <h1>Bạn hiện không có sản phẩm nào trong giỏ hàng...</h1>
                :
                createdOrder.map(orderItem => {
                  return (
                    <div className="box-cart" key={orderItem.id}>
                      <div className="d-flex align-items-center">
                        <img
                          onClick={() => router.push(`/products/${orderItem.productId}`)}
                          src={orderItem.product.images.split(',')[0]}
                          alt={orderItem.product.name}
                          style={{
                            cursor: "pointer",
                            width: 120,
                            height: 120
                          }}/>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "#01221D",
                          }}
                          className="ms-3"
                        >
                          {orderItem.product.name}
                        </div>
                        <div style={{padding: 20}}>
                          <h3>SL: </h3>
                          <InputNumber
                            min={0}
                            max={orderItem.product.quantity}
                            step={1}
                            style={{
                              width: '40%',
                            }}
                            size={"small"}
                            defaultValue={orderItem.quantity}
                            onChange={(value) => handleChangeQuantityItem(value, orderItem)}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#01040D",
                        }}
                      >
                        {formatPrice(orderItem.product.price * orderItem.quantity)} Điểm
                      </div>
                      <button
                        onClick={() => handleDeleteItem(orderItem)}
                      >
                        <DeleteOutlined
                          style={{color: 'red'}}
                        />
                      </button>
                    </div>
                  )
                })
            }
            <Link
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginTop: "40px",
                display: "flex",
                alignItems: "center",
              }}
              href='/products'
            >
              <LeftOutlined/>
              <span className="ms-2">Tìm kiếm sản phẩm</span>
            </Link>
          </div>


          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="order_summary">
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#01040D",
                }}
              >
                Thông tin đơn hàng
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#01040D",
                  marginTop: "20px",
                }}
              >
                Điểm
              </p>
              <nav>
                <ul>
                  <li
                    className="d-flex justify-content-between"
                    style={{marginTop: "16px"}}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#01221D",
                      }}
                    >
                      Tổng điểm đơn hàng
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#01040D",
                      }}
                    >
                      {formatPrice(totalPrice)} Điểm
                    </div>
                  </li>
                  <li
                    className="d-flex justify-content-between"
                    style={{marginTop: "16px"}}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#01221D",
                      }}
                    >
                      Phí vận chuyển
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#01040D",
                      }}
                    >
                      0.00 Điểm
                    </div>
                  </li>
                  <li
                    className="d-flex justify-content-between"
                    style={{marginTop: "16px"}}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#01221D",
                      }}
                    >
                      Voucher
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#01040D",
                      }}
                    >
                      0.00 Điểm
                    </div>
                  </li>
                  <li className="line_cart"></li>
                  <li
                    className="d-flex justify-content-between"
                    style={{marginTop: "16px"}}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#01221D",
                      }}
                    >
                      Tổng cộng
                    </div>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#01040D",
                      }}
                    >
                      {formatPrice(totalPrice)} Điểm
                    </div>
                  </li>
                </ul>
              </nav>
              {/*<div className="position-relative" style={{marginTop: "24px"}}>*/}
              {/*  <input*/}
              {/*    style={{*/}
              {/*      border: "1px solid #8991A4",*/}
              {/*      borderRadius: "12px",*/}
              {/*      width: "100%",*/}
              {/*      padding: "15px 16px",*/}
              {/*      color: "#01040D",*/}
              {/*    }}*/}
              {/*    placeholder="Nhập mã giảm giá"*/}
              {/*    type="text"*/}
              {/*  />*/}
              {/*  <button*/}
              {/*    style={{*/}
              {/*      border: "1px solid #01040D",*/}
              {/*      borderRadius: "12px",*/}
              {/*      position: "absolute",*/}
              {/*      padding: "16px 46px",*/}
              {/*      right: "0px",*/}
              {/*      color: "#01040D",*/}
              {/*      fontSize: "15px",*/}
              {/*      fontWeight: "700",*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    Apply*/}
              {/*  </button>*/}
              {/*</div>*/}
              <div style={{marginTop: "40px"}}>
                <button
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    borderRadius: "16px",
                    background: "#01040D",
                    width: "100%",
                    padding: "20px 0px",
                  }}
                  onClick={() => handleSubmitCheckOut()}
                >
                  Thanh toán đơn hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const CartWithAuth = withAuth(Cart);
Cart.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default Cart;
