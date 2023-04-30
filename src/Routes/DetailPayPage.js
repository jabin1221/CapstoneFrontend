import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Grid,Box,Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

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



    return (


        <Grid padding="0px 40px 40px 40px">
            <h3 > 주문 상세 내역</h3>
            <hr />
          
            <div
                style={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: "20px",
                }}
            >
                <img src={itemDetail && itemDetail.url} alt="items" position="absolute" width="100px" height="100px" />
                <b>{itemDetail && itemDetail.itemprice}원 
                <h4>{itemDetail && itemDetail.itemname}</h4>  <h6>{itemDetail && itemDetail.maintext}</h6></b>
            </div>
            <hr />
            <Alert severity="info">{itemDetail && itemDetail.memberid}님이 상품[<b>{itemDetail && itemDetail.itemname}</b>]을 준비중 입니다.</Alert>
            <br />
            <div>
                <h3>거래정보<Button variant="text">취소요청</Button></h3>
                <h6>거래방법</h6>
                <h6>주문번호</h6>
                <h6>주문일시</h6>
                <h6>판매자:<b>{itemDetail && itemDetail.memberid}</b></h6>
                <h6>결제방법</h6>
                <h6>결제금액</h6>
                <Box style={{ borderStyle: 'ridge' ,backgroundColor:'#e9e9e9'}}>
                    <br />
                <h6>상품금액:<b>{itemDetail && itemDetail.itemprice}원</b></h6>
                <h6>수수료</h6>
                <h6>배송비</h6>
                </Box>
                
            </div>
            <br />
            <div>
                <h3>배송정보</h3>
                <h6>수령인:<b>{nickname}</b></h6>
                <h6>연락처</h6>
                <h6>배송지</h6>
                <Box style={{ borderStyle: 'ridge', backgroundColor:'#e9e9e9'}}>
                    <br />
                <h6>배송요청사항</h6>
                <b>문 앞에 부탁드립니다</b>
                </Box>
            </div>

        </Grid>



    )
}

export default DetailPayPage;