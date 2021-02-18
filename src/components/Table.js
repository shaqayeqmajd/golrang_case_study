import React, { useEffect, useState } from "react";
import {
  CDataTable,
  CRow,
  CCol,
  CContainer,
  CFormGroup,
  CInputGroup,
  CSelect,
  CForm,
  CInput,
} from "@coreui/react";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

const fields = [
  { key: "name", _style: { width: "40%" } },

  { key: "username", _style: { width: "20%" } },
  { key: "email", _style: { width: "20%" } },
];

const Table = () => {
  const [users, setUsers] = useState([]);
  const [comboText, setComboText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [comboItems, setCompoItems] = useState([]);

  let selectSpecificUser = (e) => {
    setComboText(e.target.value);
    if (e.target.value == "") {
      document.getElementById("searchBox").disabled = false;
      setUsers(allUsers);
    } else {
      let filteredCombo = allUsers.filter(
        (user) => user.name == e.target.value
      );
      document.getElementById("searchBox").value = "";
      document.getElementById("searchBox").disabled = true;
      setUsers(filteredCombo);
    }
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setAllUsers(res.data);
      setCompoItems(res.data);
      setUsers(res.data);
    });
  }, []);

  let filterUserList = (e) => {
    let searchInput = e.target.value;
    let filteredData = allUsers.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setCompoItems(filteredData);
    setUsers(filteredData);
  };
  return (
    <CContainer>
      <CRow className="mt-4">
        <CCol xs="3" className="mr-auto mb-4">
          <CForm>
            <CInput
              type="text"
              id="searchBox"
              placeholder="&#xF002; Search..."
              onChange={filterUserList}
              style={{
                width: "255px",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",

                fontFamily: "Arial, FontAwesome",
              }}
            />
          </CForm>
        </CCol>
        <CCol xs="3">
          <CFormGroup>
            <CInputGroup id="name">
              <CSelect
                custom
                id="select6"
                value={comboText}
                onChange={selectSpecificUser}
              >
                <option defaultValue value="">
                  select
                </option>

                {comboItems.map((user, index) => {
                  return (
                    <option key={index} value={user.name}>
                      {user.name}
                    </option>
                  );
                })}
              </CSelect>
            </CInputGroup>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CDataTable
            items={users}
            fields={fields}
            hover
            striped
            pagination
            scopedSlots={{}}
          />
        </CCol>
      </CRow>
    </CContainer>
  );
};
export default Table;
