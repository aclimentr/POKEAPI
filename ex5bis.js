const arrayPokemons = [];
let main$$ = document.querySelector("main")
const input$$ = document.querySelector("input")

const getAllPokemons = async () => {
    for(let i = 1; i <= 151; i++){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        const result = await response.json();
        arrayPokemons.push(result);
    }
    // console.log(arrayPokemons)
    return arrayPokemons;
}
// console.log(arrayPokemons);
const mapPokemons = (pokemons) => {
    return pokemons.map((results) => ({
        nombre: results.name,
        foto: results.sprites.front_default
    }))

}
const printPokemons = (pokemons) => {
    main$$.innerHTML= ""
    for (const drawpokes of pokemons) {
        const characterDiv$$ =  document.createElement("div")
        characterDiv$$.innerHTML = `
            <h2>${drawpokes.nombre}</h2>
            <img src="${drawpokes.foto}" alt = "${drawpokes.nombre}">
        `;
        main$$.appendChild(characterDiv$$);
    }
}
const drawInput = (mapingpokes) => {
    input$$.addEventListener("input", () =>searchCaracters(input$$.value, mapingpokes))
    }

const searchCaracters = (filtro, pokemons) => {
    let filteredcharacters = pokemons.filter((pokemon)=>pokemon.nombre.toLowerCase().includes(filtro.toLowerCase())) 
    printPokemons(filteredcharacters)
}

const init = async () => {
    const pokemons = await getAllPokemons();
    const mapingpokes = mapPokemons(pokemons);
    // console.log(mapingpokes)
    printPokemons(mapingpokes);
    drawInput(mapingpokes);
}
init();
