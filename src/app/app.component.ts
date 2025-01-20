import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../assets/vfs_fonts';

(pdfMake as any).vfs = pdfFonts;

(pdfMake as any).fonts = {
  NotoSansKhmer: {
    normal: 'NotoSansKhmer-Thin.ttf',
    bold: 'NotoSansKhmer-Bold.ttf',
    semi: 'NotoSansKhmer-SemiBold.ttf'
    // italics: 'KhmerOSBattambang-Italic.ttf',
    // bolditalics: 'KhmerOSBattambang-BoldItalic.ttf'
  }
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
      pageSize: { width: 226.77, height: 400 }, // Specify height explicitly
      content: [
        { text: 'Logo', alignment: 'center', fontSize: 20, margin: [0, 0, 0, 10] },
        { text: 'Your Company Name', alignment: 'center', bold: true },
        { text: 'Your Company Address', alignment: 'center', bold: true, },
        { text: 'VAT TIN: K003-901704510', alignment: 'center',bold: true, margin: [0, 0, 0, 10] },
        { text: 'Invoice', style: 'header', alignment: 'center', bold: true, margin: [0, 10, 0, 10] },
        {
          columns: [
            { text: 'Invoice No', bold: true, width: '50%' },
            { text: 'IOW25-000151',bold: true, alignment: 'right' },
          ],
        },
        {
          columns: [
            { text: 'Invoice Date',bold: true, width: '50%' },
            { text: '15-01-2025',bold: true, alignment: 'right' },
          ],
        },
        {
          columns: [
            { text: 'Customer',bold: true, width: '50%' },
            { text: 'Thai Samsung Electronics',bold: true, alignment: 'right' },
          ],
        },
        {
          columns: [
            { text: 'Phone No',bold: true, width: '50%' },
            { text: '012768747',bold: true, alignment: 'right' },
          ],
        },
        {
          columns: [
            { text: 'Exchange Rate', bold: true , width: '50%' },
            { text: '4,100',bold: true, alignment: 'right' },
          ],
        },
        { text: '', margin: [0, 10, 0, 10] },



        {
          table: {
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Description', bold: true },
                { text: 'Qty', alignment: 'center', bold: true },
                { text: 'Price', alignment: 'center', bold: true },
                { text: 'Amount', alignment: 'center', bold: true },
              ],
              ['Change New Screen UB SM-S918NZEFKOO', '1', '$150.00', '$150.00'],
            ],
          },
          layout: 'lightHorizontalLines',
        },
        { text: '', margin: [0, 10, 0, 10] },
        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [{ text: 'សរុប / Sub Total', bold: true }, { text: '$150.00',bold: true, alignment: 'right' }],
              [{ text: 'បញ្ចុះតម្លៃ / Discount', bold: true }, { text: '$0.00',bold: true, alignment: 'right' }],
              [{ text: 'ប្រាក់កក់ / Deposit', bold: true }, { text: '$0.00',bold: true, alignment: 'right' }],
              [{ text: 'សរុបរួមទាំងអាករ / Total VAT Included', bold: true }, { text: '$150.00',bold: true, alignment: 'right' }],
              [{ text: 'Total in Riel (KHR)', bold: true }, { text: '៛ 615,000.00',bold: true, alignment: 'right' }],
            ],
          },
          layout: 'noBorders',
        },
        { text: '', margin: [0, 10, 0, 10] },
        {
          columns: [
            { text: 'ហត្ថលេខា​(Customer)', alignment: 'center',bold: true, margin: [0, 20, 0, 0] },
            { text: 'ហត្ថលេខា​(Seller)', alignment: 'center', bold: true, margin: [0, 20, 0, 0] },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
        },
      },
      defaultStyle: {
        font: 'NotoSansKhmer',
        fontSize: 6,
        blod: true
      },
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}
