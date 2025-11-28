import { Injectable } from '@angular/core';

export interface Decoration {
  name: string;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class DecorationService {

  decorate(text: string): Decoration[] {
    const decorateStyle1 = (t: string): string => `꧁ ${t} ꧂`;
    const decorateStyle2 = (t: string): string => `★彡 ${t} 彡★`;
    const decorateStyle3 = (t: string): string => `༺ ${t} ༻`;
    const decorateStyle4 = (t: string): string => `【${t}】`;
    const decorateStyle5 = (t: string): string => `『${t}』`;
    const decorateStyle6 = (t: string): string => t.split('').join('❤');
    const decorateStyle7 = (t: string): string => {
        const map: { [key: string]: string } = {
            'a': 'α', 'b': 'в', 'c': '¢', 'd': '∂', 'e': 'є', 'f': 'ƒ', 'g': 'g', 'h': 'н',
            'i': 'ι', 'j': 'נ', 'k': 'к', 'l': 'ℓ', 'm': 'м', 'n': 'η', 'o': 'σ', 'p': 'ρ',
            'q': 'q', 'r': 'я', 's': 'ѕ', 't': 'т', 'u': 'υ', 'v': 'ν', 'w': 'ω', 'x': 'χ', 'y': 'у', 'z': 'z'
        };
        return t.toLowerCase().split('').map(char => map[char] || char).join('');
    };
    const decorateStyle8 = (t: string): string => t.split('').map(char => `(${char})`).join('');
    const decorateStyle9 = (t: string): string => {
        const map: { [key: string]: string } = {
            'a': 'ä', 'b': 'b', 'c': 'ċ', 'd': 'd', 'e': 'ë', 'f': 'f', 'g': 'ġ', 'h': 'h',
            'i': 'ï', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'ö', 'p': 'p',
            'q': 'q', 'r': 'r', 's': 'ṡ', 't': 'ẗ', 'u': 'ü', 'v': 'v', 'w': 'w', 'x': 'ẍ', 'y': 'ÿ', 'z': 'ż'
        };
        return t.toLowerCase().split('').map(char => map[char] || char).join('');
    };
    const decorateStyle10 = (t: string): string => t.toLowerCase().split('').map((char, index) => (index % 2 === 0 ? char : char.toUpperCase())).join('');
    const decorateStyle11 = (t: string): string => {
        const map: { [key: string]: string } = {
            'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ',
            'i': 'ｉ', 'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ',
            'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
            'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ',
            'I': 'Ｉ', 'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ',
            'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ',
            '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
            ' ': '　'
        };
        return t.split('').map(char => map[char] || char).join('');
    };
    const decorateStyle12 = (t: string): string => t.split('').map(char => char + '\u0336').join('');
    const decorateStyle13 = (t: string): string => {
        const map: { [key: string]: string } = {
            'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ',
            'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ',
            'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ'
        };
        return t.toLowerCase().split('').map(char => map[char] || char).join('');
    };
    const decorateStyle14 = (t: string): string => `ıllıllı ${t} ıllıllı`;
    const decorateStyle15 = (t: string): string => t.toUpperCase().split('').map((char, index) => (index % 2 === 0 ? char : char.toLowerCase())).join('');
    const decorateStyle16 = (t: string): string => `¸,ø¤º°\`°º¤ø,¸¸,ø¤º° ${t} °º¤ø,¸¸,ø¤º°\`°º¤ø,¸`;
    const decorateStyle17 = (t: string): string => {
        const map: { [key: string]: string } = {
            'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
            'i': 'ı', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
            'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        };
        return t.toLowerCase().split('').reverse().map(char => map[char] || char).join('');
    };
    const decorateStyle18 = (t: string): string => t.split('').join('✨');
    const decorateStyle19 = (t: string): string => `•´¯\`•.¸¸.•\` ${t} \`•.¸¸.•´¯\`•`;
    const decorateStyle20 = (t: string): string => t.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
          return char.toUpperCase();
        } else if (char >= 'A' && char <= 'Z') {
          return char.toLowerCase();
        }
        return char;
      }).join('');
    const decorateStyle21 = (t: string): string => `╚»★«╝ ${t} ╚»★«╝`;
    const decorateStyle22 = (t: string): string => t.split('').join('✯');
    const decorateStyle23 = (t: string): string => `░▒▓█▓▒░ ${t} ░▒▓█▓▒░`;
    const decorateStyle24 = (t: string): string => {
        const map: { [key: string]: string } = {
            'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': '𝑒', 'f': '𝒻', 'g': '𝑔', 'h': '𝒽',
            'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': '𝑜', 'p': '𝓅',
            'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
            'A': '𝒜', 'B': '𝐵', 'C': '𝒞', 'D': '𝒟', 'E': '𝐸', 'F': '𝐹', 'G': '𝒢', 'H': '𝐻',
            'I': '𝐼', 'J': '𝒥', 'K': '𝒦', 'L': '𝐿', 'M': '𝑀', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫',
            'Q': '𝒬', 'R': '𝑅', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵'
        };
        return t.split('').map(char => map[char] || char).join('');
    };

    return [
      { name: 'زخرفة 1', result: decorateStyle1(text) },
      { name: 'زخرفة 2', result: decorateStyle2(text) },
      { name: 'زخرفة 3', result: decorateStyle3(text) },
      { name: 'زخرفة 4', result: decorateStyle4(text) },
      { name: 'زخرفة 5', result: decorateStyle5(text) },
      { name: 'زخرفة 6', result: decorateStyle6(text) },
      { name: 'زخرفة 7', result: decorateStyle7(text) },
      { name: 'زخرفة 8', result: decorateStyle8(text) },
      { name: 'زخرفة 9', result: decorateStyle9(text) },
      { name: 'زخرفة 10', result: decorateStyle10(text) },
      { name: 'زخرفة 11', result: decorateStyle11(text) },
      { name: 'زخرفة 12', result: decorateStyle12(text) },
      { name: 'زخرفة 13', result: decorateStyle13(text) },
      { name: 'زخرفة 14', result: decorateStyle14(text) },
      { name: 'زخرفة 15', result: decorateStyle15(text) },
      { name: 'زخرفة 16', result: decorateStyle16(text) },
      { name: 'زخرفة 17', result: decorateStyle17(text) },
      { name: 'زخرفة 18', result: decorateStyle18(text) },
      { name: 'زخرفة 19', result: decorateStyle19(text) },
      { name: 'زخرفة 20', result: decorateStyle20(text) },
      { name: 'زخرفة 21', result: decorateStyle21(text) },
      { name: 'زخرفة 22', result: decorateStyle22(text) },
      { name: 'زخرفة 23', result: decorateStyle23(text) },
      { name: 'زخرفة 24', result: decorateStyle24(text) },
    ];
  }
}