import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageConversionService {
  /**
   * Converts an image file to a Base64 string.
   * @param file The image file to convert.
   * @returns 
   */
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
