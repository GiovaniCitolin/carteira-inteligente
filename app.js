
const ativos=[
{name:'IVVB11',pct:40,cot:423.5},
{name:'HGLG11',pct:25,cot:150.99},
{name:'MXRF11',pct:15,cot:9.64},
{name:'KNCR11',pct:10,cot:106},
{name:'CPTS11',pct:7,cot:7.48},
{name:'HGBS11',pct:3,cot:19.57}
];

function showTab(id){
document.querySelectorAll('.tab').forEach(t=>t.classList.add('hidden'));
document.getElementById(id).classList.remove('hidden');
}

function calcular(){
const aporte=Number(document.getElementById('aporteValor').value||0);
let html='';
ativos.forEach(a=>{
let v=aporte*a.pct/100;
let q=Math.floor(v/a.cot);
html+=`<tr><td>${a.name}</td><td>${a.pct}%</td><td>R$ ${v.toFixed(2)}</td><td>${q}</td></tr>`;
});
document.getElementById('resultado').innerHTML=html;
}

function simular(){
let total=Number(document.getElementById('pat').value);
let aporte=Number(document.getElementById('mensal').value);
let anos=Number(document.getElementById('anos').value);
let taxa=Number(document.getElementById('taxa').value)/100;
for(let i=0;i<anos*12;i++){total=(total+aporte)*(1+taxa/12);}
document.getElementById('resultadoSim').innerText='R$ '+total.toLocaleString('pt-BR',{maximumFractionDigits:2});
}
calcular();

if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js').catch(()=>{});}
