import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DandelionService}  from "../../services/dandelion.service";

@Component({
  selector: 'app-token-config',
  templateUrl: './token-config.component.html',
  styleUrls: ['./token-config.component.css']
})

export class TokenConfigComponent implements OnInit{
  token: string = '';
  error: string = '';

  constructor(private router: Router, private dandelionService: DandelionService) {}
  ngOnInit(): void {
    const storedToken = localStorage.getItem('dandelionToken');
    if(storedToken){
      this.token = storedToken;
    }
  }


  saveToken() {
    console.log(this.token);
    this.error = '';
    this.dandelionService.validateToken(this.token).subscribe({
      next: () => {
        console.log('Token is valid');
        // Token is valid
        localStorage.setItem('dandelionToken', this.token);
        // this.router.navigate(['/entity-extraction']);
      },
      error: (error) => {
        // Token is invalid
        console.error('Token is INvalid');
        this.error = 'Invalid token. Please check and try again.';
        alert('Invalid token. Please check and try again.');
        localStorage.removeItem('dandelionToken');
      }
    });
  }
}
