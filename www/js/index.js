
var request = new XMLHttpRequest();

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode
  var theme = 'dark'
}
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  // dark mode
  var theme = 'light'
}

let aux = document.querySelector("body");
if (theme == 'light') {
  document.querySelector("body").classList = "light";
}
else if (theme == 'dark') {
  document.querySelector("body").classList = "dark";
}

async function dolar() {
  
  var os = navigator.userAgent;
  if (os.includes('iPhone')) {
    var sistema = 'ios';
  }
  else if (os.includes('Android')) {
    var sistema = 'android';
  }
  else if(navigator.userAgent.indexOf("Chrome") > -1 ||
    navigator.userAgent.indexOf("Safari") > -1 ||
    navigator.userAgent.indexOf("Opera") > -1 ||
    navigator.userAgent.indexOf("Firefox") > -1 ||
    navigator.userAgent.indexOf("Macintosh") > -1) {
      var sistema = 'web'
  }
  let system = document.getElementById('pagina')
  system.classList.add(sistema);


  

  const url_oficial = "https://mercados.ambito.com/dolar/oficial/variacion"
  const url_informal = "https://mercados.ambito.com/dolar/informal/variacion"
  const url_ahorro = "https://mercados.ambito.com/dolarahorro/variacion"
  const url_turista = "https://mercados.ambito.com/dolarturista/variacion"
  const url_qatar = "https://mercados.ambito.com/dolarqatar/variacion"
  const url_mep = "https://mercados.ambito.com/dolarrava/mep/variacion"
  const url_ccl = "https://mercados.ambito.com/dolarrava/cl/variacion"
  const url_mayorista = "https://mercados.ambito.com/dolar/mayorista/variacion"
  const lista_compra1 = [];
  const lista_venta1 = [];
  const lista_change = [];

  const re_oficial = await fetch(url_oficial);
  const data_oficial = await re_oficial.json();
  oficial_compra = parseFloat(data_oficial["compra"].replace(",","."))
  oficial_venta = parseFloat(data_oficial["venta"].replace(",","."))
  oficial_clase = data_oficial["class-variacion"]
  lista_change.push(oficial_clase)
  oficial_avg = (parseFloat(oficial_compra) + parseFloat(oficial_venta)) / 2;
  //////////////////////////////
  const re_informal = await fetch(url_informal);
  const data_informal = await re_informal.json();
  informal_compra = parseFloat(data_informal["compra"].replace(",","."))
  informal_venta = parseFloat(data_informal["venta"].replace(",","."))
  informal_clase = data_informal["class-variacion"]
  lista_change.push(informal_clase)
  informal_avg = (parseFloat(informal_compra) + parseFloat(informal_venta)) / 2;
  //////////////////////////////
  const re_ahorro = await fetch(url_ahorro);
  const data_ahorro = await re_ahorro.json();
  ahorro_compra = parseFloat(data_ahorro["compra"].replace(",","."))
  ahorro_venta = parseFloat(data_ahorro["venta"].replace(",","."))
  ahorro_clase = data_ahorro["class-variacion"]
  lista_change.push(ahorro_clase)
  //////////////////////////////
  const re_turista = await fetch(url_turista);
  const data_turista = await re_turista.json();
  turista_compra = parseFloat(data_turista["compra"].replace(",","."))
  turista_venta = parseFloat(data_turista["venta"].replace(",","."))
  turrista_clase = data_turista["class-variacion"]
  lista_change.push(turrista_clase)
  //////////////////////////////
  const re_qatar = await fetch(url_qatar);
  const data_qatar = await re_qatar.json();
  qatar_compra = parseFloat(data_qatar["compra"].replace(",","."))
  qatar_venta = parseFloat(data_qatar["venta"].replace(",","."))
  qatar_clase = data_qatar["class-variacion"]
  lista_change.push(qatar_clase)
  //////////////////////////////
  const re_mep = await fetch(url_mep);
  const data_mep = await re_mep.json();
  mep_compra = parseFloat(data_mep["compra"].replace(",","."))
  mep_venta = parseFloat(data_mep["venta"].replace(",","."))
  mep_clase = data_mep["class-variacion"]
  lista_change.push(mep_clase)
  //////////////////////////////
  const re_ccl = await fetch(url_ccl);
  const data_ccl = await re_ccl.json();
  ccl_compra = parseFloat(data_ccl["compra"].replace(",","."))
  ccl_venta = parseFloat(data_ccl["venta"].replace(",","."))
  ccl_clase = data_ccl["class-variacion"]
  lista_change.push(ccl_clase)
  //////////////////////////////
  const re_mayorista = await fetch(url_mayorista);
  const data_mayorista = await re_mayorista.json();
  mayorista_compra = parseFloat(data_mayorista["compra"].replace(",","."))
  mayorista_venta = parseFloat(data_mayorista["venta"].replace(",","."))
  mayorista_clase = data_mayorista["class-variacion"]
  lista_change.push(mayorista_clase)
  //////////////////////////////
  const dolar_cripto = await fetch("https://criptoya.com/api/usdt/ars");
  const data_cripto = await dolar_cripto.json();
  for (i = 0; i < Object.keys(data_cripto).length; i++) {
    const exchange = Object.keys(data_cripto)[i];
    if (exchange == 'belo') {
      var belo_v = Object.values(Object.values(data_cripto)[i])[1]
      var belo_c = Object.values(Object.values(data_cripto)[i])[3]
    }
    if (exchange == 'lemoncash') {
      var lemon_v = Object.values(Object.values(data_cripto)[i])[1]
      var lemon_c = Object.values(Object.values(data_cripto)[i])[3]
    }

  }
  cripto_clase = oficial_clase
  var cripto_compra = parseFloat(((belo_c + lemon_c) / 2).toFixed(2))
  var cripto_venta = parseFloat(((belo_v + lemon_v) / 2).toFixed(2))
  lista_change.push(cripto_clase)

  document.getElementById("loader").style.display = "none";
	document.getElementById("botones").style.display = "block";
  document.getElementById("tbody_dolar").style.display = "block";
  document.getElementById("navbar").style.display = "block";
  

  // creo la tabla con las cotizaciones
  function createTable() {
    body = document.createElement('tbody_dolar');
    var oficial = '<tr><td>OFICIAL</td>\n<td id="compra">$ ' + oficial_compra + '</td><td id="venta">$ ' + oficial_venta + '</td></tr>';
    var informal = '<tr><td>INFORMAL</td>\n<td id="compra">$ ' + informal_compra + '</td><td id="venta">$ ' + informal_venta + '</td></tr>';
    var ahorro = '<tr><td>AHORRO</td>\n<td id="compra">' + '-' + '</td><td id="venta">$ ' + ahorro_venta + '</td></tr>';
    var turista = '<tr><td>TURISTA</td>\n<td id="compra">' + '-' + '</td><td id="venta">$ ' + turista_venta + '</td></tr>';
    var qatar = '<tr><td>QATAR</td>\n<td id="compra">' + '-' + '</td><td id="venta">$ ' + qatar_venta + '</td></tr>';
    var ccl = '<tr><td>CCL</td>\n<td id="compra">$ ' + ccl_compra + '</td><td id="venta">$ ' + ccl_venta + '</td></tr>';
    var mep = '<tr><td>MEP</td>\n<td id="compra">$ ' + mep_compra + '</td><td id="venta">$ ' + mep_venta + '</td></tr>';
    var mayorista = '<tr><td>MAYORISTA</td>\n<td id="compra">$ ' + mayorista_compra + '</td><td id="venta">$ ' + mayorista_venta + '</td></tr>';
    var cripto = '<tr><td>CRIPTO</td>\n<td id="compra">$ ' + cripto_compra + '</td><td id="venta">$ ' + cripto_venta + '</td></tr>';
    
    var html = document.getElementById("tbody_dolar").innerHTML + oficial + informal + ahorro + turista + qatar + ccl + mep + mayorista + cripto
    document.getElementById("tbody_dolar").innerHTML = html;
  }
  createTable();

  function addClase() {
    let buy = document.querySelectorAll("[id^='compra']");
    let sell = document.querySelectorAll("[id^='venta']");
    for (let i = 0; i < lista_change.length; i++) {
      if (lista_change[i] == 'up') {
        buy[i].classList.add("positivo");
        sell[i].classList.add("positivo");
      }
      if (lista_change[i] == 'down') {
        buy[i].classList.add("negativo");
        sell[i].classList.add("negativo");
      }
      if (lista_change[i] == 'equal') {
        buy[i].classList.add("igual");
        sell[i].classList.add("igual");
      }
    }
  }
  addClase();
}
dolar();

