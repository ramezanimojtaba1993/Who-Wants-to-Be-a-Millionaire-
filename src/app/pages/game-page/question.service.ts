import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { QuestionSheet } from '../../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://localhost:8000/questions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<QuestionSheet[]> {
    return this.http.get<any>(this.baseUrl);
  }

  get(id: string): Observable<QuestionSheet> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }

  public getCorrectAnswer<T, U>(questionId: number): Promise<U> {
    return new Promise<U>((resolve, reject) => {
      this.http.get<U>('http://localhost:8000/answers?questionId='+ questionId)
        .subscribe({
          next: (v: any) => resolve(v[0]),
          error: (e: any) => reject(e),
          complete: () => {},
        });
    });
  }

  create(question: QuestionSheet) {
    return this.http.post<any>(this.baseUrl, question);
  }

  update(id: string, question: QuestionSheet): Observable<QuestionSheet> {
    return this.http.put<any>(this.baseUrl + '/' + id, question);
  }

  delete(id: string) {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}
