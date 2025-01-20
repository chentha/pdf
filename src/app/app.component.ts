import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Import the Base64 string for Khmer OS Battambang
import { vfs, fonts } from './pdfFonts'; // Adjust the import path as necessary

// Merge default fonts and custom fonts
(pdfMake as any).vfs = {
  ...pdfFonts.pdfMake.vfs, // Default pdfMake fonts
  ...vfs,           // Custom fonts
};

// Assign the fonts to pdfMake
(pdfMake as any).fonts = {
  ...pdfFonts.pdfMake.fonts, // Default fonts
  ...fonts.fonts,           // Custom fonts
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdf';

  generatePDF() {
    const documentDefinition: any = {
      content: [
        { text: 'Logo', alignment: 'center', fontSize: 20, margin: [0, 0, 0, 10] },
        { text: 'Your Company Name', alignment: 'center', bold: true },
        { text: 'Your Company Address', alignment: 'center' },
        { text: 'VAT TIN: K003-901704510', alignment: 'center', margin: [0, 0, 0, 10] },
        { text: 'Invoice', style: 'header', alignment: 'center', bold: true, margin: [0, 10, 0, 10] },
        {
          columns: [
            { text: 'Invoice No', width: '50%', margin: [0, 0, 0, 10] },
            { text: 'IOW25-000151', alignment: 'right', margin: [0, 0, 0, 10] },
          ],
        },
        {
          columns: [
            { text: 'Invoice Date', width: '50%', margin: [0, 0, 0, 10] },
            { text: '15-01-2025', alignment: 'right', margin: [0, 0, 0, 10] },
          ],
        },
        {
          columns: [
            { text: 'Customer', width: '50%', margin: [0, 0, 0, 10] },
            { text: 'Thai Samsung Electronics', alignment: 'right', margin: [0, 0, 0, 10] },
          ],
        },
        {
          columns: [
            { text: 'Phone No', width: '50%', margin: [0, 0, 0, 10] },
            { text: '012768747', alignment: 'right', margin: [0, 0, 0, 10] },
          ],
        },
        {
          columns: [
            { text: 'Exchange Rate', width: '50%' },
            { text: '4,100', alignment: 'right' },
          ],
        },
        { text: '', margin: [0, 10, 0, 10] },
        {
          table: {
            widths: ['*', 'auto', 'auto'],
            body: [
              [
                { text: 'Description', bold: true, margin: [0, 0, 0, 5] },
                { text: 'Qty', alignment: 'center', bold: true, margin: [0, 0, 0, 5] },
                { text: 'Amount', alignment: 'center', bold: true, margin: [0, 0, 0, 5] },
              ],
              ['Change New Screen UB SM-S918NZEFKOO', '1', '$150.00'],
            ],
          },
          layout: 'lightHorizontalLines',
        },
        { text: '', margin: [0, 10, 0, 10] },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [{ text: 'សរុប / Sub Total', bold: true }, { text: '$150.00', alignment: 'right' }],
              [{ text: 'បញ្ចុះតម្លៃ / Discount', bold: true }, { text: '$0.00', alignment: 'right' }],
              [{ text: 'ប្រាក់កក់ / Deposit', bold: true }, { text: '$0.00', alignment: 'right' }],
              [{ text: 'សរុបរួមទាំងអាករ / Total VAT Included', bold: true }, { text: '$150.00', alignment: 'right' }],
              [{ text: 'Total in Riel (KHR)', bold: true }, { text: '៛ 615,000.00', alignment: 'right' }],
            ],
          },
          layout: 'noBorders',
        },
        { text: '', margin: [0, 10, 0, 10] },
        {
          columns: [
            { text: 'ហត្ថលេខា​(Customer)', alignment: 'center', margin: [0, 20, 0, 0] },
            { text: 'ហត្ថលេខា​(Seller)', alignment: 'center', margin: [0, 20, 0, 0] },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
