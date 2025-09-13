import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    constructor() { }

    public set<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } 
        
        catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }

    public get<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) as T : null;
        } 
        
        catch (error) {
            console.error('Error reading from localStorage', error);
            return null;
        }
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }

    public hasKey(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }
}
