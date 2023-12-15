/* eslint-disable @next/next/no-img-element */
import {useState} from "react";
import AppLayout from "@/layouts/AppLayout";
import Column from "antd/lib/table/Column";
import {DEFAULT_AVATAR_IMG} from "@/constant/constant";
import {Col, Form, Image, Rate, Select} from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {useForm} from "antd/lib/form/Form";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import {StarOutlined} from "@ant-design/icons";

const Review = () => {
  useAuth();
  const [form] = useForm();
  const [isUploadingReview, setIsUploadingReview] = useState(false);
  const [selectedProduct, setSeletedProduct] = useState(0);
  const router = useRouter();
  const {id: orderId} = router.query;
  // const {data: productData = {}, isLoading: isLoadingProduct} = useQuery({
  //     queryKey: ["getProductById", queryParam],
  //     queryFn: ({queryKey}) => apiServices.getProductById(queryKey[1]),
  // });
  // const {data: product = {}} = productData;
  // console.log("router", router);
  const {data: orderData = {}, isLoading: isLoadingOrders, refetch: refetchOrders} = useQuery({
    queryKey: ["getAllOrders", orderId], queryFn: ({queryKey}) => apiServices.getAllOrders({
      id: queryKey[1]
    })
  })
  const {data: {contents: orders = []} = {}} = orderData;
  const orderDetails = orders[0]?.orderDetails;
  // console.log(orderDetails)

  let productList = [];

  orderDetails?.map((orderDetail, index) => {
    productList.push({
      value: index,
      label: orderDetail?.product?.name,
    });
  })

  // console.log(orderDetails?.at(selectedProduct)?.productId);


  const uploadReview = async (values) => {
    try {
      setIsUploadingReview(true);
      const reviewData = await apiServices.createReview({
        ...values,
        productId: orderDetails?.at(selectedProduct)?.productId,
      });
      await router.push(`/products/${orderDetails?.at(selectedProduct)?.productId}`)
    } catch (err) {
      throw new Error(err.message)
    } finally {
      setIsUploadingReview(false)
      form.resetFields()
    }
  }

  const onUploadReview = async (values) => {
    await toast.promise(uploadReview(values), {
      success: () => "Uploaded your review successfully!",
      loading: () => "Uploading your review...",
      error: (err) => `${err.message}`
    })
  }
  return (
    <main>
      <div id="review">
        <div style={{padding: "20px 0px"}} className="breadcrumb">
          <div
            style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
            className="container"
          >
            Trang chủ {">"} Đơn hàng {">"} Đánh giá sản phẩm
          </div>
        </div>
        <div className="container">
          <div
            style={{
              fontSize: "24px", fontWeight: "700", color: "#01040D",
            }}
          >
            Đánh giá sản phẩm
          </div>
          {orders.length === 0
            ? <div className='mt-5'>Order Not found...</div>
            : <div style={{textAlign: "center"}}>
              <Col>
                <div className='mt-5 mb-5'>
                  <Select
                    defaultValue={selectedProduct}
                    placeholder="Select product to review"
                    style={{
                      width: '30%',
                    }}
                    options={productList}
                    onChange={(value) => {
                      setSeletedProduct(value);
                    }}
                  >

                  </Select>
                </div>

                <Image
                  width={160}
                  src={orderDetails?.at(selectedProduct).product?.images?.split(',')[0]}
                  alt="test"
                />
                <Title className='mt-3'
                       level={4}>{orderDetails?.at(selectedProduct).product?.name}</Title>
                <Form
                  form={form}
                  onFinish={(values) => onUploadReview(values)}
                >
                  <Form.Item name='rating'>
                    <Rate
                      className='mt-3'
                      style={{fontSize: 40}}
                    />
                  </Form.Item>
                  <Form.Item name='content'>
                    <div className='mt-5'>
                      <TextArea style={{width: '50%', resize: 'none'}} rows={6}
                                placeholder="Write your review..." maxLength={120} showCount/>
                    </div>
                  </Form.Item>
                </Form>

                <button
                  style={{
                    background: "#01040D",
                    color: "#fff",
                    width: "30%",
                    padding: "20px",
                    borderRadius: "15px",
                    marginTop: "50px",
                  }}
                  onClick={() => {
                    form.submit()
                  }}
                  disabled={isUploadingReview}
                >
                  {isUploadingReview ? "Đang gửi đánh giá..." : "Đánh giá sản phẩm"}
                </button>
              </Col>
            </div>
          }


        </div>
      </div>
    </main>
  );
};


Review.getLayout = (page) => (<AppLayout>{page}</AppLayout>)

export default Review;
