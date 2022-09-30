import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HashStringService {
  private readonly hRange = [0, 360];
  private readonly sRange = [50, 75];
  private readonly lRange = [25, 60];

  private normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
  };

  private getHashOfString = (str: string) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    hash = Math.abs(hash);

    return hash;
  };

  public getHSL(str: string): string {
    const hash = this.getHashOfString(str);

    const h = this.normalizeHash(hash, 0, 360);
    const s = this.normalizeHash(hash, 0, 100);
    const l = this.normalizeHash(hash, 0, 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  constructor() {}
}
