import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;
  flex-direction: column;
  align-items: center;
  padding: 25px 50px;
`;

export const CategoryCard = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin: 10px 0;
  box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  cursor: default;
  transition: all 0.3s;

  &:hover {
    background: #f9f9f9;
  }
`;

export const CategoryImage = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: ${props => `url(${props.imageUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

export const CategoryDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  strong {
    font-size: 18px;
  }

  p {
    margin-top: 10px;
    font-size: 13px;
    color: #706e7b;

    span {
      color: #555;
      font-weight: bold;
    }
  }
`;

export const CategoryInfo = styled.div`
  display: flex;
`;

export const CategoryForm = styled.form`
  display: flex;
  width: 450px;
  flex-direction: column;
  padding: 50px;
  background: #fff;
  border-radius: 10px;

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 10px 0 15px;

    label {
      color: #757575;
      margin-right: 15px;
    }

    select {
      border-radius: 10px;
      border: 1px solid #ddd;

      padding: 15px;
      flex: 1;
    }
  }

  input {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    margin-top: 10px;
  }

  button {
    font-size: 16px;
    width: 100%;
    margin-top: 10px;
    text-align: center;
    padding: 15px;
    border-radius: 10px;
    background: #f15454;
    color: #fff;
    font-weight: bold;
    transition: all 0.2s;

    &:hover {
      background: #e62638;
    }
  }

  button.close {
    background: #fff;
    color: inherit;
    padding: 5px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
`;
