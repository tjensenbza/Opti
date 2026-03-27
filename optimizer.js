function optimizeWithRemnants(sheet, cuts) {

  cuts.sort((a, b) => (b.w * b.h) - (a.w * a.h));

  let sheets = [];

  while (cuts.length > 0) {

    let placed = guillotinePack(sheet, cuts);

    sheets.push(placed);

    cuts = cuts.filter(c => !placed.includes(c));
  }

  return sheets;
}
