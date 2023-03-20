import styled from "styled-components";
import './Aside.css'
import femail_clothes from "../data/femail_clothes";
import mail_clothes from "../data/mail_clothes";
import shoes from "../data/shoes";
import bag from "../data/bag";
import jewelry_watch from "../data/jewelry_watch";
import fashion_accessories from "../data/fashion_accessories";
import digital_home_electronics from "../data/digital_home_electronics";
import sports_leisure from "../data/sports_leisure";
import vehicle_motorcycle from "../data/vehicle_motorcycle";
import merchandise from "../data/merchandise";
import Kidult from "../data/Kidult";
import art_collection_rare from "../data/art_collection_rare";
import record_album_instrument from "../data/record_album_instrument";
import office_supplies_book_ticket from "../data/office_supplies_book_ticket";
import beauty from "../data/beauty";
import furniture_interior_design from "../data/furniture_interior_design";
import daily_necessity_Kitchen_appliances from "../data/daily_necessity_Kitchen_appliances";
import infant_maternity_supplies from "../data/infant_maternity_supplies";
import tools from "../data/tools";
import pet_equipment from "../data/pet_equipment";
import free from "../data/free";
import food from "../data/food";
import etc from "../data/etc";
import local_service from "../data/local_service";
import roommate from "../data/roommate";
import job from "../data/job";
import talent from "../data/talent";


const Aside = ({ categories, onClickCateogry }) => {
  return (
    <Wrapper className="nav">
      <ul className="nav__menu">
        <p>
          <b>전체 카테고리</b>
        </p>
        <List>
          <button
            onClick={() => {
              onClickCateogry("category");
            }}
          >
            all
          </button>
        </List>
        {categories.map((category) => (
          <List key={category} className="nav__menu-item">
            <button className="nav__menu-item"
              onClick={() => {
                onClickCateogry("category", category);
              }}
            >
              {category}
            </button>
            <Submenu category2={femail_clothes}/>
          </List>
        ))}
      </ul>
    </Wrapper>
  );
};

const Submenu = ({category2}) =>{
  return (

    <ul className="nav__submenu">
        <li className="nav__submenu-item ">
          <a>Our Company</a>
        </li>
        <li className="nav__submenu-item ">
          <a>Our Team</a>
        </li>
        <li className="nav__submenu-item ">
          <a>Our Portfolio</a>
        </li>
      </ul>
    // <ul className="nav__submenu">
    //   {category2.map((category3) => (
    //       <List key={category3} className="nav__submenu-item ">
    //         <button className="nav__submenu-item "
    //         >
    //           {category3}
    //         </button>
    //       </List>
    //     ))}
    // </ul>
  )
}

export default Aside;

const Wrapper = styled.aside`
  width: 230px;
`;

const List = styled.li`
  :hover {
    cursor: pointer;
  }
`;