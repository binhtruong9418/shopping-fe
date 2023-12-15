import AppLayout from "@/layouts/AppLayout";
import ProductDetail from "@/pages/products/[id]";
import {productFilters} from "@/constant/constant";
import {Form, Select, Skeleton, Table} from "antd";
import ProductCard from "@/components/ProductCard";
import {useMemo, useState} from "react";
import {useQuery} from "react-query";
import apiServices from "@/services/apiServices";
import {formatPrice} from "@/utils";

const Ranking = () => {
    const [form] = Form.useForm();
    const [isShowClassSelect, setIsShowClassSelect] = useState(false)

    const [dataSearch, setDataSearch] = useState({
        page: 0,
        limit: 10,
        sortBy: "paperPoint",
        sortDirection: "DESC"
    })
    const {
        data: usersData = {},
        isLoading,
        refetch: refetchUsers
    } = useQuery(["allUsers", dataSearch], ({queryKey}) => apiServices.allUsers(queryKey[1]), {
        keepPreviousData: true
    })

    const {data: schoolData = {}} = useQuery({
        queryKey: ["allSchools", dataSearch],
        queryFn: ({queryKey}) => apiServices.allSchools(queryKey[1])
    })

    const {data: classData = {}} = useQuery({
        queryKey: ["allClass", dataSearch],
        queryFn: ({queryKey}) => apiServices.getClasses(queryKey[1])
    })

    const {data: {contents: allSchools = []} = {}} = schoolData
    const {data: {contents: allClass = []} = {}} = classData

    const {data: {contents: allUsers = [], totalElements = 0} = {}} = usersData

    const columns = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Student',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'School',
            dataIndex: 'school',
            key: 'school',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Paper Point',
            dataIndex: 'customPaperPoint',
            key: 'paperPoint',
        },
    ];

    const tableData = useMemo(() => {
        return allUsers.map((user, index) => ({
            ...user,
            key: user.id,
            rank: index + 1,
            customPaperPoint: formatPrice(user.paperPoint),
            school: user?.schoolClass?.school?.name,
            class: user?.schoolClass?.name

        }))

    }, [allUsers])

    console.log(tableData);

    return (
        <main>
            <div id="ranking">
                <div style={{padding: "20px 0px"}} className="breadcrumb">
                    <div
                        style={{fontSize: "14px", fontWeight: "400", color: "#01040D"}}
                        className="container"
                    >
                        Home {">"} Ranking
                    </div>
                </div>
                <div className="container">
                    <div
                        style={{
                            fontSize: "24px", fontWeight: "700", color: "#01040D",
                            textAlign: "center"
                        }}
                        className="pb-3"
                    >
                        Top 10 Recycling Ranking
                    </div>
                    <Form
                        form={form}
                        layout='inline'
                        className="mb-3"
                    >
                        <Form.Item
                            name="schoolId"
                        >
                            <Select
                                style={{
                                    width: 300
                                }}
                                placeholder="Find by school"
                                onChange={(value) => {
                                    if (!value) {
                                        setIsShowClassSelect(false)
                                        setDataSearch({
                                            ...dataSearch,
                                            schoolId: null,
                                            schoolClassId: null
                                        })
                                        return
                                    }
                                    form.setFieldValue("schoolClassId", null)
                                    setDataSearch({
                                        ...dataSearch,
                                        schoolId: value,
                                        schoolClassId: null
                                    })
                                    setIsShowClassSelect(true)

                                }}
                                allowClear
                            >
                                {
                                    allSchools.map((school) => (
                                        <Select.Option key={school?.id}
                                                       value={school?.id}>
                                            {school?.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        {isShowClassSelect &&
                            <Form.Item
                                name="schoolClassId"
                            >
                                <Select
                                    style={{
                                        width: 300
                                    }}
                                    placeholder="Find by class"
                                    onChange={(value) => {
                                        if (!value) {
                                            setDataSearch({
                                                ...dataSearch,
                                                page: 0,
                                                schoolClassId: null,
                                                schoolId: null,
                                            });
                                            form.resetFields()
                                            setIsShowClassSelect(false)
                                            return;
                                        }
                                        setDataSearch({
                                            ...dataSearch,
                                            schoolClassId: value
                                        });
                                    }}
                                    allowClear
                                >
                                    {
                                        allClass.map((classItem) => (
                                            <Select.Option key={classItem?.id}
                                                           value={classItem?.id}>
                                                {classItem?.name}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        }
                    </Form>
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        pagination={false}
                    />
                </div>

            </div>
        </main>
    )
}

Ranking.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default Ranking