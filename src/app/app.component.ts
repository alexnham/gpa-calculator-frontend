import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiUrl = environment.apiUrl;
  apiUrl2 = environment.apiUrl2;
  selectedFile: File | null = null;
  result: any = null;
  uploading = false;
  error: string | null = null;

  constructor(private http: HttpClient, private zone: NgZone) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.error = null;
    this.result = null;

    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      this.error = 'Please select a PDF file.';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
  }

  async uploadFile() {
    if (!this.selectedFile) {
      this.error = 'No file selected.';
      return;
    }

    const form = new FormData();
    form.append('file', this.selectedFile, this.selectedFile.name);

    this.zone.run(() => {
      this.uploading = true;
      this.error = null;
      this.result = null;
    });

    try {
      const res = await lastValueFrom(this.http.post<any>(this.apiUrl, form));
      const res2 = await lastValueFrom(this.http.post<any>(this.apiUrl2, form));

      this.zone.run(() => {
        this.result = res;
        this.result.additionalData = res2;
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.error = err?.error?.message || err?.message || 'Upload failed';
      });
    } finally {
      this.zone.run(() => {
        this.uploading = false;
      });
    }
  }
}
