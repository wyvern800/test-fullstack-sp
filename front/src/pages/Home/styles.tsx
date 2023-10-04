import styled, { css } from "styled-components";
import { CgCloseO } from "react-icons/cg";
import { FaFileImport } from "react-icons/fa";
import { ImportFilePropsType } from "../../types/ImportFilePropsType";

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white; //#191b1f;
  color: black;
  //border: 1px solid #24272c;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 0;
  max-width: 50vw;
  min-width: 50vw;

  @media (max-width: 1024px) {
    max-width: 100%;
    min-height: 99vh;
  }
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: #055c9d;
`;

export const DesiredData = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  border: 1px solid lightgray; //#24272c;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const ImportFile = styled.div<ImportFilePropsType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 45%;
  padding: 10px;

  border: 1px dashed lightgray; //#24272c;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;

  ${({ dragging }) =>
    dragging &&
    css`
      border-color: #055c9d;
      background-color: #f0f0f0;
    `}

  &:hover {
    background-color: #e8e8e8;
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }
`;

export const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background-color: #055c9d;
  border: 2px solid #055c9d;
  color: white;
  outline: none;
  padding: 10px 10px;
  transition: all 0.3s ease 0s;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px;

  text-decoration: none;
  &:visited, &:active {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    border-color: #003060;
    background-color: #003060;
    color: white;
  }
`;

export const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const SelectText = styled.div`
  width: 48%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const ExportIcon = styled(FaFileImport)`
  font-size: 3rem;
  color: #055c9d;
`;

export const Upload = styled.input`
  display: none;
`;

export const UserCards = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between; /* Distribute children equally */
  flex-wrap: wrap; /* Allow items to wrap to the next line if necessary */
`;

export const WrapperCard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const Card = styled.div`
  border: 1px solid lightgray;
  flex: 1 0 calc(33.33% - 20px);
  min-width: 100px;
  padding: 20px;
  border-radius: 5px;

  @media (max-width: 400px) {
    flex-basis: calc(50% - 20px); /* Two items per row for smaller screens */
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const Search = styled.input`
  outline: none;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid lightgray;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px;
`;

export const Close = styled(CgCloseO)`
  font-size: 1.5rem;
  color: #ff4d4d;

  &:hover {
    cursor: pointer;
    color: #520000;
  }
`;

export const Name = styled.div`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #055c9d;
`;

export const Sport = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
