import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../categoria.service';
import { Categoria } from '../categorial.model';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css'],
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    id: '',
    name: '',
    description: '',
  };

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria.name = resposta.name;
      this.categoria.description = resposta.description;
    });
  }

  update(): void {
    this.service.update(this.categoria).subscribe(
      (resposta) => {
        this.router.navigate(['categorias']);
        this.service.mensagem('Categoria Atualizada com sucesso!!😁');
      },
      (err) => {
        this.service.mensagem(
          'Validar se todos os campos estão preenchidos corretamente!'
        );
      }
    );
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
