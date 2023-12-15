/* eslint-disable @next/next/no-img-element */
import { Modal } from "antd";
import { useState } from "react";
import {
  ArrowRight,
  Email,
  Home,
  Notifications,
  Telephone,
  User,
} from "./icon/SvgPage";
import { useUser } from "@/state/user";
import { BiMoney } from "react-icons/bi";
import { MdMoney } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import {TbLogout} from "react-icons/tb";
import {formatPrice} from "@/utils";
import {DEFAULT_AVATAR_IMG, PROFILE_STORAGE_KEY} from "@/constant/constant";
import {useRouter} from "next/router";

const ProfileModal = ({ open, setOpen }) => {
  const [activeTabs, setActiveTabs] = useState(1);
  const router = useRouter()
  const { user , onClearUser} = useUser();
  const handleTabClick = (id) => {
    setActiveTabs(id);
  };

  const handleLogOut = () => {
    localStorage.removeItem(PROFILE_STORAGE_KEY)
    onClearUser()
    router.replace('/login')
  }

  return (
      <Modal
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          footer={null}
          width={800}
      >
        <div
            className="text-center"
            style={{ fontSize: "24px", fontWeight: "700", color: "#01040D" }}
        >
          Profile
        </div>
        <div className="modal_content">
          <div className="banner_modal">
            <img className="w-100 mt-3" src="img/BannerModal.png" alt="" />
          </div>
          <div className="profile_avt">
            <img style={{ margin: " 0 auto", width: 120, height: 120, borderRadius: 30}} src={user?.avatar || DEFAULT_AVATAR_IMG} alt="" />
          </div>
          <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#01040D",
                textAlign: "center",
                marginTop: "15px",
              }}
          >
            {user.name}
          </div>
          <div className="tabs">
            <ul className="tabsPage">
              <li
                  className={activeTabs === 1 ? "active" : ""}
                  onClick={() => {
                    handleTabClick(1);
                  }}
              >
                Personal Info
              </li>
              <li
                  className={activeTabs === 2 ? "active" : ""}
                  onClick={() => {
                    handleTabClick(2);
                  }}
              >
                Favourite
              </li>
              <li
                  className={activeTabs === 3 ? "active" : ""}
                  onClick={() => {
                    handleTabClick(3);
                  }}
              >
                My Reviews
              </li>
              <li
                  className={activeTabs === 4 ? "active" : ""}
                  onClick={() => {
                    handleTabClick(4);
                  }}
              >
                Settings
              </li>
            </ul>
            <div className="tab_content">
              {activeTabs === 1 && (
                  <div className="tab_panel">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center mt-5">
                        <div className="user_modal">
                          <User />
                        </div>
                        <div className="personal_information_modal ms-4">
                          <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#8991A4",
                              }}
                          >
                            Name
                          </p>
                          <h4
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#01040D",
                              }}
                          >
                            {user.name}
                          </h4>
                        </div>
                      </div>
                      <div className="col-6 d-flex align-items-center mt-5">
                        <div className="user_modal">
                          <Telephone />
                        </div>
                        <div className="personal_information_modal ms-4">
                          <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#8991A4",
                              }}
                          >
                            Phone number
                          </p>
                          <h4
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#01040D",
                              }}
                          >
                            {user.phone || "Phone number not found..."}
                          </h4>
                        </div>
                      </div>
                      <div className="col-6 d-flex align-items-center mt-5">
                        <div className="user_modal">
                          <Email />
                        </div>
                        <div className="personal_information_modal ms-4">
                          <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#8991A4",
                              }}
                          >
                            Email
                          </p>
                          <h4
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#01040D",
                              }}
                          >
                            {user.email}
                          </h4>
                        </div>
                      </div>
                      <div className="col-6 d-flex align-items-center mt-5">
                        <div className="user_modal">
                          <RiMoneyDollarCircleLine
                              style={{ width: 30, height: 30 }}
                          />
                        </div>
                        <div className="personal_information_modal ms-4">
                          <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "#8991A4",
                              }}
                          >
                            Paper Point
                          </p>
                          <h4
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#01040D",
                              }}
                          >
                            {formatPrice(user.paperPoint)}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-5">
                      <button
                          style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#fff",
                            borderRadius: "16px",
                            background: "#01040D",
                            padding: "21px 172px",
                          }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
              )}
              {activeTabs === 2 && <div className="tab_panel">a1212</div>}
              {activeTabs === 3 && <div className="tab_panel">a3432</div>}
              {activeTabs === 4 && (
                  <div className="tab_panel">
                    <div className="row">
                      <div className="col-6 mt-4">
                        <div
                            style={{
                              background: "#fff",
                              boxShadow: "0px 4px 30px 0px #1B19561A",
                              borderRadius: "16px",
                              padding: "21px 12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: 'pointer'
                            }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Notifications />
                            <div
                                style={{
                                  marginLeft: "12px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#01040D",
                                }}
                            >
                              Notification0s
                            </div>
                          </div>
                          <div>
                            <ArrowRight />
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-4">
                        <div
                            style={{
                              background: "#fff",
                              boxShadow: "0px 4px 30px 0px #1B19561A",
                              borderRadius: "16px",
                              padding: "21px 12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: 'pointer'
                            }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Notifications />
                            <div
                                style={{
                                  marginLeft: "12px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#01040D",
                                }}
                            >
                              Blocked Users
                            </div>
                          </div>
                          <div>
                            <ArrowRight />
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-4">
                        <div
                            style={{
                              background: "#fff",
                              boxShadow: "0px 4px 30px 0px #1B19561A",
                              borderRadius: "16px",
                              padding: "21px 12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: 'pointer'
                            }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Notifications />
                            <div
                                style={{
                                  marginLeft: "12px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#01040D",
                                }}
                            >
                              Payment Methods
                            </div>
                          </div>
                          <div>
                            <ArrowRight />
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-4">
                        <div
                            style={{
                              background: "#fff",
                              boxShadow: "0px 4px 30px 0px #1B19561A",
                              borderRadius: "16px",
                              padding: "21px 12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: 'pointer'
                            }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Notifications />
                            <div
                                style={{
                                  marginLeft: "12px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#01040D",
                                }}
                            >
                              Languages
                            </div>
                          </div>
                          <div>
                            <ArrowRight />
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-4">
                        <div
                            style={{
                              background: "#fff",
                              boxShadow: "0px 4px 30px 0px #1B19561A",
                              borderRadius: "16px",
                              padding: "21px 12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: 'pointer'
                            }}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Notifications />
                            <div
                                style={{
                                  marginLeft: "12px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#01040D",
                                }}
                            >
                              Privacy Shortcuts
                            </div>
                          </div>
                          <div>
                            <ArrowRight />
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mt-4">
                        <div
                            style={{
                              background: "#fff",
                              boxShadow: "0px 4px 30px 0px #1B19561A",
                              borderRadius: "16px",
                              padding: "21px 12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: 'pointer'
                            }}
                            onClick={() => handleLogOut()}
                        >
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <TbLogout
                                style={{width: 40, height: 40, color: "#FF6264"}}
                            />
                            <div
                                style={{
                                  marginLeft: "12px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#FF6264",
                                }}
                            >
                              Log Out
                            </div>
                          </div>
                          <div>
                            <ArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
  );
};

export default ProfileModal;
