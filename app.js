let cuts=[];
let lastResult=null;

function addCut(){
let w=+cutW.value;
let h=+cutH.value;
let q=+cutQty.value;

for(let i=0;i<q;i++)cuts.push({w,h,rot:true});

renderTable();
}

function renderTable(){
let tb=document.querySelector("#cutTable tbody");
tb.innerHTML="";
cuts.forEach((c,i)=>{
tb.innerHTML+=`<tr>
<td>${c.w}</td>
<td>${c.h}</td>
<td><button onclick="cuts.splice(${i},1);renderTable()">❌</button></td>
</tr>`;
});
}

function optimize(){
let sheet={
width:+sheetWidth.value,
height:+sheetHeight.value,
marginX:10,
marginY:10
};

let sheets=optimizeWithRemnants(sheet,[...cuts]);

lastResult={sheets,sheet};

draw();
}

function draw(){
let ctx=canvas.getContext("2d");
ctx.clearRect(0,0,900,600);

let sheet=lastResult.sheet;
let cuts=lastResult.sheets[0];

let scale=0.1;

cuts.forEach((c,i)=>{
ctx.fillStyle=`hsl(${i*40},70%,70%)`;
ctx.fillRect(c.x*scale,c.y*scale,c.w*scale,c.h*scale);

ctx.strokeRect(c.x*scale,c.y*scale,c.w*scale,c.h*scale);
});

drawCuts(ctx,cuts,scale);
}
