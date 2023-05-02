import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import $ from 'jquery';
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import jwt_decode from "jwt-decode"
import { useCookies } from "react-cookie";
import SockJS from 'sockjs-client';
import Stomp, { over } from "stompjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./PayPage.module.css";

//디테일 페이지에서 상품->결제 페이지로 이동

function PayPage() {
    var client = null;
    const [cookies, setCookies] = useCookies();
    let nickname = ""
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    if (cookies.token) {
        nickname = jwt_decode(cookies.token).sub;
    } else {
        Swal.fire({
            title: "로그인 페이지로",
            text: "상품을 결제하려면 로그인 하세요",
            icon: "warning",
        }).then(function () {
            navigate("/LoginPage");
        });

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
        let nick = {
            nickname: nickname
        }
        axios
            .post("http://localhost:8080/api/auth/getAuth", nick)
            .then((response) => {
                console.log(response.data);
                setUserData(response.data);


            })
            .catch((error) => {
                console.log(error.message);
            });

        start();

    }, []);


    $(function () {

        $("#SelectDirect").hide();
        $("#Select").change(function () {
            if ($("#Select").val() == "direct") {
                $("#SelectDirect").show();
            } else {
                $("#SelectDirect").hide();
            }
        })

    });


    const [AllCheck, setAllCheck] = useState(false);
    const [ServiceCheck, setServiceCheck] = useState(false);
    const [CollectCheck, setCollectCheck] = useState(false);
    const [OfferCheck, setOfferCheck] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);


  
    let A = 2000; //대충 배송비 
    let B = 5000; //대충 수수료
    let C=itemDetail&&itemDetail.itemprice; //상품 금액
    let D = A+B+C;
    var Price=''+C;
    



    const allBtnEvent = () => {
        if (AllCheck === false) {
            setAllCheck(true);
            setServiceCheck(true);
            setCollectCheck(true);
            setOfferCheck(true);
        } else {
            setAllCheck(false);
            setServiceCheck(false);
            setCollectCheck(false);
            setOfferCheck(false);
        }
    };

    const ServiceCheckEvent = () => {
        if (ServiceCheck === false) {
            setServiceCheck(true)
        } else {
            setServiceCheck(false)
        }
    };

    const CollectCheckEvent = () => {
        if (CollectCheck === false) {
            setCollectCheck(true)
        } else {
            setCollectCheck(false)
        }
    };

    const OfferCheckEvent = () => {
        if (OfferCheck === false) {
            setOfferCheck(true)
        } else {
            setOfferCheck(false)
        }
    };

    const start = () => { // 샀다는 알림을 보내기 위해
        let sock = new SockJS('http://localhost:8080/ws')
        client = over(sock);
        client.connect({}, () => { client.subscribe("/private/message/" + nickname); });
        console.log("?")

    }

    const chatsavedb = () => {
        let ChatMessage = {
            senduser: nickname,
            receiveuser: itemDetail.memberid,
            chattitle: itemDetail.title,
            message: "물건이 판매되었습니다.",
            date: "",
            type: "trade"
        };
        axios.post('http://localhost:8080/room/create', ChatMessage)
            .then((response) => { })
            .catch((error) => { })
    }

    const sendMessage = () => {
        console.log(client);
        if (client) {
            let ChatMessage = {
                senduser: nickname,
                receiveuser: itemDetail.memberid,
                chattitle: itemDetail.title,
                message: "물건이 판매되었습니다.",
                date: ""
            };
            console.log(ChatMessage);
            client.send('/pub/chat', {}, JSON.stringify(ChatMessage));
            chatsavedb();
            let orderinfo = {
                buyer: nickname,
                seller: itemDetail.memberid,
                object: itemDetail.itemname,
                price: itemDetail.itemprice,
                url: itemDetail.url,
                address: ""
            }
            console.log(orderinfo);
            axios.post("http://localhost:8080/api/order/ordercreate", orderinfo)
                .then((response) => { })
                .catch((error) => { })

        }
        else {
            console.log("error");
        }
    }

    useEffect(() => {
        if (ServiceCheck === true && CollectCheck === true && OfferCheck === true) {
            setAllCheck(true)
        } else {
            setAllCheck(false)
        }
    }, [ServiceCheck, CollectCheck, OfferCheck])



    const PayButtonClick = () => {
        if (AllCheck == true) {
            Swal.fire({
                title: "결제 완료",
                text: "상품이 결제되었습니다!",
                icon: "success",
            }).then(function () {
                navigate("/DetailPayPage/" + id)
            });
            if (userData.cash > itemDetail.itemprice) {
                let cashupdate = {
                    nickname: itemDetail.memberid,
                    cash: itemDetail.itemprice
                }
                axios
                    .post("http://localhost:8080/api/auth/UpdateCash", cashupdate)
                    .then((response) => {


                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                let cashreduce = {
                    nickname: nickname,
                    cash: itemDetail.itemprice
                }
                axios
                    .post("http://localhost:8080/api/auth/ReduceCash", cashreduce)
                    .then((response) => {


                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                let changestatus = {
                    itemid: itemDetail.itemid,
                    currentuser: "거래중" // 변수 이름만 currentuser
                }
                axios
                    .post("http://localhost:8080/api/load/changeStatus", changestatus)
                    .then((response) => {


                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                navigate(`/TradePage?receiveuser=${itemDetail.memberid}&chattitle=${itemDetail.itemname}`)
            }
        }
        else {
            Swal.fire({
                title: "결제 실패",
                text: "약관 내용을 모두 동의해주세요!",
                icon: "error",
            });

        }
    };

    const Modal1 = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        개인정보 제 3자 제공
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        개인정보 제 3자 제공
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const Modal2 = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        개인정보 수집 이용 동의
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        개인정보 수집 이용 동의
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const Modal3 = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        서비스 이용약관 동의
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        서비스 이용약관 동의
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (

        <div>
            <Grid padding="10px 300px 30px 300px">
                <FontAwesomeIcon onClick={() =>
                    Swal.fire({
                        title: "결제 취소",
                        html: "결제를 취소하시겠습니까?<br/>작성하신 내용이 모두 삭제됩니다.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "확인",
                        cancelButtonText: "취소",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/DetailPage/" + id);
                        }
                    })} icon={faArrowLeft} size="2x" /></Grid>
            <Grid className={styles.Grid}>
                <h3><b>
                    결제 하기</b></h3> <br />
                <div className={styles.showItem}>
                    <img src={itemDetail && itemDetail.url} alt="items" position="absolute" width="100px" height="100px" />
                    <h5><b>{Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</b>
                        <h6>{itemDetail && itemDetail.itemname}</h6></h5>
                </div>
                <hr />
            </Grid>

            <Grid className={styles.Grid}> 
                <h4><b>배송지</b></h4>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="배송지를 등록해주세요"
                        aria-label="배송지를 등록해주세요"
                        aria-describedby="basic-addon2"
                    />
                    <Button onClick={() => navigate("/Address")} variant="outline-secondary" >
                        등록
                    </Button>
                </InputGroup>

                <InputGroup type="text" id="SelectDirect" name="SelectDirect" >
                    <Form.Control
                        placeholder="배송요청 사항을 입력하세요"
                        aria-label="배송요청 사항을 입력하세요"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary">
                        등록
                    </Button>
                </InputGroup>
                <Form.Select id="Select" name="Select">

                    <option selected>배송요청사항  (선택)</option>
                    <option value="1">배송 전 연락부탁드립니다</option>
                    <option value="2">부재 시 경비실에 맡겨주세요</option>
                    <option value="direct">직접입력</option>

                </Form.Select>
                <br />
                <br />

            </Grid >


            <Grid className={styles.Grid}>
                <h4><b>결제금액</b></h4>
               
                <Box className={styles.PayBox} >
                    <br />
                    <Grid padding="30px 30px 30px 30px">
                        <Grid padding="0px 0px 10px 0px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                상품금액
                            </Grid>
                            <Grid xs={8}>
                                <b><p className={styles.price}>{Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p></b>
                            </Grid>
                        </Grid>
                        <Grid padding="0px 0px 10px 0px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                수수료
                            </Grid>
                            <Grid xs={8}>
                                <p className={styles.price}>+{B.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                            </Grid>
                        </Grid>
                        <Grid padding="0px 0px 10px 0px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                배송비<hr />
                            </Grid>
                            <Grid xs={8}>
                                <p className={styles.price}>+{A.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p><hr />
                            </Grid>
                        </Grid>

                        <Grid padding="0px 0px 10px 0px" container spacing={2} columns={16}>
                            <Grid xs={8}>
                                총 결제 금액
                            </Grid>
                            <Grid xs={8}>
                                <h5 className={styles.totalprice}><b>{D.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</b></h5>
                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </Grid>
            <br />
            <Grid className={styles.Grid} >
                <form method="post" action="">

                    <div class="form-check">
                        <div>
                            <input type="checkbox" id="AllCheck" checked={AllCheck} onChange={allBtnEvent}
                                style={{ zoom: "1.5" }} />
                            <label for="AllCheck"><h5><b>아래 내용에 전체 동의합니다</b></h5></label>
                        </div>
                        <br />
                        <div>
                            <input type="checkbox" id="check1" checked={ServiceCheck} onChange={ServiceCheckEvent} />
                            <label for="check1">서비스 이용약관 동의 <span >(필수)</span></label>
                         
                                <Button className={styles.DetailButton} variant="link" onClick={() => setModalShow3(true)}>
                                    자세히
                                </Button>

                                <Modal3
                                    show={modalShow3}
                                    onHide={() => setModalShow3(false)}
                                />
                           
                        </div>
                        <br />

                        <div>
                            <input type="checkbox" id="check2" checked={CollectCheck} onChange={CollectCheckEvent} />
                            <label for="check2">개인정보 수집 이용 동의 <span >(필수)</span></label>{" "}
                            
                                <Button className={styles.DetailButton} variant="link" onClick={() => setModalShow2(true)}>
                                    자세히
                                </Button>
                                <Modal2
                                    show={modalShow2}
                                    onHide={() => setModalShow2(false)}
                                />
                        
                        </div>
                        <br />
                        <div>
                            <input type="checkbox" id="check3" checked={OfferCheck} onChange={OfferCheckEvent} />
                            <label for="check3">개인정보 제 3자 제공 <span >(필수)</span> </label>{" "}
                           
                                <Button className={styles.DetailButton} variant="link" onClick={() => setModalShow1(true)}>
                                    자세히
                                </Button>
                            
                            <Modal1
                                show={modalShow1}
                                onHide={() => setModalShow1(false)}
                            />

                        </div>
                    </div>
                </form>
                <br />

                <br />
                
                <Button className={styles.PayButton} onClick={PayButtonClick}>결제하기</Button>

            </Grid>
        </div >

    )
}



export default PayPage;