import React, {useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb';
import DataTable from "react-data-table-component";
import {Container,Row,Col,Card,CardBody,CardHeader,Dropdown,DropdownMenu, DropdownItem,Button , Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import VideoPlayer from "./VideoPlayer/VideoPlayer";



const  VideoManagement = (props) => {
  const [userdata, setUserData] = useState([]);
  const [recordedvideodata, setRecordedVideoData] = useState([]);
  const [scheduledvideodata, setScheduledVideoData] = useState([]);
  const [current_username , setCurrentUserName] = useState();
  const [currentChannel, setCurrentChannel] = useState();
  const [showChanneldata, setshowChanneldata] = useState(false);
  const [currentVideo, setCurrentVideo] = useState()
  const [ShowVideoInfoModal, setShowVideoInfoModal] = useState(false);
  const columns = [
    {
      name: "Current Thumbnail",
      selector: "CurrentThumbnail",
      cell:(e) => {
        if(e.CurrentThumbnail)
          return (<img className="img-mini-thumbnail" src={e.CurrentThumbnail} itemProp="thumbnail" alt="Image description"></img>)
        else return (<i className="fa fa-circle font-danger f-12" />)
      },
      sortable: true,
      center: true,
    },
    {
      name: "Stream ID",
      selector: "id",
      sortable: true,
      center: true,
    },
    {
      name: "Title",
      selector: "Title",
      sortable: true,
      center: true,
    },
    {
      name: "Subtitle",
      selector: "Subtitle",
      sortable: true,
      center: true,
    },
    {
      name: "Created On",
      selector: "CreatedOn",
      sortable: true,
      center: true,
    },
    {
      name: "Length",
      selector: "Length",
      sortable: true,
      center: true,
    },
    {
      name: "Viewers",
      selector: "Viewers",
      sortable: true,
      center: true,
    },
    {
      name: "Thumbnails",
      selector: "Thumbnails",
      cell:(e) => {
        return(
          <>
            {/* {e.Thumbnails.map(Thumbnail => (
              <img key={Thumbnail} className="img-mini-thumbnail" src={Thumbnail} itemProp="thumbnail" alt="Image description" style={{margin : '0px 10px'}}></img>
            ))} */}
            <p>very strange</p>
          </>
        );
      },
      sortable: true,
      center: true,
    },
    {
      name: "SourceType",
      selector: "SourceType",
      sortable: true,
      center: true,
    },
    {
      name: "Hide live chat",
      selector: "ChatSetting",
      // cell:(e) => {
      //   if(e.ChatSetting)
      //     return (<i className="fa fa-circle font-success f-12" />)
      //   else return (<i className="fa fa-circle font-danger f-12" />)
      // },
      sortable: true,
      center: true,
    },
    {
      name: "Hide chat on replay",
      selector: "ReplaySetting",
      // cell:(e) => {
      //   if(e.ReplaySetting)
      //     return (<i className="fa fa-circle font-success f-12" />)
      //   else return (<i className="fa fa-circle font-danger f-12" />)
      // },
      sortable: true,
      center: true,
    },
    {
      name: "Hide the hit counter",
      selector: "HitcounterSetting",
      // cell:(e) => {
      //   if(e.HitcounterSetting)
      //     return (<i className="fa fa-circle font-success f-12" />)
      //   else return (<i className="fa fa-circle font-danger f-12" />)
      // },
      sortable: true,
      center: true,
    },
    {
      name: "Allow replay",
      selector: "AllowreplaySetting",
      // cell:(e) => {
      //   if(e.AllowreplaySetting)
      //     return (<i className="fa fa-circle font-success f-12" />)
      //   else return (<i className="fa fa-circle font-danger f-12" />)
      // },
      sortable: true,
      center: true,
    },
    {
      name : "Delete",
      cell: (e) => {
        return (<Button onClick = {() => {deleteVideo(e.id)}} ><i className='fa fa-trash'></i>Del</Button>);
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
        console.log(json.Items)
        setUserData(json.Items)
      })
    } catch (error) {
      console.log(error)
    }
  },[])
  const DropdownItems = ({users}) => {
    return(
    <>
      {users.map(user => (
        <DropdownItem key={user.id} onClick={(e) => selectUserChange(user.username)} style = {{padding : '12px 16px'}}>{user.username}</DropdownItem>
      ))}
    </>
    );
  } 
  const selectUserChange = (cur_username) =>{
    try {
      fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel/${cur_username}`,{
        method : 'GET',
        header : {
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.json())
      .then((json)=> {
        console.log(json)
        setCurrentChannel(json.Item)
        if(json){
          try {
            fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel/${cur_username}/video`,{
              method : 'GET',
              header : {
                "Content-Type": "application/json",
              },
            })
            .then(response => response.json())
            .then((json)=> {
              console.log(json.Items)
              // json.Items.map(video => {
              //   console.log(video.Scheduled_Statu)
              // })
              for(var i=0; i<json.Items.length; i++)
              {
                console.log(json.Items[i].Scheduled_Statu);
                if(json.Items[i].Scheduled_Statu == true)
                {
                  console.log(scheduledvideodata)
                  setScheduledVideoData((prevState) => {
                    return [
                      ...prevState,
                      json.Items[i]
                    ];
                  })
                }
                else{
                  console.log(recordedvideodata)
                  setRecordedVideoData((prevState) => {
                    return [
                      ...prevState,
                      json.Items[i]
                    ];
                  })
                }
              }
              // setRecordedVideoData(json.Items)
              // setScheduledVideoData(json.Items)
            })
          } catch (error) {
            console.log(error)
          }
        }
      })
      .then(() => {setshowChanneldata(true)})
    } catch (error) {
      console.log(error)
    }
    let videotableName = "ivs-liveshopping-videotable-customer-" + cur_username
    setCurrentUserName(cur_username)
    console.log(videotableName);

  }
  
  const deleteVideo = (id) => {
    console.log(id)
  }

  const ShowVideoInfoModaltoggle = () => setShowVideoInfoModal(!ShowVideoInfoModal);

  const handle_recorded_rowclick = (e) => {
    setCurrentVideo(e);
    ShowVideoInfoModaltoggle()
  }
  const handle_scheduled_rowclick = (e) => {
    setCurrentVideo(e);
    ShowVideoInfoModaltoggle()
  }
    return (
         <Fragment>
            <Breadcrumb parent="Dashboard" title="VideoManagement" caption1 = "Superadmin" caption2 = "Dashboard" description = "GÉRER LA VIDÉO DE CHAQUE CLIENT"/>
         <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader  className="dropdown-basic" style={{overflow : 'visible'}}>
                    <div className='row justify-content-between'>
                      <h5>LA VIDÉO DE CHAQUE CLIENT</h5>
                      <Dropdown>
                        <Button color="primary" className="dropbtn">{current_username? current_username : <>Select Customer Username <span><i className="icofont icofont-arrow-down"></i></span></>}</Button>
                        <DropdownMenu className="dropdown-content">
                          <DropdownItems users={userdata} />
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {current_username?
                      currentChannel?
                        <div>
                          <div style={{display : showChanneldata? 'block' : 'none'}}>
                            <div className='row justify-content-between'>
                              <h4>Channel Info</h4>
                              <button type="button" className="close" aria-label="Close" onClick={()=> {setshowChanneldata(!showChanneldata)}}><span aria-hidden="true">×</span></button>
                            </div>
                            <div className='row'>
                              <p>Channel Name : ivs-liveshopping-channel-customer-{current_username}</p>
                              <p>Channel Arn : {currentChannel.channel_arn}</p>
                              <p>Channel IngestServer : {currentChannel.channel_ingestserver}</p>
                              <p>PlaybackURL : {currentChannel.channel_playbackURL}</p>
                              <p>Streamkey : {currentChannel.streamkey}</p>
                              <p>S3 Bucket Name : ivs-liveshopping-s3bucket</p>
                            </div>
                          </div>
                          <DataTable
                            title="Recorded Video"
                            columns={columns}
                            data={recordedvideodata}
                            striped={true}
                            center={true}
                            selectableRows
                            persistTableHead
                            onRowClicked = {handle_recorded_rowclick}
                          />
                              
                          <DataTable
                            title="Scheduled Video"
                            columns={columns}
                            data={scheduledvideodata}
                            striped={true}
                            center={true}
                            selectableRows
                            persistTableHead
                            onRowClicked = {handle_scheduled_rowclick}
                          />
                        </div>
                        :'There is no recorded videos'
                      :'Select Customer Username'
                    }
                  </CardBody>
                  <Modal
                    isOpen={ShowVideoInfoModal}
                    toggle={ShowVideoInfoModaltoggle}
                    centered
                    style={{maxWidth : '800px'}}
                  >
                    <ModalHeader toggle={ShowVideoInfoModaltoggle}>
                      Video Info
                    </ModalHeader>
                    <ModalBody>
                      {currentVideo ? 
                      <>
                        <Row>
                          <Col sm="8">
                            <p>Video Title : {currentVideo.Title}</p>
                            <p>Video Subtitle : {currentVideo.Subtitle}</p>
                            <p>Stream Id : {currentVideo.id}</p>
                            <VideoPlayer
                              controls={true}
                              muted={true}
                              videoStream={currentChannel.channel_playbackURL}
                            />
                            <p>Created On : {currentVideo.CreatedOn}</p>
                            <p>Length : {currentVideo.Length}</p>

                          </Col>
                          <Col sm="4">
                            <p>Productions</p>
                            {currentVideo.Productions ?
                            <>
                            </>
                            : ''
                            }
                          </Col>
                        </Row>
                      </>
                      :''
                      }
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        onClick={ShowVideoInfoModaltoggle}
                      >
                        Close
                      </Button>
                      {/* <Button color="primary">
                        Create
                      </Button> */}
                    </ModalFooter>
                  </Modal>
                </Card>
              </Col>
            </Row>
          </Container>   
          </Fragment> 
    );
}

export default VideoManagement;