/*  #######################################################################################################  */
/*  #######################################################################################################  */
/*  #######################################################################################################  */

async function cripto() {
  
  const url = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD'
  const response = await fetch(url);
  const data = await response.json();
  const coins = Object.values(data)[0];
  const lista_symbol = [];
  const lista_icon = [];
  const lista_price = [];
  const lista_priceChange1h = [];
  const lista_priceChange1d = [];
  const lista_priceChange1w = [];
  for (let i = 0; i < coins.length ; i++) {
    symbol = coins[i].symbol;
    icon = coins[i].icon;
    price = coins[i].price;
    if (price >= 1000) {
      price = parseInt(price);
    }
    if (price >= 100 && price < 1000) {
      price = parseFloat(price);
      price = price.toFixed(2);
    }
    if (price >= 0.001 && price < 100) {
      price = parseFloat(price);
      price = price.toFixed(3);
    }
    if (price <= 0.001) {
      console.log(symbol)
      console.log(price)
      price_str = price.toString();
      price_str = price_str.substring(0, 7);
      price = parseFloat(price_str);
      console.log(price_str)
    }
    priceChange1h = coins[i].priceChange1h;
    priceChange1d = coins[i].priceChange1d;
    priceChange1w = coins[i].priceChange1w;
    lista_symbol.push(symbol);
    lista_icon.push(icon);
    lista_price.push(price);
    lista_priceChange1h.push(priceChange1h);
    lista_priceChange1d.push(priceChange1d);
    lista_priceChange1w.push(priceChange1w);
  }
  
  function createTable() {
    body = document.createElement('tbody');
    for (let i = 0; i < coins.length; i++) {
      num = i + 1;
      if (num.toString().length == 1) {
        num = "0" + num;
      }
      if (num.toString().length == 2) {
        num = "0" + num;
      }
      src = lista_icon[i];
      logo = '<img src="' + src + '" height=12 width=12>   ';
      let row = '<tr id="tr' + i + '"><td>' + num + '</td><td class="fav">' + logo + lista_symbol[i] + '</a></td><td>' + lista_price[i] + '</td><td id="hour">' + lista_priceChange1h[i] + '</td><td id="day">' + lista_priceChange1d[i] + '</td><td id="week">' + lista_priceChange1w[i] + '</td></tr>';
      let html = document.getElementById("tbody").innerHTML + row;
      document.getElementById("tbody").innerHTML = html;
    }
  }
  createTable();

  function addClass() {
    let hour = document.querySelectorAll("[id^='hour']");
    for (let i = 0; i < hour.length; i++) {
      if (hour[i].textContent >= 0) {
        hour[i].classList.add("positivo");
      }
      if (hour[i].textContent < 0) {
        hour[i].classList.add("negativo");
      }
    }
    let day = document.querySelectorAll("[id^='day']");
    for (let i = 0; i < day.length; i++) {
      if (day[i].textContent >= 0) {
        day[i].classList.add("positivo");
      }
      if (day[i].textContent < 0) {
        day[i].classList.add("negativo");
      }
    }
    let week = document.querySelectorAll("[id^='week']");
    for (let i = 0; i < week.length; i++) {
      if (week[i].textContent >= 0) {
        week[i].classList.add("positivo");
      }
      if (week[i].textContent < 0) {
        week[i].classList.add("negativo");
      }
    }
    
  }
  addClass();
}
cripto();

