function splitFreeRect(freeRect, used) {
  return [
    {
      x: freeRect.x + used.w,
      y: freeRect.y,
      w: freeRect.w - used.w,
      h: used.h
    },
    {
      x: freeRect.x,
      y: freeRect.y + used.h,
      w: freeRect.w,
      h: freeRect.h - used.h
    }
  ].filter(r => r.w > 0 && r.h > 0);
}

function guillotinePack(sheet, cuts) {

  let freeRects = [{
    x: sheet.marginX,
    y: sheet.marginY,
    w: sheet.width - 2*sheet.marginX,
    h: sheet.height - 2*sheet.marginY
  }];

  let placed = [];

  cuts.forEach(cut => {

    for (let i=0;i<freeRects.length;i++) {

      let r = freeRects[i];

      if (cut.w <= r.w && cut.h <= r.h) {

        let node = { ...cut, x: r.x, y: r.y };
        placed.push(node);

        freeRects.splice(i,1);
        freeRects.push(...splitFreeRect(r, cut));

        return;
      }
    }
  });

  return placed;
}
