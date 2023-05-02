import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Grid, Box, Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import styles from "./DetailPayPage.module.css";

//결제 페이지(PayPage)에서 결제 확인하면 그 제품에 대한 주문 상세 내역 보여짐(일단 Detail에 포함된 내용만)
function DetailPayPage() {

    const [cookies] = useCookies();
    let nickname = "";
    if (cookies.token) {
        nickname = jwt_decode(cookies.token).sub;
    }


    let { id } = useParams();
    const [itemId, setitemId] = useState({
        itemid: id,
    });

    const [itemDetail, setitemDetail] = useState(null);
    useEffect(() => {
        axios
            .post("http://localhost:8080/api/load/showDetail", itemId)
            .then((response) => {
                console.log("good");
                console.log(response.data);
                setitemDetail(response.data);
                console.log(itemDetail);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);


    let A = 2000; //대충 배송비 
    let B = 5000; //대충 수수료
    let C = itemDetail && itemDetail.itemprice; //상품 금액
    let D = A + B + C;
    var Price = '' + C;


    return (
        <div>

            <Grid className={styles.Grid}>
                <br/>
                <h3><b>
                    주문상세내역</b></h3> <br />
                <div className={styles.showItem}>
                    <img src={itemDetail && itemDetail.url} alt="items" position="absolute" width="100px" height="100px" />
                    <h5><b>{D.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</b>
                        <h6>{itemDetail && itemDetail.itemname}</h6></h5>
                </div>

            </Grid>
            <Grid className={styles.Grid}>
                <Alert severity="info">{itemDetail && itemDetail.memberid}님이 상품[<b>{itemDetail && itemDetail.itemname}</b>]을 준비중 입니다.</Alert>
            </Grid>
            <br />

            <div className={styles.Grid}>
                <hr />
                <h3><b>거래정보</b></h3>
                <br />

                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        주문번호
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{11111111}</p></b>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        주문일시
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{20230504}</p></b>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        판매자
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{itemDetail && itemDetail.memberid}</p></b>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        결제금액
                    </Grid>
                    <Grid xs={8}>
                        <b> <p className={styles.textright}>{D.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p></b>
                    </Grid>
                </Grid>

                <Box className={styles.box}>
                    <br />
                    <Grid padding="10px 10px 10px 10px">
                        <Grid padding="10px 10px 10px 10px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                상품금액
                            </Grid>
                            <Grid xs={8}>
                                <b><p className={styles.textright}>{Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></b>
                            </Grid>
                        </Grid>
                        <Grid padding="10px 10px 10px 10px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                수수료
                            </Grid>
                            <Grid xs={8}>
                                <p className={styles.textright}>{B.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                            </Grid>
                        </Grid>
                        <Grid padding="10px 10px 10px 10px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                배송비
                            </Grid>
                            <Grid xs={8}>
                                <p className={styles.textright}>{A.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                            </Grid>
                        </Grid>
                    </Grid>


                </Box>

            </div>
            <br />
            <div className={styles.Grid}>
            <hr />
                <h3><b>배송정보</b></h3>
                <br />
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        수령인
                    </Grid>
                    <Grid xs={8}>
                        <p className={styles.textright}>{nickname}</p>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        연락처
                    </Grid>
                    <Grid xs={8}>
                        <p className={styles.textright}>000-1111-2222</p>
                    </Grid>
                </Grid>
                <Grid padding="10px 10px 10px 20px" container spacing={2} columns={16}>
                    <Grid xs={8}>
                        배송지
                    </Grid>
                    <Grid xs={8}>
                        <p className={styles.textright}>서울시~~~</p>
                    </Grid>
                </Grid>
                <Box className={styles.box}>
                    <br />
                    <Grid padding="10px 10px 10px 10px">
                        <h6>배송요청사항</h6> </Grid>
                    <Grid padding="10px 10px 10px 10px">
                        <b>문 앞에 부탁드립니다</b></Grid>
                </Box>

            </div>



        </div>

    )
}

export default DetailPayPage;