/*  #######################################################################################################  */
/*  #######################################################################################################  */
/*  #######################################################################################################  */



const link_argenbtc = "https://argenbtc.com/";
const link_belo = "https://www.belo.app/";
const link_bitex = "https://bitex.la/";
const link_bitmonedero = "https://www.bitmonedero.com/";
const link_bitso = "https://bitso.com/?l=es-ar";
const link_buenbit = "https://www.buenbit.com/";
const link_bybit = "https://www.bybit.com/es-419/";
const link_calypso = "https://calypso.exchange/";
const link_copter = "https://exchangecopter.com/";
const link_cryptomkt = "https://www.cryptomkt.com/es/";
const link_decrypto = "https://www.decrypto.la/";
const link_fiwind = "https://fiwind.io/";
const link_kriptonmarket = "https://kriptonmarket.com/";
const link_latamex = "https://www.latamex.com/";
const link_lemoncash = "https://www.lemon.me/";
const link_letsbit = "https://letsbit.io/";
const link_pluscrypto = "https://pluscrypto.com.ar/#/crypto/home";
const link_ripio = "https://www.ripio.com/ar/";
const link_ripioexchange = "https://exchange.ripio.com/es/";
const link_saldo = "https://saldo.com.ar/";
const link_satoshitango = "https://www.satoshitango.com/es-AR/";
const link_takenos = 'https://www.takenos.com/'
const link_tiendacrypto = "https://www.tiendacrypto.com/";
const link_null = 'https://www.google.com.ar/';



