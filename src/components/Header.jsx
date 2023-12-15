/* eslint-disable @next/next/no-img-element */
import {SvgHeaderSignIn, CartButton, Menu} from "./icon/SvgPage";
import ProfileModal from "@/components/ProfileModal";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DEFAULT_AVATAR_IMG, RECENT_SEARCH_KEY} from "@/constant/constant";
import {useUser} from "@/state/user";
import {Avatar, Button, Dropdown, Flex, Image} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Link from "next/link";
import {FiTruck} from "react-icons/fi";
import {IoTrashOutline} from "react-icons/io5";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";

const Header = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const {user} = useUser();
  const [searchKeyWords, setSearchKeyWords] = useState([]); // ["abc", "xyz"]
  useEffect(() => {
    const searchKeyWords = window.localStorage.getItem(RECENT_SEARCH_KEY) ?? "[]";
    const searchKeyWordsArr = JSON.parse(searchKeyWords); // ["abc", "xyz"]
    setSearchKeyWords(searchKeyWordsArr);
  }, []);
  const {
    data: productData = {}
  } = useQuery("apiServices.getAllProducts", () => apiServices.getAllProducts())
  const {data: {contents: products = []} = {}} = productData;

  const items = [
    {
      key: 'recent-search',
      type: 'group',
      label: (
        <div style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#000",
          marginBottom: "10px",
        }}>Tìm kiếm gần đây</div>
      ),
      children: searchKeyWords.map((item, index) => {
        return {
          key: index,
          label: (

            <Flex justify='space-between'>
              <Link
                href={`/search?q=${item}`}
                style={{fontSize: "16px", color: "#000", width: "90%"}}
              >
                {item}
              </Link>
              <Button type='text' danger onClick={() => {
                const newSearchKeyWordsArr = searchKeyWords.filter((i) => i !== item);
                setSearchKeyWords(newSearchKeyWordsArr)
                window.localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(newSearchKeyWordsArr));
              }}>
                <IoTrashOutline/>
              </Button>
            </Flex>
          ),
        }
      })
    },
    {
      key: '1',
      type: 'group',
      label: (
        <div style={{
          fontSize: "16px",
          fontWeight: "700",
          color: "#000",
          margin: "10px 0",
        }}>Sản phẩm được tìm kiếm nhiều</div>
      ),
      children: [
        {
          key: 1,
          label: (
            <>
              <Flex justify='space-between'>
                {
                  products.slice(0, 3).map((item) => (
                    <Link href={`/products/${item.id}`} key={item.id}>
                      <Flex align='center'>
                        <div style={{marginRight: 10}}>{item.name}</div>
                        <Image src={item?.images?.split(",")?.[0]} width={50} height={50} preview={false}
                               alt='product-img'/>
                      </Flex>
                    </Link>
                  ))
                }


              </Flex>

              <Flex justify='space-between' style={{marginTop: 20}}>
                {
                  products.slice(3, 6).map((item) => (
                    <Link href={`/products/${item.id}`} key={item.id}>
                      <Flex align='center'>
                        <div style={{marginRight: 10}}>{item.name}</div>
                        <Image src={item?.images?.split(",")?.[0]} width={50} height={50} preview={false}
                               alt='product-img'/>
                      </Flex>
                    </Link>
                  ))
                }
              </Flex>
            </>
          )
        }
      ],
    }
  ];
  return (
    <>
      <div id="header">
        <div className="container">
          <div className="header_top w-100 d-flex align-items-center">
            <div onClick={() => setOpenMenu(!openMenu)} className="menu_reponsive">
              <Menu/>
            </div>
            {openMenu ? (
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  background: "rgb(244, 245, 246)",
                  top: "30px",
                  zIndex: "999999",
                  borderRadius: "16px",
                }}
                className="menu_reponsive_topBar"
              >
                <ul>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      borderBottom: "1px solid #a1a1a1",
                      margin: "0px 20px",
                    }}
                  >
                    <Link href="/">Trang chủ</Link>
                  </li>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      borderBottom: "1px solid #a1a1a1",
                      margin: "0px 20px",
                    }}
                  >
                    <Link href="/products">Sản phẩm</Link>
                  </li>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      borderBottom: "1px solid #a1a1a1",
                      margin: "0px 20px",
                    }}
                  >
                    <Link href="/ranking">Bảng xếp hạng</Link>
                  </li>
                  <li
                    style={{
                      padding: "10px ",
                      fontSize: "16px",
                      fontWeight: "700",
                      textAlign: "center",
                      margin: "0px 20px",
                    }}
                  >
                    <Link href="/campaign">Chiến dịch thu gom</Link>

                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )}

            <div className="logo_page w-30">
              <SvgHeaderSignIn/>
            </div>
            <div className="search_header w-40">
              <Dropdown
                menu={{items}}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const q = e.target.q.value;
                    //add recent search
                    const searchKeyWords = window.localStorage.getItem(RECENT_SEARCH_KEY) ?? "[]";
                    const searchKeyWordsArr = JSON.parse(searchKeyWords); // ["abc", "xyz"]
                    const newSearchKeyWordsArr = [...searchKeyWordsArr, q];
                    setSearchKeyWords(newSearchKeyWordsArr)
                    window.localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(newSearchKeyWordsArr));
                    await router.push(`/search?q=${q}`);
                    //clear input
                    e.target.q.value = "";  //clear input
                  }}>
                    <input
                      autoComplete="off"
                      name='q'
                      style={{background: "none", padding: "10px 50px", color: 'white'}}
                      className="input_elm w-100"
                      type="text"
                      placeholder="Search"
                    />
                  </form>
                </a>
              </Dropdown>
            </div>
            <SearchOutlined
              style={{
                fontSize: 25,
                margin: 16,
                color: "white",
                cursor: "pointer",
              }}
            />

            <div className="account w-30 d-flex align-items-center justify-content-between">
              <div className="d-flex">
                  <span style={{margin: "0px 10px", cursor: "pointer"}}>
                    <button onClick={() => router.push("/cart")}>
                      <CartButton/>
                    </button>
                  </span>
                <span style={{margin: "0px 10px", cursor: "pointer", color: "#fff", fontSize: 26}}>
                    <button onClick={() => router.push("/order")}>
                      <FiTruck/>
                    </button>
                  </span>
              </div>
              <div>
                {user?.id > 0 ? (
                  <div
                    onClick={() => {
                      setOpenProfileModal(true);
                    }}
                    className="d-flex align-items-center cursor-pointer account_rps"
                  >
                    <Avatar
                      shape="square"
                      size={36}
                      icon={
                        <img
                          src={user.avatar || DEFAULT_AVATAR_IMG}
                          alt=""
                        />
                      }
                    />
                    <div className="text-light mx-3">{user.name}</div>
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      await router.push("/login");
                    }}
                    style={{
                      border: "1px solid #fff",
                      borderRadius: "16px",
                      padding: "10px 20px",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                    className="text-white"
                    type="button"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="topBar">
            <nav>
              <ul
                style={{margin: "15px 0px"}}
                className="text-white d-flex justify-content-center"
              >
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                  onClick={() => router.push('/')}
                >
                  Trang chủ
                </li>
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                  onClick={() => router.push('/products')}
                >
                  Sản phẩm
                </li>
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                  onClick={() => router.push('/ranking')}
                >
                  BXH
                </li>
                <li
                  className="mx-50"
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: "pointer",
                    padding: "20px 30px",
                  }}
                  onClick={() => router.push('/campaign')}
                >
                  Chiến dịch
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <ProfileModal open={openProfileModal} setOpen={setOpenProfileModal}/>
    </>
  );
};
export default Header;
