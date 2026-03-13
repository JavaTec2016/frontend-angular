import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {
  features = [
    {
      symbol: '#',
      title: 'Caracteristica 1',
      description: 'Es muy bueno.'
    },
    {
      symbol: '#',
      title: 'Caracteristica 2',
      description: 'a lo mejor inhackeable.'
    },
    {
      symbol: '#',
      title: 'caracteristica 3',
      description: 'De verdad es muy bueno.'
    },
    {
      symbol: '#',
      title: 'caracteristica 4',
      description: 'javascrip en tiempo real.'
    },
  ];
}