async function usdt_ars() {
  const usdt_ars = await fetch("https://criptoya.com/api/usdt/ars/0.1");
  const usdt_ars_data = await usdt_ars.json();


  const takenos = await fetch("https://us-central1-takenosmvp.cloudfunctions.net/getUsdToArsRate")
  const takenos_data = await takenos.json();
  const takenos_compra = 0
  const takenos_venta = takenos_data.data.value;
  
  
  len_usdt = (Object.keys(usdt_ars_data)).length;

  const lista_exchange = [];
  const lista_compra = [];
  const lista_venta = [];
  const lista_link = [];

  for (let i = 0; i < len_usdt ; i++) {
    const exchange = Object.keys(usdt_ars_data)[i];
    const exchange2 = Object.values(usdt_ars_data)[i];
    const exchange_compra = Object.values(exchange2)[0];
    const exchange_venta = Object.values(exchange2)[2];
    lista_exchange.push(exchange);
    lista_compra.push(exchange_compra);
    lista_venta.push(exchange_venta);
    if (exchange == 'argenbtc') {
      lista_link.push(link_argenbtc)
    }
    if (exchange == 'belo') {
      lista_link.push(link_belo)
    }
    if (exchange == 'bitex') {
      lista_link.push(link_bitex)
    }
    if (exchange == 'bitmonedero') {
      lista_link.push(link_bitmonedero)
    }
    if (exchange == 'bitso') {
      lista_link.push(link_bitso)
    }
    if (exchange == 'buenbit') {
      lista_link.push(link_buenbit)
    }
    if (exchange == 'bybit') {
      lista_link.push(link_bybit)
    }
    if (exchange == 'calypso') {
      lista_link.push(link_calypso)
    }
    if (exchange == 'copter') {
      lista_link.push(link_copter)
    }
    if (exchange == 'cryptomkt') {
      lista_link.push(link_cryptomkt)
    }
    if (exchange == 'decrypto') {
      lista_link.push(link_decrypto)
    }
    if (exchange == 'fiwind') {
      lista_link.push(link_fiwind)
    }
    if (exchange == 'kriptonmarket') {
      lista_link.push(link_kriptonmarket)
    }
    if (exchange == 'latamex') {
      lista_link.push(link_latamex)
    }
    if (exchange == 'lemoncash') {
      lista_link.push(link_lemoncash)
    }
    if (exchange == 'letsbit') {
      lista_link.push(link_letsbit)
    }
    if (exchange == 'pluscrypto') {
      lista_link.push(link_pluscrypto)
    }
    if (exchange == 'ripio') {
      lista_link.push(link_ripio)
    }
    if (exchange == 'ripioexchange') {
      lista_link.push(link_ripioexchange)
    }
    if (exchange == 'saldo') {
      lista_link.push(link_saldo)
    }
    if (exchange == 'satoshitango') {
      lista_link.push(link_satoshitango)
    }
    if (exchange == 'tiendacrypto') {
      lista_link.push(link_tiendacrypto)
    }
    else if (exchange != 'argenbtc' && exchange != 'belo' && exchange != 'bitex' && exchange != 'bitmonedero' && exchange != 'bitso' && exchange != 'buenbit' && exchange != 'copter' && exchange != 'cryptomkt' && exchange != 'decrypto' && exchange != 'fiwind' && exchange != 'latamex' && exchange != 'lemoncash' && exchange != 'letsbit' && exchange != 'ripio' && exchange != 'ripioexchange' && exchange != 'satoshitango' && exchange != 'tiendacrypto' && exchange != 'saldo' && exchange != 'kriptonmarket' && exchange != 'bybit' && exchange != 'calypso' && exchange != 'pluscrypto')
    {
      lista_link.push(link_null)
    }
  }
  lista_exchange.push("takenos");
  lista_compra.push(takenos_compra);
  lista_venta.push(takenos_venta);
  lista_link.push(link_takenos);


  function createTable2() {
    for (let i = 0; i <= len_usdt; i++) {
      var row = '<tr><td><a id="link_' + lista_exchange[i] + '" href="' + lista_link[i] + '" target="_blank">' + lista_exchange[i] + '</td>\n<td>' + lista_compra[i] + '</td><td>' + lista_venta[i] + '</td></tr>';
      let html = document.getElementById("usdt_ars_table").innerHTML + row;
      document.getElementById("usdt_ars_table").innerHTML = html;
    }
  }
  createTable2();

  sortTable();
  function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("usdt_ars_table");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (x.textContent.toLowerCase() > y.textContent.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }


}
usdt_ars();


