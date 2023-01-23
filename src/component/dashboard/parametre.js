import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb' 
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  Input,

} from "reactstrap";

const  Sample = (props) => {
    return (
         <Fragment>
         <Breadcrumb parent="Dashboard" title="Parametre" caption1 = "Superadmin" caption2 = "Dashboard" description = "GERER L'ENSEMBLE DE VOS SESSIONS LIVE"/>
         <Container fluid={true}>
            <Row>
              <Col sm="12" md="4">
                <Card>
                  <CardHeader>
                    <h5>Mon Profil</h5>
                  </CardHeader>
                  <CardBody>
                  <Form classNameName="theme-form">
                    <div classNameName="row mb-2">
                      <div classNameName="col-auto">
                        <img classNameName="img-70 rounded-circle" alt="" src="../assets/images/user/7.jpg"/>
                      </div>
                      <div classNameName="col">
                        <h3 classNameName="mb-1">MARK JECNO</h3>
                        <p classNameName="mb-4">DESIGNER</p>
                      </div>
                    </div>
                    <div classNameName="form-group">
                      <h6 classNameName="form-label">Bio</h6>
                      <Input type="textarea" classNameName="form-control" rows="5" placeholder ="wbe designer avec de nombreuses possibilités" />
                    </div>
                    <div classNameName="form-group">
                      <label classNameName="form-label">E-mail</label>
                      <Input classNameName="form-control" type="email" placeholder="your-email@domain.com"/>
                    </div>
                    <div classNameName="form-group">
                      <label classNameName="form-label">Mot de passe</label>
                      <Input classNameName="form-control" type="password" value="password"/>
                    </div>
                    <div classNameName="form-group">
                      <label classNameName="form-label">Site Web</label>
                      <Input classNameName="form-control" type="text" placeholder="http://Uplor .com"/>
                    </div>
                    <div classNameName="form-footer">
                      <label classNameName="form-label"></label>
                      <Button classNameName="btn btn-primary btn-block btn-pill">Save</Button>
                    </div>
                  </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="8">
                <Card>
                  <CardHeader>
                    <h5>Modifier le Profil</h5>
                  </CardHeader>
                  <CardBody>
                  <Row>
                    <Col md="5">
                      <div className="form-group">
                        <label className="form-label">Entreprise</label>
                        <Input className="form-control" type="text" placeholder="entreprise"/>
                      </div>
                    </Col>
                    <Col sm="6" md="3">
                      <div className="form-group">
                        <label className="form-label">Nom d'utilisateur</label>
                        <Input className="form-control" type="text" placeholder="utilisateur"/>
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <Input className="form-control" type="email" placeholder="Email"/>
                      </div>
                    </Col>
                    <Col sm="6" md="6">
                      <div className="form-group">
                        <label className="form-label">Prénom</label>
                        <Input className="form-control" type="text" placeholder="Prénom"/>
                      </div>
                    </Col>
                    <Col sm="6" md="6">
                      <div className="form-group">
                        <label className="form-label">Nom</label>
                        <Input className="form-control" type="text" placeholder="Nom"/>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label">Adresse de facturation</label>
                        <Input className="form-control" type="text" placeholder="Adresse"/>
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="form-group">
                        <label className="form-label">Ville</label>
                        <Input className="form-control" type="text" placeholder="Ville"/>
                      </div>
                    </Col>
                    <Col sm="6" md="3">
                      <div className="form-group">
                        <label className="form-label">Code postal</label>
                        <Input className="form-control" type="number" placeholder="Code postal"/>
                      </div>
                    </Col>
                    <Col md="5">
                      <div className="form-group">
                        <label className="form-label">Pays</label>
                        <select className="form-control btn-square">
                          <option value="0">--Select--</option>
                          <option value="1">France</option>
                          <option value="2">Belgique</option>
                          <option value="3">Suisse</option>
                          </select>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label">A propos ma boutique en ligne</label>
                        <textarea className="form-control" rows="5" placeholder="Merci de donner une description de vos produits en vente"></textarea>
                      </div>
                    </Col>
                    <Col md="12" className="text-right">
                      <button className="btn btn-primary btn-pill" type="submit">Mise A Jour du Profil</button>
                    </Col>
                  </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>   
          </Fragment> 
    );
}

export default Sample;