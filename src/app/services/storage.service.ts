import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
	storage: Storage = window.localStorage;

	public setItem<T>(key: string, value: T): void {
		this.storage.setItem(key, JSON.stringify(value));
	}

	public getItem<T>(key: string): any {
		try {
			const data: any = this.storage.getItem(key);
			if (data) {
				return JSON.parse(data) as T;
			}

			return null;
		} catch {
			this.clear();

			return null;
		}
	}

	public removeItem(key: string): void {
		this.storage.removeItem(key);
	}

	public clear(): void {
		this.storage.clear();
	}
}
