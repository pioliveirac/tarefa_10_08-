async function buscarFilmes() {
    // URL do seu backend implantado na Vercel
    const resposta = await fetch("https://tarefa-10-08-git-main-pietra-cavalcantis-projects.vercel.app/");
    const filmes = await resposta.json();
    const sectionFilmes = document.querySelector(".filmes");

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.nome}</h2>
                <p><strong>Gênero:</strong> ${filme.genero}</p>
                <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.classificacao}</p>
            </div>
        `;
    });
}

buscarFilmes();