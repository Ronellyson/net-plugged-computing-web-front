import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-data-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-data-button.component.html',
  styleUrls: ['./delete-data-button.component.scss']
})
export class DeleteDataButtonComponent {
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {}

  deleteAppDataLocalStorage() {
    const confirmation = window.confirm('Tem certeza de que deseja excluir todos os dados? Esta ação não pode ser desfeita');
    if (confirmation) {
      const keys: string[] = [
        'questionAnswers',
        'completedPhases',
        'questionErrors',
      ];

      // Remove os itens do localStorage
      keys.forEach((key) => localStorage.removeItem(key));

      this.router.navigate(['start']);
      this.toastr.success('Todos dados apagados com sucesso!');
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    }
  }
}