/*  #######################################################################################################  */
/*  #######################################################################################################  */
/*  #######################################################################################################  */


function merval() {
  const url_cors = 'https://cors.eu.org/';
  // const url_rava = 'https://www.rava.com/';
  // const url_bolsar = 'https://bolsar.info/lideres.php'
  // const url_byma = 'https://open.bymadata.com.ar/#/local-stocks-adrs'
  const url_tview = 'https://www.tradingview.com/markets/stocks-argentina/market-movers-large-cap/'

  fetch(url_cors + url_tview)
    .then(response => response.text())
    .then(data => {
      var lista_accion = [];
      var lista_precio = [];
      var lista_cambio = [];
      var lista_mktcap = [];
      var lista_link = [];
      const link_url = 'https://www.tradingview.com/symbols/BCBA-'
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data, 'text/html');
      const table = htmlDoc.querySelector('table');
      const rows = table.rows;
      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].cells;
        const accion = cells[0].firstChild.children[2].textContent;
        const mkt_cap = cells[1].textContent.slice(0, -4);
        const precio = cells[2].textContent.slice(0, -4);
        const change = cells[3].textContent.slice(0, -1);
        const signo = change[0]
        if (isNaN(signo)) {
          cambio = parseFloat(change.substring(1))
          cambio = -cambio
        }
        else {
          cambio = parseFloat(change)
        }
        lista_accion.push(accion);;
        lista_mktcap.push(mkt_cap);
        lista_precio.push(precio);
        lista_cambio.push(cambio);
      }

 
      function createTable3() {
        for (let i = 0; i < lista_accion.length; i++) {
          var row = '<tr><td><a href="https://www.tradingview.com/symbols/BCBA-' + lista_accion[i] + '" target="_blank">' + lista_accion[i] + '</td><td>' + lista_precio[i] + '</td><td id="cambio">' + lista_cambio[i] + '</td><td id="mkt_cap">' + lista_mktcap[i] + '</td></tr>';
          let html = document.getElementById("tabla_merval").innerHTML + row;
          document.getElementById("tabla_merval").innerHTML = html;
        }
      }
      createTable3();

      function addClass() {
        let hour = document.querySelectorAll("[id^='cambio']");
        for (let i = 0; i < hour.length; i++) {
          if (hour[i].textContent >= 0) {
            hour[i].classList.add("positivo");
          }
          if (hour[i].textContent < 0) {
            hour[i].classList.add("negativo");
          }
        }
      }
      addClass();
    })
}
merval()


