import {Router} from '@vaadin/router';

const router = new Router(document.querySelector('.root'));
router.setRoutes([
  {path: '/', component: 'home-el'},
  {path: '/signup', component: 'signup-el'},
  {path: '/login', component: 'login-el'},
  {path: '/greeting', component: 'greeting-el'},
  {path: '/welcome', component: 'welcome-el'},
  {path: '/room', component: 'room-el'},
  {path: '/connect', component: 'connect-el'},
  {path: '/chat', component: 'chat-el'}
]);