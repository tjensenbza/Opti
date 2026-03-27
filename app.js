let cuts = [];
let lastResult = null;
let currentSheetIndex = 0;

// Supabase
const supabaseUrl = "https://qnvrrkvyczmcdiyagwow.supabase.co";
const supabaseKey = "sb_publishable_NZ8y8dR56UzMDTpXgxlz8A_FPXGbHTu";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// OPTIMIEREN
function optimize() {
  const sheet = {
    width: +document.getElementById("sheetWidth").value,
    height: +document.getElementById("sheetHeight").value,
    marginX: +document.getElementById("marginX").value,
    marginY: +document.getElementById("marginY").value
  };

  let result = optimizeWithRemnants(sheet, [...cuts]);

  lastResult = { sheets: result, sheet };
  currentSheetIndex = 0;

  draw();
  calculateStats();
}

// ZEICHNEN
function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!lastResult) return;

  const sheet = lastResult.sheet;
  const cuts = lastResult.sheets[currentSheetIndex];

  const scale = Math.min(
    canvas.width / sheet.width,
    canvas.height / sheet.height
  );

  cuts.forEach((c, i) => {
    ctx.fillStyle = `hsl(${(i * 40) % 360},70%,70%)`;

    ctx.fillRect(
      c.x * scale,
      c.y * scale,
      c.w * scale,
      c.h * scale
    );

    ctx.strokeRect(
      c.x * scale,
      c.y * scale,
      c.w * scale,
      c.h * scale
    );

    ctx.fillStyle = "#000";
    ctx.fillText(
      `${c.w}x${c.h}`,
      c.x * scale + 5,
      c.y * scale + 15
    );
  });
}

// STATISTIK
function calculateStats() {
  let sheetArea = lastResult.sheet.width * lastResult.sheet.height;
  let totalSheets = lastResult.sheets.length;

  let used = 0;
  lastResult.sheets.forEach(s =>
    s.forEach(c => used += c.w * c.h)
  );

  let total = totalSheets * sheetArea;
  let waste = total - used;

  document.getElementById("stats").innerHTML = `
    Tafeln: ${totalSheets}<br>
    Verschnitt: ${(waste/1e6).toFixed(2)} m²
  `;
}

// PDF EXPORT
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  let y = 10;

  lastResult.sheets.forEach((s, i) => {
    pdf.text("Tafel " + (i+1), 10, y);

    s.forEach(c => {
      pdf.rect(10 + c.x*0.02, y + 5 + c.y*0.02, c.w*0.02, c.h*0.02);
    });

    y += 100;
    if (y > 250) {
      pdf.addPage();
      y = 10;
    }
  });

  pdf.save("plan.pdf");
}
