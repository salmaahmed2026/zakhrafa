import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageGeneratorService {
  generateImage(text: string, width: number = 600, height: number = 315): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return '';
    }

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#38b2ac'); // teal-500
    gradient.addColorStop(1, '#81e6d9'); // teal-300
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text properties
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Adjust font size based on text length
    let fontSize = 100;
    ctx.font = `bold ${fontSize}px Cairo, sans-serif`;
    while (ctx.measureText(text).width > width - 60) {
      fontSize -= 5;
      ctx.font = `bold ${fontSize}px Cairo, sans-serif`;
    }

    // Draw text with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    
    ctx.fillText(text, width / 2, height / 2);

    return canvas.toDataURL('image/png');
  }
}