import React, {useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb' 
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';
import DataTable from "react-data-table-component";
import {
  Button,
} from "reactstrap";

// function DelBtn(props) {
//   const deleteUser = () => {
//     console.log('111111111111111111111',props.data.id)
//   }
//   return (<Button onClick = {deleteUser} >Dis</Button>);
// }

const  UserManagement = (props) => {
  const [data, setData] = useState();
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      center: true,
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
      center: true,
    },
    {
      name: "Firstname",
      selector: "firstname",
      sortable: true,
      center: true,
    },
    {
      name: "Lastname",
      selector: "lastname",
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      center: true,
    },
    {
      name: "Website",
      selector: "website",
      sortable: true,
      center: true,
    },
    {
      name: "Bio",
      selector: "bio",
      sortable: true,
      center: true,
    },
    {
      name: "Billing Address",
      selector: "bilingaddress",
      sortable: true,
      center: true,
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
      center: true,
    },
    {
      name: "Postal Code",
      selector: "codepostal",
      sortable: true,
      center: true,
    },
    {
      name: "Country",
      selector: "pays",
      sortable: true,
      center: true,
    },
    {
      name: "State",
      selector: "state_disable",
      cell:(e) => {
        if(e.state_disable)
          return (<i className="fa fa-circle font-success f-12" />)
        else return (<i className="fa fa-circle font-danger f-12" />)
      },
      sortable: true,
      center: true,
    },
    {
      name: "Disable",
      cell: (e) => {
        const disableUser = () => {
          disableUser1(e.id)
        }
        return (<Button onClick = {disableUser} >Dis</Button>);
      },
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
    },
    {
      name : "Delete",
      cell: (e) => {
        const deleteUser = () => {
          deleteUser1(e.id)
        }
        return (<Button onClick = {deleteUser} >Del</Button>);
      },
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
    }
  ];
  useEffect(()=>{
    try {
      fetch(`https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user`,{
        method : 'GET',
        header : {
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.json())
      .then((json)=> {
        setData(json.Items)
        console.log(json.Items)
      })
    } catch (error) {
      console.log(error)
    }
  },[])
  const deleteUser1 = (e)=>{
    console.log('deleting user',e)
    try {
      fetch(`https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user/${e}`,{
        method : 'DELETE',
        header : {
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.json())
      .then((json)=> {
        if(json){
          try {
            fetch(`https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user`,{
              method : 'GET',
              header : {
                "Content-Type": "application/json",
              },
              
            })
            .then(response => response.json())
            .then((json)=> {
              setData(json.Items)
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
    console.log('deleted user', e)
  }
  const disableUser1 = (e)=>{
    console.log('disabing user',e)
    try {
      fetch(`https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user/disable/${e}`,{
        method : 'GET',
        header : {
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.json())
      .then((json)=> {
        if(json){
          try {
            fetch(`https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user`,{
              method : 'GET',
              header : {
                "Content-Type": "application/json",
              },
              
            })
            .then(response => response.json())
            .then((json)=> {
              setData(json.Items)
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
    console.log('disabled user', e)
  }
  return (
        <Fragment>
        <Breadcrumb parent="Dashboard" title="User Management" caption1 = "Superadmin" caption2 = "Dashboard" description = "GÉREZ TOUS VOS CLIENTS"/>
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>TOUTES VOS CLIENTS</h5>
                </CardHeader>
                <CardBody>
                  <DataTable
                    columns={columns}
                    data={data}
                    striped={true}
                    center={true}
                    selectableRows
                    persistTableHead
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>   
        </Fragment> 
  );
}

export default UserManagement;