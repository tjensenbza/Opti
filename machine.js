// erzeugt Schnittlinien (Maschinenlogik)

function generateCuts(cuts){

let lines=[];

cuts.forEach(c=>{

// vertikale Schnitte
lines.push({
type:"X",
pos:c.x,
from:c.y,
to:c.y+c.h
});

// horizontale Schnitte
lines.push({
type:"Y",
pos:c.y,
from:c.x,
to:c.x+c.w
});

});

return lines;
}

// Zeichnen der Schnitte
function drawCuts(ctx,cuts,scale){

let lines=generateCuts(cuts);

ctx.strokeStyle="red";

lines.forEach(l=>{
if(l.type==="X"){
ctx.beginPath();
ctx.moveTo(l.pos*scale,l.from*scale);
ctx.lineTo(l.pos*scale,l.to*scale);
ctx.stroke();
}else{
ctx.beginPath();
ctx.moveTo(l.from*scale,l.pos*scale);
ctx.lineTo(l.to*scale,l.pos*scale);
ctx.stroke();
}
});
}

// Maschinen CSV
function exportMachineCSV(){

let lines=generateCuts(lastResult.sheets[0]);

let rows=["type;pos;from;to"];

lines.forEach(l=>{
rows.push(`${l.type};${l.pos};${l.from};${l.to}`);
});

let blob=new Blob([rows.join("\n")]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="machine.csv";
a.click();
}
