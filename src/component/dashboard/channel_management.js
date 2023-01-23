import React, {useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb' 
import DataTable from "react-data-table-component";
import { mydata } from "../../data/dummyTableData";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";


const  ChannelManagement = (props) => {
  const [data, setData] = useState(mydata);
  const [currentChannel, setcurrentChannel] = useState([]);
  const [newChannel, setnewChannel] = useState();
  const [shownewChanneldata, setshownewChanneldata] = useState(false);
  const columns = [
    {
      name: "Client Username",
      selector: "id",
      sortable: true,
      center: true,
    },
    {
      name: "Channel Arn",
      selector: "channel_arn",
      sortable: true,
      center: true,
    },
    {
      name: "Ingest Server",
      selector: "channel_ingestserver",
      sortable: true,
      center: true,
    },
    {
      name: "Channel Name",
      selector: "channel_name",
      sortable: true,
      center: true,
    },
    {
      name: "Channel PlaybackURL",
      selector: "channel_playbackURL",
      sortable: true,
      center: true,
    },
    {
      name: "Stream Key",
      selector: "streamkey",
      sortable: true,
      center: true,
    },
    {
      name: "StreamKey Arn",
      selector: "streamkey_arn",
      sortable: true,
      center: true,
    },
    {
      name: "LiveState",
      cell:(e) => {
        if(e.channel_islive)
          return (<i className="fa fa-circle font-success f-12" />)
        else return (<i className="fa fa-circle font-danger f-12" />)
      },
      sortable: true,
      center: true,
    },
    {
      name: "Created_on",
      selector: "created_on",
      sortable: true,
      center: true,
    },
    {
      name : "Delete",
      cell: (e) => {
        const deleteChannel = () => {
          deleteChannel1(e.id)
        }
        return (<Button onClick = {deleteChannel} >Del</Button>);
      },
      ignoreRowClick: true,
      allowOverflow: false,
      button: true,
    }
  ];
  const [ShowCreateNewChannelModal, setShowCreateNewChannelModal] = useState(false);
  const [ShowChannelInfoModal, setShowChannelInfoModal] = useState(false);
  const CreateNewChannelModaltoggle = () => setShowCreateNewChannelModal(!ShowCreateNewChannelModal);
  const ShowChannelInfoModaltoggle = () => setShowChannelInfoModal(!ShowChannelInfoModal);
  const [new_client_name , set_newclientname] = useState('');

  useEffect(()=>{
    try {
      fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel`,{
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
  },[])


  const handle_newclientname = (e) =>{
    e.preventDefault();
    set_newclientname(e.target.value)
  }

  const handle_rowclick = (e) => {
    setcurrentChannel(e);
    ShowChannelInfoModaltoggle()
  }

  const create_new_channel = () => {
    try {
      fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel`,{
        method : 'PUT',
        header : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName : new_client_name
        })
      })
      .then(response => response.json())
      .then((json)=> {
        setnewChannel(json);
        console.log(json);
        setshownewChanneldata(true)
        if(json){
          try {
            fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel`,{
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
      .then(()=> {console.log(newChannel)})
    } catch (error) {
      console.log(error)
    }
    CreateNewChannelModaltoggle();
  }

  const deleteChannel1 = (e)=>{
    console.log('deleting user',e)
    try {
      fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel/${e}`,{
        method : 'DELETE',
        header : {
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.json())
      .then((json)=> {
        if(json){
          try {
            fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel`,{
              method : 'GET',
              header : {
                "Content-Type": "application/json",
              },
              
            })
            .then(response => response.json())
            .then((json)=> {
              setData(json.Items)
            })
            .then(() => {console.log('deleted user', e)})
          } catch (error) {
            console.log(error)
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  }
    return (
         <Fragment>
         <Breadcrumb parent="Dashboard" title="ChannelManagement" caption1 = "Superadmin" caption2 = "Dashboard" description = "GÉREZ TOUS VOS CANAUX"/>
          <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <div className='row justify-content-between'>
                      <h5>TOUTES VOS CHAÎNES</h5>
                      <Button color="primary" onClick={CreateNewChannelModaltoggle}>
                        Create New Channel
                      </Button>
                      <Modal
                        isOpen={ShowCreateNewChannelModal}
                        toggle={CreateNewChannelModaltoggle}
                        centered
                      >
                        <ModalHeader toggle={CreateNewChannelModaltoggle}>
                          Create New Channel
                        </ModalHeader>
                        <ModalBody>
                          <p>Create channel by client's username.</p>
                          <p>All channels use same record configuration and same s3 bucket.</p>
                          <p>Record Configuration : ivs-liveshopping-recconfiguration - arn:aws:ivs:eu-west-1:263504711656:recording-configuration/Qtuq5Jw29yXC</p>
                          <p>S3 Bucket : ivs-liveshopping-s3bucket - arn:aws:s3:::ivs-liveshopping-s3bucket</p>
                          <p>Please insert the Client's username.</p>
                          <Input 
                            className="form-control"
                            type="text"
                            placeholder='Client name'
                            value = {new_client_name}
                            onChange = {handle_newclientname}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="secondary"
                            onClick={CreateNewChannelModaltoggle}
                          >
                            Close
                          </Button>
                          <Button color="primary" onClick={create_new_channel}>
                            Create
                          </Button>
                        </ModalFooter>
                      </Modal>
                      <Modal
                        isOpen={ShowChannelInfoModal}
                        toggle={ShowChannelInfoModaltoggle}
                        centered
                      >
                        <ModalHeader toggle={ShowChannelInfoModaltoggle}>
                          {currentChannel.id} Channel Info
                        </ModalHeader>
                        <ModalBody>
                          <h6>Record Configuration</h6>
                          <p>ivs-liveshopping-recconfiguration</p>
                          <h6>Record Configuration Arn</h6>
                          <p>arn:aws:ivs:eu-west-1:263504711656:recording-configuration/Qtuq5Jw29yXC</p>
                          <h6>S3 Bucket Name</h6>
                          <p>ivs-liveshopping-s3bucket</p>
                          <h6>S3 Bucket Arn</h6>
                          <p>arn:aws:s3:::ivs-liveshopping-s3bucket</p>
                          <h6>Channel Arn</h6>
                          <p>{currentChannel.channel_arn}</p>
                          <h6>Ingest Server</h6>
                          <p>{currentChannel.channel_ingestserver}</p>
                          <h6>Channel Name</h6>
                          <p>{currentChannel.channel_name}</p>
                          <h6>Channel PlaybackURL</h6>
                          <p>{currentChannel.channel_playbackURL}</p>
                          <h6>StreamKey Name</h6>
                          <p>{currentChannel.streamkey}</p>
                          <h6>StraemKey Arn</h6>
                          <p>{currentChannel.streamkey_arn}</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="secondary"
                            onClick={ShowChannelInfoModaltoggle}
                          >
                            Close
                          </Button>
                          <Button color="primary" onClick={create_new_channel}>
                            Create
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div style={{display : shownewChanneldata? 'block' : 'none'}}>
                      <div className='row justify-content-between'>
                        <h5>Recent Created Channel Info</h5>
                        <button type="button" className="close" aria-label="Close" onClick={()=> {setshownewChanneldata(!shownewChanneldata)}}><span aria-hidden="true">×</span></button>
                      </div>
                      <div className='row'>
                        {newChannel ? <p>Channel Arn : {newChannel.createdchannel.channel.arn}</p> : ''}
                        {newChannel ? <p>Ingest Server : rmtps://{newChannel.createdchannel.channel.ingestEndpoint}:443/app/</p> : ''}
                        {newChannel ? <p>Channel Name : {newChannel.createdchannel.channel.name}</p> : ''}
                        {newChannel ? <p>Channel PlaybackURL : {newChannel.createdchannel.channel.playbackUrl}</p> : ''}
                        {newChannel ? <p>Channel Recording Configuration : {newChannel.createdchannel.channel.recordingConfigurationArn}</p> : ''}
                        {newChannel ? <p>Channel StreamKey Arn: {newChannel.createdchannel.streamKey.arn}</p> : ''}
                        {newChannel ? <p>Channel StreamKey : {newChannel.createdchannel.streamKey.value}</p> : ''}
                        {newChannel ? <p>Channel Store Video Table Name : {newChannel.createdvideotable.TableDescription.TableName}</p> : ''}
                      </div>
                    </div>
                    <DataTable
                      columns={columns}
                      data={data}
                      striped={true}
                      center={true}
                      selectableRows
                      persistTableHead
                      onRowClicked = {handle_rowclick}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>   
          </Fragment> 
    );
}

export default ChannelManagement;