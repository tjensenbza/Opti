function splitRect(r,u){
return[
{x:r.x+u.w,y:r.y,w:r.w-u.w,h:u.h},
{x:r.x,y:r.y+u.h,w:r.w,h:r.h-u.h}
].filter(r=>r.w>0&&r.h>0);
}

function guillotinePack(sheet,cuts){

let free=[{
x:10,y:10,
w:sheet.width-20,
h:sheet.height-20
}];

let placed=[];

cuts.forEach(c=>{
for(let i=0;i<free.length;i++){
let r=free[i];

if(c.w<=r.w&&c.h<=r.h){

let n={...c,x:r.x,y:r.y};
placed.push(n);

free.splice(i,1);
free.push(...splitRect(r,c));
return;
}
}
});

return placed;
}
