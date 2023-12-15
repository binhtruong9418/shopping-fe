const CategoryCard = ({category}) => {
    return (
        <>

                <div
                    style={{
                        padding: "30px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#F4F5F6",
                        borderRadius: "16px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "15px",
                            fontWeight: "500",
                            color: "#01040D",
                        }}
                    >
                        {category.name}
                    </div>
                    <div
                        style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            color: "#01040D",
                        }}
                    >
                        {category.description}
                    </div>
                    <div
                        style={{
                            background: "#fff",
                            padding: "10px",
                            borderRadius: "12px",
                        }}
                    >
                        <img
                            style={{width: "40px", height: "40px"}}
                            src={category.image}
                            alt="imgage"
                        />
                    </div>
                </div>
        </>
    )
}
export default CategoryCard