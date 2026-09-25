import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
    throw new Error('No se encontró el contenedor #app');
}

app.innerHTML = `
    <main class="app">
        <h1>Galaxy Universe</h1>
        <p>Proyecto base preparado.</p>
    </main>
`;