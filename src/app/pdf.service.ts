// import { Injectable } from '@angular/core';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// @Injectable({
//   providedIn: 'root',
// })
// export class PdfService {
//   constructor() {
//     pdfMake.vfs = pdfFonts.pdfMake.vfs;
//   }

//   generatePDF() {
//     const documentDefinition = {
//       content: [
//         { text: 'Sample PDF', fontSize: 18, bold: true, alignment: 'center' },
//       ],
//     };
//     pdfMake.createPdf(documentDefinition).open();
//   }
// }
