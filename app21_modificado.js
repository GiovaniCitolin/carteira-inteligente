let carteira=JSON.parse(localStorage.getItem('cart')||'[]');
let edit=-1;

async function preco(a){
 try{
  const url="https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/"+a+".SA";
  const r=await fetch(url);
  const j=await r.json();
  return j.chart.result[0].meta.regularMarketPrice;
 }catch(e){return null;}
}

function salvar(){
 const o={ativo:ativo.value.toUpperCase(),qtd:+qtd.value,compra:+compra.value,data:data.value};
 if(edit==-1) carteira.push(o); else carteira[edit]=o;
 localStorage.setItem('cart',JSON.stringify(carteira));
 edit=-1;
 ativo.value=qtd.value=compra.value=data.value="";
 atualizar();
}

function editar(i){
 const c=carteira[i];
 ativo.value=c.ativo;qtd.value=c.qtd;compra.value=c.compra;data.value=c.data;
 edit=i;
}

function excluir(i){
 carteira.splice(i,1);
 localStorage.setItem('cart',JSON.stringify(carteira));
 atualizar();
}

async function atualizar(){
 let lista=document.getElementById("lista");
 lista.innerHTML="";
 let pat=0;
 let investido=0;
 for(let i=0;i<carteira.length;i++){
   let c=carteira[i];
   let p=await preco(c.ativo);
   let atual=p?p*c.qtd:0;
   let inv=c.compra*c.qtd;
   investido+=inv;
   pat+=atual;
   let lucro=p?(atual-inv):0;
   lista.innerHTML+=`
   <div class="card ativo">
     <h2>${c.ativo}</h2>
     <div class="row"><span>Quantidade</span><b>${c.qtd}</b></div>
     <div class="row"><span>Compra</span><b>R$ ${c.compra.toFixed(2)}</b></div>
     <div class="row"><span>Atual</span><b>${p?"R$ "+p.toFixed(2):"Erro"}</b></div>
     <div class="row"><span>Data</span><b>${c.data||"-"}</b></div>
     <div class="row"><span>Resultado</span><b class="${lucro>=0?"lucro":"preju"}">${p?"R$ "+lucro.toFixed(2):"-"}</b></div>
     <div class="acoes">
       <button onclick="editar(${i})">✏️ Editar</button>
       <button onclick="excluir(${i})">🗑️ Excluir</button>
     </div>
   </div>`;
 }
 document.getElementById("patrimonio").textContent="R$ "+pat.toFixed(2);
const va=document.getElementById("valorAtivos");
if(va) va.textContent="R$ "+pat.toFixed(2);
const rend=pat-investido;
const rp=document.getElementById("rendimento");
if(rp){
 const perc=investido?((rend/investido)*100):0;
 rp.textContent=(rend>=0?"+":"")+"R$ "+rend.toFixed(2)+" ("+(rend>=0?"+":"")+perc.toFixed(2)+"%)";
 rp.className="valor "+(rend>=0?"lucro":"preju");
}
}
atualizar();
