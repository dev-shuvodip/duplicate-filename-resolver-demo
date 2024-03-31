import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableDataSource } from '@angular/material/table';
import { IFile, getUniqueFileName } from 'duplicate-filename-resolver';
import 'zone.js';

var Attachments: IFile[] = [];

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './demo.html',
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ],
})
export class App {
  files: File[] = [];
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<IFile>(Attachments);

  onFileSelected(event: any): void {
    this.files = [];
    this.files = [...event.target.files];
    this.files.forEach((file) => {
      try {
        Attachments.push({
          name: getUniqueFileName(Attachments, file.name),
          file: file,
        });
        console.log(Attachments);
        this.dataSource = new MatTableDataSource<IFile>(Attachments);
      } catch (error) {
        console.error(error);
      }
    });
  }

  clearFiles() {
    Attachments = [];
    this.dataSource = new MatTableDataSource<IFile>([]);
  }
}

bootstrapApplication(App, {
  providers: [provideAnimationsAsync()],
});
