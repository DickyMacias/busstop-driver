import React, { Component } from 'react';
import Rutas from './components/rutas';
import Clock from 'react-live-clock';
import Pages from './components/pages';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody } from "shards-react";

class App extends Component {

    constructor(props){
        super(props);
    this.state = {
        rutas: [],
    }
}
    componentDidMount() {
        // Cargar parametros desde URL
        var url_params = getParam();
        let hora = timeReader();
        let min = minuteReader();
        hora = parseInt(hora);
        let a = hora - 1;
        let d = hora + 1;
        min = parseInt(min);

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


        checador(estacion,hora,min);
        
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

function minuteReader() {
    let today = new Date();
    let m = today.getMinutes();
    let t = setTimeout(minuteReader, 500);
    return m;
}

function checkTime(i) {
    if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
    return i;
}


function checador(estacion,hora,min){

    let minute = minuteSetter(min);
    let checker = minuteChecker(min);
    console.log(minute);
    console.log(checker);

    var url_timer = "https://busstopcuu-api.herokuapp.com/rutas?camion="+estacion+"&hora="+hora+":"+minute+"";

    console.log(url_timer);
    axios.get(url_timer)
            .then(res => { var entradas = JSON.stringify((res.data));
                let entrada = entradas.slice(1, entradas.length -1);
                entrada = JSON.parse(entrada);
                
                var _id = entrada.id;
                console.log(_id);
                var _ruta = entrada.ruta;
                console.log(_ruta);
                var _estacion = entrada.estacion;
                console.log(_estacion);
                var _hora = entrada.hora;
                console.log(_hora);
                var _camion = entrada.camion;
                console.log(_camion);
                var _check = entrada.check;
                console.log(_check);

                axios.put("https://busstopcuu-api.herokuapp.com/rutas/"+_id+"", {

                    "ruta": ""+_ruta+"",
                    "estacion": ""+_estacion+"",
                    "camion": ""+_camion+"",
                    "id": _id,
                    "hora": ""+_hora+"",
                    "check": ""+checker+""
                    
                }).then(resp => {
                    console.log(resp.data);
                }).catch(error => {
                    console.log(error);
                }); 

            })
}


function minuteChecker(min){
    let check = 0;
    if ((min>=0&&min<3)||(min>=11&&min<15)||(min>=23&&min<27)||(min>=35&&min<39)||(min>=47&&min<51)||(min>=59)){
        check = 1;
    }else if ((min>=3&&min<11)||(min>=15&&min<23)||(min>=27&&min<35)||(min>=39&&min<47)||(min>=51&&min<59)){
        check = 2;
    }
    return check;
}

function minuteSetter(min){
    let minute ="";
    if ((min>=0&&min<11)||(min>=59)){
        minute = "00";
    } else if (min>=11&&min<23){
        minute = "12";
    } else if (min>=23&&min<35){
        minute = "24";
    } else if (min>=35&&min<47){
        minute = "36";
    } else if (min>=47&&min<59){
        minute = "48";
    }
    return minute;
}

export default App;