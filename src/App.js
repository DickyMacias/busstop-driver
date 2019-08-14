import React, { Component } from 'react';
import Rutas from './components/rutas';
import Clock from 'react-live-clock';
import Pages from './components/pages';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody } from "shards-react";

class App extends Component {

    state = {
        rutas: []
    }
    componentDidMount() {
        // Cargar parametros desde URL
        var url_params = getParam();
        let hora = timeReader();
        let a = parseInt(hora) - 1;
        let d = parseInt(hora) + 1;

        if (url_params) {
            var estacion = url_params['camion'];
            var camion = url_params['UTCH'];
            this.station = estacion;
            // for(var index in url_params)
            // {
            //   console.log(" clave: "+index+" - valor: "+url_params[index]);
            // }
            console.log("La estacion es: " + estacion);
        } else {
            console.log("No se ha recibido ningún parámetro");
        }
        // Pasamos parametros a la URL del GET
        console.log("este es antes" + a)
        console.log("este es despues" + d)
        console.log("este es el nombre " + estacion)
        let beacon_url = "https://busstopcuu-api.herokuapp.com/rutas?camion=" + estacion +"&_sort=id&_order=asc"
        console.log(beacon_url)
        setInterval(async () => { await axios.get(beacon_url)
            .then(res => { const rutas = res.data;
                // Se envian al metodo state los resultados del JSON
                this.setState({ rutas });
            })}, 500);

        axios.put("https://busstopcuu-api.herokuapp.com/rutas/101076", {

            "ruta": "Ruta 1",
            "estacion": "UTCH",
            "camion": "101",
            "id": 101076,
            "hora": "21:00",
            "check": "2"
            
        }).then(resp => {
        
            console.log(resp.data);
        }).catch(error => {
        
            console.log(error);
        });  

        // fetch("http://localhost:3000/rutas?camion=101&estacion=UTCH&hora=6:00", {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //         id: 101001,
        //         estacion: 'UTCH',
        //         camion: '101',
        //         hora: '6:00',
        //         check: '1',
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        //     })
        //     .then(response => response.json())
        //     .then(json => console.log(json))
        
    }

    render() {
        return ( <React.Fragment>
            <div className="sticky">
            <Pages> </Pages>  
            <Container>
            <Card>
            <CardBody>
            <Row>
            <Col>
            <center>
            <h1>Ruta</h1>
            </center>      </Col> 
            <Col>
            
            <center>
            
            <h2> Camión { this.station } </h2> </center> </Col>  </Row> 
            </CardBody>  
            </Card> 
            </Container>  
            <Container >
            </Container>  
            <div>
            <center>
            <h1>
            <Clock format = { 'HH:mm:ss' }
            ticking = { true }
            timezone = { 'America/Chihuahua' }/>  
            </h1> </center>   
            </div> 
            </div>

            <Rutas rutas = { this.state.rutas }/>    
            </React.Fragment>
        );
    }
}

function getParam() {
    // capturamos la url
    let loc = document.location.href;
    // si existe el interrogante
    if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        let getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        let GET = getString.split('&');
        let get = {};
        // recorremos todo el array de url_params
        for (let i = 0, l = GET.length; i < l; i++) {
            let tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

function timeReader() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    let hora = h + ":" + m;
    console.log("la hora es " + hora);
    let t = setTimeout(timeReader, 500);
    return h;
}

function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}


export default App;