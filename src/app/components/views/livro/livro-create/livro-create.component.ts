import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css'],
})
export class LivroCreateComponent implements OnInit {
  id_cat: String = '';
  livro: Livro = {
    id: '',
    title: '',
    name_author: '',
    text: '',
  };

  title = new FormControl('', [Validators.minLength(3)]);
  name_author = new FormControl('', [Validators.minLength(3)]);
  text = new FormControl('', [Validators.minLength(10)]);

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Livro adicionado com sucesso!');
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.mensagem('Erro ao adicionar novo livro! Tente novamente');
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage(field: string) {
    let anyInvalid =
      this.title.invalid || this.name_author.invalid || this.text.invalid;

    if (this.title.invalid && field == 'title') {
      return 'O campo TITULO deve conter entre 3 e 100 caracteres!';
    }

    if (this.name_author.invalid && field == 'name_author') {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres!';
    }

    if (this.text.invalid && field == 'text') {
      return 'O campo TEXT deve conter entre 10 e 2.000.000 caracteres!';
    }

    if (anyInvalid && field == 'button') {
      return true;
    }

    return false;
  }
}
