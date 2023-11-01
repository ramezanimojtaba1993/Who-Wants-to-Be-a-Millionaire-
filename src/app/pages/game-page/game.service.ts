import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GameStates, QuestionSheet } from '../../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getQuestionsSheet<T, U>(): Promise<any> {
    return new Promise<U>((resolve, reject) => {
      this.http.get<any>(`${this.baseUrl}/questionsSheet`)
        .subscribe({
          next: (v: any) => resolve(v),
          error: (e: any) => reject(e),
          complete: () => {},
        });
    });
  }

  createGameStates<T, U>(body: GameStates): Promise<any> {
    return new Promise<U>((resolve, reject) => {
      this.http.post<any>(`${this.baseUrl}/gameStates`, body)
        .subscribe({
          next: (v: any) => resolve(v),
          error: (e: any) => reject(e),
          complete: () => {},
        });
    });
  }

  get(id: string): Observable<QuestionSheet> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  public getGameState<T, U>(userId: number): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      this.http.get<U>(`${this.baseUrl}/gameStates?userId=${userId}`)
        .subscribe({
          next: (v: any) => resolve(v[0]),
          error: (e: any) => reject(e),
          complete: () => {},
        });
    });
  }

  public getCorrectAnswer<T, U>(questionId: number): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      this.http.get<U>(`${this.baseUrl}/answers?questionId=${questionId}`)
        .subscribe({
          next: (v: any) => resolve(v[0]),
          error: (e: any) => reject(e),
          complete: () => {},
        });
    });
  }

  public updateGameStates<T, U>(userId: number, body: GameStates): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      this.http.put<any>(`${this.baseUrl}/gameStates/${userId}`, body)
        .subscribe({
          next: (v: any) => resolve(v[0]),
          error: (e: any) => reject(e),
          complete: () => {},
        });
    });
  }
}
