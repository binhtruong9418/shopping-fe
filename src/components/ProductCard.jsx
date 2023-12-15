/* eslint-disable @next/next/no-img-element */
import {BoxPlus, Plus} from "@/components/icon/SvgPage";
import {formatPrice} from "@/utils";
import Link from "next/link";
import {useRouter} from "next/router";
import apiServices from "@/services/apiServices";
import {Tooltip} from "antd";

const ProductCard = ({product}) => {
  const router = useRouter();
  return (
    <>
      <div style={{
        boxShadow: "0px 4px 30px 0px #1B19561A",
        padding: "25px",
        borderRadius: 20,
        position: "relative"
      }}>
        <Link href={`/products/${product.id}`}>
          <img
            className="mt-3"
            style={{width: "100%", height: "70%",}}
            src={product.images.split(',')[0]}
            alt={product.name}
          />
          <div
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "#01221D",
              textAlign: "center",
              marginTop: "10px",
            }}
          >

            <div>{product.name.length > 27
              ? product.name?.substring(0, 27) + '...'
              : product.name}
            </div>

          </div>
        </Link>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#01040D",
            marginRight: "10px",
            marginBottom: "30px",
            textAlign: "center",
            paddingTop: "10px",
          }}
        >
          {formatPrice(product.price) + " điểm"}
        </div>
        <Tooltip title="Thêm vào giỏ hàng" placement="top">
          <div
            className="boxPlus"
            onClick={async () => {
              const orderData = await apiServices.createOrder({
                "productId": product.id,
                "quantity": 1
              })
              await router.push(`/cart`);
            }}
          >
            <Plus/>
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default ProductCard;
