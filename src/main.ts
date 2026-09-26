import './style.css';
import { App } from './App';

const appElement =
    document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
    throw new Error('No se encontró #app');
}

const app = new App(appElement);

app.start();