/*  #######################################################################################################  */
/*  #######################################################################################################  */
/*  #######################################################################################################  */


let boton_cripto = document.getElementById("btnCripto");
boton_cripto.addEventListener("click", toggle_cripto);
let boton_usdt = document.getElementById("btnUsdt");
boton_usdt.addEventListener("click", toggle_usdt);
let boton_dolar = document.getElementById("btnDolar");
boton_dolar.addEventListener("click", toggle_dolar);
let boton_merval = document.getElementById("btnMerval");
boton_merval.addEventListener("click", toggle_merval);

function toggle_cripto() {
  let body_dolar = document.getElementById("tbody_dolar");
  body_dolar.style.display = "none";
  let body_cripto = document.getElementById("tabla_cripto");
  body_cripto.style.display = "block";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_merval = document.getElementById("tabla_merval");
  body_merval.style.display = "none";

  boton_dolar.style.opacity = '1';
  boton_cripto.style.opacity = '0.5';
  boton_usdt.style.opacity = '1';
  boton_merval.style.opacity = "1";
}
function toggle_usdt() {
  let body_dolar = document.getElementById("tbody_dolar");
  body_dolar.style.display = "none";
  let body_cripto = document.getElementById("tabla_cripto");
  body_cripto.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "block";
  let body_merval = document.getElementById("tabla_merval");
  body_merval.style.display = "none";

  boton_dolar.style.opacity = '1';
  boton_cripto.style.opacity = '1';
  boton_usdt.style.opacity = '0.5';
  boton_merval.style.opacity = "1";
}
function toggle_dolar() {
  let body_dolar = document.getElementById("tbody_dolar");
  body_dolar.style.display = "block";
  let body_cripto = document.getElementById("tabla_cripto");
  body_cripto.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_merval = document.getElementById("tabla_merval");
  body_merval.style.display = "none";

  boton_dolar.style.opacity = '0.5';
  boton_cripto.style.opacity = '1';
  boton_usdt.style.opacity = '1';
  boton_merval.style.opacity = "1";
}

function toggle_merval() {
  let body_dolar = document.getElementById("tbody_dolar");
  body_dolar.style.display = "none";
  let body_cripto = document.getElementById("tabla_cripto");
  body_cripto.style.display = "none";
  let body_usdt = document.getElementById("usdt_ars_table");
  body_usdt.style.display = "none";
  let body_merval = document.getElementById("tabla_merval");
  body_merval.style.display = "block";

  boton_dolar.style.opacity = '1';
  boton_cripto.style.opacity = '1';
  boton_usdt.style.opacity = '1';
  boton_merval.style.opacity = "0.5";
}





/*  #######################################################################################################  */
/*  #######################################################################################################  */
/*  #######################################################################################################  */





////////////////////////// ORDENA POR LA COLUMNA COMPRA EN USDT ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_usdt_compra' ) {
    sortCompraUsdt();
  };
} );
function sortCompraUsdt() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("usdt_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}
//////////////////////// ORDENA POR LA COLUMNA VENTA EN USDT ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_usdt_venta' ) {
    sortVentaUsdt();
  };
} );
function sortVentaUsdt() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("usdt_ars_table");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}



//////////////////////// ORDENA POR LA COLUMNA %1d EN MERVAL ////////////////////////
document.body.addEventListener( 'click', function ( event ) {
  if( event.target.id == 'sort_merval' ) {
    sortMerval();
  };
} );
function sortMerval() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tabla_merval");
  switching = true;
  dir = "desc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
          }
        } 
        else if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } 
    else {
      if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
    }
  }
}



