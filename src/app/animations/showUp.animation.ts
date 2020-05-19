
import { query, stagger } from '@angular/animations';
import { trigger, transition, state, style, animate  } from '@angular/animations';


export const showUpStaggered = trigger('showUpCollection',[
    transition('* => *',[
        query(':enter',[
            style({opacity:0,transform: 'translateY(-100px)'}),
            stagger(200,[
                animate('300ms cubic-bezier(.17,.67,1,.61)',style({opacity: 1, transform:'none'}))
            ])
        ],{optional: true})
    ])

]);

export const showUp = trigger('showUpElement', [
    state('in',style({opacity: 1, transform:'scale(1)'})),
    transition(':enter',[
        style({opacity:0,transform:'scale(0)'}),
        animate(250)
    ])
]);
