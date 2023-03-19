import styled from "styled-components";

const Aside = ({ categories, onClickCateogry }) => {
  return (
    <Wrapper>
      <ul>
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
          <List key={category}>
            <button
              onClick={() => {
                onClickCateogry("category", category);
              }}
            >
              {category}
            </button>
          </List>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Aside;

const Wrapper = styled.aside`
  width: 200px;
  box-sizing: border-box;
  border-right: 1px solid #d4d4d4;
  padding: 30px 20px;
`;

const List = styled.li`
  :hover {
    cursor: pointer;
  }
`;
