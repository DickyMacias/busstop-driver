import React from 'react'
import { Container, Row, Col, Card, CardBody } from "shards-react";
import Badge from 'react-bootstrap/Badge'


const Rutas = ({ rutas }) => {

	return ( 
		<div> 

				<Container fluid className = "main-content-container px-4">
          <Row>
            <Col>
              <Card small className = "mb-4" >
                <CardBody className = "p-0 pb-3" >
                  <table className = "table mb-0">
                    <tbody>
                    <tr>
                      <th><center>Estación</center></th>
                      <th><center>Horario</center></th>
                      <th><center>Check-In</center></th>
                     </tr>
                    {rutas.map((ruta) => ( 
                      <tr>
                      <td> <center> {ruta.estacion} </center> </td> 
                        <td> <center> { ruta.hora } </center></td>
                        <td> 
													{(() => {
                            switch (ruta.check) {
                              case '0':
                                return <center> <Badge pill variant = "secondary"> Waiting </Badge></center> ;
                              case '1':
                                return <center> <Badge pill variant = "success"> On Time </Badge></center> ;
                              case '2':
                                return <center> <Badge pill variant = "danger"> Delay </Badge></center> ;
                              default:
                                return null;
                            }
													})()}
											 </td>
											 </tr> 
                       ))} 
										</tbody> 
									</table> 
								</CardBody> 
							</Card> 
						</Col> 
					</Row> 
				</Container>
      
		</div>
	)
};


export default Rutas