// ORDENA POR LA COLUMNA '#'
let moneda = document.getElementById("sort_num");
moneda.addEventListener("click", sortNum);
function sortNum() {
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("tabla_cripto");
	switching = true;
	dir = "asc";
	while (switching) {
	    switching = false;
	    rows = table.rows;
	    for (i = 1; i < (rows.length - 1); i++) {
		    shouldSwitch = false;
		    x = rows[i].getElementsByTagName("TD")[0];
		    y = rows[i + 1].getElementsByTagName("TD")[0];
	      	if (dir == "asc") {
		       	if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				    shouldSwitch = true;
				    break;
		        }
	      	} 
	      	else if (dir == "desc") {
	        	if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			        shouldSwitch = true;
			        break;
	        	}
	      	}
	    }
	    if (shouldSwitch) {
	      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      switching = true;
	      switchcount ++;
	    } 
	    else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
	    }
  	}
}



//////////////////////// ORDENA POR LA COLUMNA '1H' ////////////////////////
let hora = document.getElementById("sort_hour");
hora.addEventListener("click", sortHour);
function sortHour() {
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("tabla_cripto");
	switching = true;
	dir = "desc";
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[3];
			y = rows[i + 1].getElementsByTagName("TD")[3];
			if (dir == "desc") {
			    if (Number(x.innerHTML) < Number(y.innerHTML)) {
					shouldSwitch = true;
					break;
			    }
		  	} 
		  	else if (dir == "asc") {
			    if (Number(x.innerHTML) > Number(y.innerHTML)) {
			    	shouldSwitch = true;
			    	break;
			    }
		  	}
		}
		if (shouldSwitch) {
		  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		  switching = true;
		  switchcount ++;
		} 
		else {
			if (switchcount == 0 && dir == "desc") {
		    	dir = "asc";
		    	switching = true;
		  	}
		}
	}
}


//////////////////////// ORDENA POR LA COLUMNA '1D' ////////////////////////
let dia = document.getElementById("sort_day");
dia.addEventListener("click", sortDay);
function sortDay() {
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("tabla_cripto");
	switching = true;
	dir = "desc";
	while (switching) {
	    switching = false;
	    rows = table.rows;
	    for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[4];
			y = rows[i + 1].getElementsByTagName("TD")[4];
			if (dir == "desc") {
		        if (Number(x.innerHTML) < Number(y.innerHTML)) {
					shouldSwitch = true;
					break;
		        }
	    	} 
	    	else if (dir == "asc") {
	        	if (Number(x.innerHTML) > Number(y.innerHTML)) {
					shouldSwitch = true;
					break;
	        	}
      		}
	    }
	    if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount ++;
	    }
	    else {
	    	if (switchcount == 0 && dir == "desc") {
		        dir = "asc";
		        switching = true;
	     	}
	    }
  	}
}

//////////////////////// ORDENA POR LA COLUMNA '1W' ////////////////////////
let semana = document.getElementById("sort_week");
semana.addEventListener("click", sortWeek);
function sortWeek() {
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("tabla_cripto");
	switching = true;
	dir = "desc";
	while (switching) {
	    switching = false;
	    rows = table.rows;
	    for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[5];
			y = rows[i + 1].getElementsByTagName("TD")[5];
			if (dir == "desc") {
				if (Number(x.innerHTML) < Number(y.innerHTML)) {
					shouldSwitch = true;
					break;
				}
			}
			else if (dir == "asc") {
				if (Number(x.innerHTML) > Number(y.innerHTML)) {
			  		shouldSwitch = true;
			  		break;
				}
			}
	    }
	    if (shouldSwitch) {
	      	rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	      	switching = true;
	      	switchcount ++;
	    }
	    else {
	      	if (switchcount == 0 && dir == "desc") {
	        	dir = "asc";
	        	switching = true;
	      	}
	    }
  	}
}