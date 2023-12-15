/* eslint-disable @next/next/no-img-element */

import {
    Email,
    ImgNewsletter,
    Plus,
    Flash,
    Time,
} from "@/components/icon/SvgPage";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import AppLayout from "@/layouts/AppLayout";
import CategoryCard from "@/components/home/CategoryCard";
import ProductCard from "@/components/ProductCard";
import {Image, Skeleton} from "antd";
import ProfileModal from "@/components/ProfileModal";
import {useState} from "react";
import moment from "moment/moment";
import {CCarousel, CCarouselItem, CImage} from "@coreui/react";
import ShowMoreText from "react-show-more-text";
import Link from "next/link";

const Campaign = () => {

    const {data: campaignsData = {}} = useQuery({
        queryKey: "getAllCampaigns",
        queryFn: () =>
            apiServices.getAllCampaigns({
                page: 0,
                limit: 10,
                status: 1,
                sortBy: "createdAt",
                sortDirection: "DESC",
            }),
    });

    //get data from api response
    const {data: {contents: campaigns = []} = {}} = campaignsData;

    console.log("campaigns", campaigns);

    return (
        <div style={{paddingBottom: "50px"}} id="homePage">
            <div style={{padding: "20px 0px"}} className="breadcrumb">
                <div
                    style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
                    className="container"
                >
                    Home {'>'} Campaigns
                </div>
            </div>
            <div className="container">
                {campaigns.map(campaign => {
                    return <div className="feed" key={campaign.id}>
                        <div className="feedWrapper">
                            <div className="post" key={campaign.id}>
                                <div className="postWrapper">
                                    <div className="postTop">
                                        <div className="postTopLeft">
                                            {/*<img*/}
                                            {/*    className="postProfileImg"*/}
                                            {/*    src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}*/}
                                            {/*    alt=""*/}
                                            {/*/>*/}
                                            <span className="postUsername">
              {campaign.school.name}
            </span>
                                            <span
                                                className="postDate">{moment(campaign?.createdAt, "YYYY-MM-DDTHH:mm:ss.sssZ").fromNow()}</span>
                                        </div>
                                        <div className="postTopRight">
                                            {/*<MoreVert />*/}
                                        </div>
                                    </div>
                                    <div className="postCenter">
                                        <ShowMoreText
                                            /* Default options */
                                            className="postDesc"
                                            lines={3}
                                            more="Show more"
                                            less="Show less"
                                            anchorClass="show-more-less-clickable"
                                            expanded={false}
                                            truncatedEndingComponent={"... "}
                                        >
                                            <span>{campaign?.description}</span>
                                        </ShowMoreText>
                                        {/*<span className="postText">{campaign?.description}</span>*/}
                                        <CCarousel controls indicators>
                                            {
                                                campaign?.images?.split(',').map((image, index) => {
                                                    return (
                                                        <CCarouselItem key={index}>
                                                            <Link href={`/campaign/${campaign.id}`}>
                                                            <CImage className='d-block w-100'
                                                                    style={{width: "100%", height: "100%"}} src={image}
                                                                    alt="slide 1"/>
                                                                </Link>
                                                        </CCarouselItem>
                                                    )
                                                })
                                            }

                                        </CCarousel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    );
};

Campaign.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default Campaign;
