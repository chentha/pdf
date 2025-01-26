import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../assets/vfs_fonts';
import { ImageConversionService } from 'src/app/core/image-conversion.service';
import { HttpClient } from '@angular/common/http';
import { fonts } from '../../config/pdfFonts';
import { styles, defaultStyle } from '../../config/pdfStyle';

(pdfMake as any).vfs = pdfFonts;
(pdfMake as any).fonts = fonts

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  base64String: any[] = [];
  showPdf: any;
  fileImage = [
    '../../../assets/images/amazon cafe.png',
    'https://m.media-amazon.com/images/I/31i63XNCykL.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_1IYEF7ph5SNdkXYkBnus_zgxGmiRbvd7SA&s'
  ]

  constructor(
    private imageConversionService: ImageConversionService,
    private http: HttpClient
  ) {

  }

  // convertToBase64(){
  //   for (let i = 0; i < this.fileImage.length; i++) {
  //     this.http.get(this.fileImage[i], { responseType: 'blob' }).subscribe({
  //       next: (blob: any) => {
  //         this.imageConversionService.convertToBase64(blob).then(
  //           (base64: any) => {
  //             this.base64String[i] = base64;
  //             if (this.base64String.length === this.fileImage.length) {
  //               this.generatePDF(this.base64String);
  //             }
  //             // console.log('Base64 String:', this.fileImage.length);
  //           },
  //           (error) => console.error('Error converting image to Base64:', error)
  //         );
  //       },
  //     });
  //   }
  // }

  async convertToBase64() {
    const base64Promises = this.fileImage.map((url) =>
      this.http.get(url, { responseType: 'blob' }).toPromise().then((blob: any) =>
        this.imageConversionService.convertToBase64(blob)
      )
    );
    this.base64String = await Promise.all(base64Promises);
  }

  async generatePDF() {
    const HeadAddress1 = 'ផ្ទះលេខ ៣១២ABCE០ និង ៣១២ABCE១ ផ្លូវព្រះមនីវង្ស';
    const HeadAddress2 = 'សង្កាត់ចតុមុខ ខណ្ឌដូនពេញ រាជធានីភ្នំពេញ';
    await this.convertToBase64();
    const images = this.base64String.map((file) => ({
      image: file,
      width: 50
    }));

    const documentDefinition: any = {
      pageSize: { width: 226.77, height: 'auto' },
      pageMargins: [20, 20, 20, 20],

      content: [

        ...images,


        // {
        //   image: this.base64String[1],
        //   width: 50,
        //   margar: [0, 0, 0, 10]
        // },
        // {
        //   image: this.base64String[1],
        //   width: 50,
        //   margar: [0, 0, 0, 10]
        // },
        // {
        //   image: this.base64String[2],
        //   width: 50,
        //   margar: [0, 0, 0, 10]
        // },


        // {
        //   image: this.base64String[0],
        //   width: 50,
        //   alignment: 'center',
        //   margar: [0, 0, 0, 10]
        // },
        {
          text: 'សុីភីស សីវីស អេឡិកត្រូនិក សេនធរ ឯ.ក',
          alignment: 'center',
          bold: true,
          fontSize: 8,
          margar: [0, 10, 0, 0]
        },
        {
          text: 'លេខអត្តសញ្ញាណកម្ម អតប',
          alignment: 'center',
          bold: true,
          fontSize: 8,
        },
        {
          text: 'VAT TIN: K003-901704510',
          alignment: 'center',
          fontSize: 8,
          margin: [0, 0, 0, 10],
        },
        {
          text: HeadAddress1,
          alignment: 'center',
          bold: true,
          fontSize: 8,
          margin: [0, 0, 0, 0],
        },
        {
          text: HeadAddress2,
          alignment: 'center',
          bold: true,
          fontSize: 8,
          margin: [0, 0, 0, 7],
        },
        { text: 'វិក្ត័យបត្រ', style: "head", alignment: 'center', bold: true, margin: [0, 10, 0, 10] },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 186,
              y2: 0,
              lineWidth: 0.5,
              alignment: 'center',
              dash: { length: 3, space: 1 },
            },
          ],
        },
        { text: '', margin: [0, 0, 0, 2] },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 186,
              y2: 0,
              lineWidth: 0.5,
              alignment: 'center',
              dash: { length: 3, space: 1 },
            },
          ],
        },

        { text: '', margin: [0, 0, 0, 10] },
        {
          columns: [
            { text: 'Invoice No', width: '50%', style: Text, margin: [0, 0, 0, 2] },
            { text: 'IOW25-000151', alignment: 'right', style: Text, margin: [0, 0, 0, 2] },
          ],
        },
        {
          columns: [
            { text: 'Invoice Date', width: '50%', style: Text, margin: [0, 0, 0, 2] },
            { text: '15-01-2025', alignment: 'right', margin: [0, 0, 0, 2] },
          ],
        },
        {
          columns: [
            { text: 'Customer', width: '50%', style: Text, margin: [0, 0, 0, 2] },
            { text: 'Thai Samsung Electronics', alignment: 'right', style: Text, margin: [0, 0, 0, 2] },
          ],
        },
        {
          columns: [
            { text: 'Phone No', width: '50%', style: Text, margin: [0, 0, 0, 2] },
            { text: '012768747', alignment: 'right', style: Text, margin: [0, 0, 0, 2] },
          ],
        },
        {
          columns: [
            { text: 'Exchange Rate', width: '50%', style: Text, margin: [0, 0, 0, 2] },
            { text: '4,100', alignment: 'right', style: Text, margin: [0, 0, 0, 2] },
          ],
        },
        { text: '', margin: [0, 0, 0, 5] },
        {
          style: 'Table',
          table: {
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              // ['បរិយាយមុខទំនិញ', 'បរិមាណ', 'តម្លៃរាយ', 'តម្លៃសរុប'],
              [
                { text: 'បរិយាយមុខទំនិញ', bold: true },
                { text: 'បរិមាណ', bold: true, alignment: 'right' },
                { text: 'តម្លៃរាយ', bold: true, alignment: 'right' },
                { text: 'តម្លៃសរុប', bold: true, alignment: 'rigth' },
              ],
              [
                { text: 'Description' },
                { text: 'Qty', alignment: 'right' },
                { text: 'Price', alignment: 'right' },
                { text: 'Amount', alignment: 'right' },
              ],
            ],
          },
          layout: 'noBorders',
          // layout: {
          //   hLineWidth: function (i: number, node: { table: { body: string | any[] } }) {
          //     return i === 2 ? 1 : 0;
          //   },
          //   vLineWidth: function (i: number, node: { table: { widths: string | any[] } }) {
          //     return 0;
          //   },
          //   hLineColor: function (i: any, node: any) {
          //     return i === 2 ? 'black' : null;
          //   },
          //   hLineStyle: function (i: number, node: { table: { body: string | any[] } }) {
          //     if (i === 0 || i === node.table.body.length) {
          //       return null;
          //     }
          //     return { dash: { length: 2.5, space: 1 } };
          //   },
          //   paddingLeft: function (i: any, node: any) { return 0; },

          // },
        },
        { text: '', margin: [0, 3, 0, 0] },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 186,
              y2: 0,
              lineWidth: 0.5,
              alignment: 'center',
              dash: { length: 3, space: 1 },
            },
          ],
        },
        { text: '', margin: [0, 0, 0, 3] },
        {
          table: {
            widths: ['*'],
            body: [
              [
                { text: 'Change New Screen UB SM-S918NZEFK00' },
              ],
            ],
          },
          layout: 'noBorders',
        },
        {
          table: {
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: '' },
                { text: '1', alignment: 'center' },
                { text: '150.00', alignment: 'center' },
                { text: '150.00', alignment: 'center' },
              ],
            ],
          },
          layout: 'noBorders',
        },
        { text: '', margin: [0, 10, 0, 3] },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 186,
              y2: 0,
              lineWidth: 0.5,
              alignment: 'center',
              dash: { length: 3, space: 1 },
            },
          ],
        },
        { text: '', margin: [0, 5, 0, 3] },

        {
          table: {
            widths: ['*', 'auto', 'auto'],
            body: [
              [{ text: 'សរុប / Sub Total' }, { text: '$', alignment: 'right' }, { text: '150.00', alignment: 'right' }],
              [{ text: 'បញ្ចុះតម្លៃ / Discount' }, { text: '$', alignment: 'right' }, { text: '-', alignment: 'right', margin: [0, 0, 7, 0] }],
              [{ text: 'ប្រាក់កក់ / Deposit' }, { text: '$', alignment: 'right' }, { text: '-', alignment: 'right', margin: [0, 0, 7, 0] }],
              [{ text: 'សរុបរួមទាំងអាករ / Total VAT Included' }, { text: '$', alignment: 'right' }, { text: '150.00', alignment: 'right' }],
              [{ text: 'Total in Riel (KHR)' }, { text: 'រ', alignment: 'right' }, { text: '615,000.00', alignment: 'right' }],
            ],
          },
          layout: 'noBorders',
        },
        { text: '', margin: [0, 0, 0, 8] },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 186,
              y2: 0,
              lineWidth: 0.5,
              alignment: 'center',
              dash: { length: 3, space: 1 },
            },
          ],
        },
        { text: '', margin: [0, 10, 0, 30] },
        {
          columns: [
            {
              stack: [
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 65, y2: 0, lineWidth: 0.5 }] },
                { text: 'ហត្ថលេខា (Customer)', alignment: 'center', margin: [0, 3, 0, 0], font: 'KhmerOSBattambang' },
              ],
              alignment: 'center',
            },
            {
              stack: [
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 58, y2: 0, lineWidth: 0.5 }] },
                { text: 'ហត្ថលេខា (Seller)', alignment: 'center', margin: [0, 3, 0, 0], font: 'KhmerOSBattambang' },
              ],
              alignment: 'center',
            },
          ],
        }


      ],
      styles,
      defaultStyle
    };

    // console.log(documentDefinition);
    // pdfMake.createPdf(documentDefinition).open();
    // this.showPdf =  pdfMake.createPdf(documentDefinition);
    // pdfMake.createPdf(documentDefinition).open({}, window);

    // show pdf on own page 
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const iframe = document.getElementById('pdfIframe') as HTMLIFrameElement;
      if (iframe) {
        iframe.src = dataUrl;
      }
    });
    
  }
}
