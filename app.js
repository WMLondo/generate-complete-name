const origenNombre = document.getElementById("origenNombre");
const generoNombre = document.getElementById("generoNombre");
const displayParent = document.getElementById("displayParent");
const cantidadGenerar = document.getElementById("cantidadGenerar");
const buttonGenerar = document.getElementById("buttonGenerar");

window.addEventListener("keypress", function(event){
  if (event.key == 'Enter'){ 
      event.preventDefault();
  }
});

function GenerateName(array,selectRegion,selectName){
  let datasselect = [];
  for (let i = 0; i < array.length; i++) {
    if (
      array[i].region ==
      selectRegion.options[selectRegion.selectedIndex].value
    ) {
      datasselect = array[i];
      break;
    }
  }
  const newName = document.createElement("p");
  newName.className = "display-data";
  newName.id = "displayData";
  if (selectName.options[selectName.selectedIndex].value == "male"){
    for(let i=0;i < 2;i++){
      /*Get Males Names*/
      newName.textContent += `${datasselect.male[GetRandom(datasselect.male.length)]} `;
    }
  } else {
    for(let i=0;i < 2;i++){
      /*Get Females Names*/
     newName.textContent += `${datasselect.female[GetRandom(datasselect.female.length)]} `;
    }
  }

  /*Get Surnames*/ 
  for(let i=0;i< 2;i++){
    newName.textContent += `${datasselect.surnames[GetRandom(datasselect.surnames.length)]} `;
  }
  displayParent.appendChild(newName);
}

function GetRandom(max){
  return Math.floor(Math.random() * max);
} 

function DeleteLastDatas(parent){
  console.log(parent.children.length);
  if(parent.children.length > 0)
  {
    while(parent.firstChild){
      parent.removeChild(parent.lastChild);
    }    
  }
}

cantidadGenerar.addEventListener("blur", (validation) => {
  if (cantidadGenerar.value == "" || cantidadGenerar.value == "0") {
    Swal.fire({
      icon: "error",
      title: "Cantidad no indicada",
      text: "La cantidad generada no puede ser 0 o vacia",
    });
    cantidadGenerar.value = 1;
  }
});

buttonGenerar.addEventListener("click", function GenerarFetch() {
  fetch("https://wmlondo.github.io/generate-complete-name/names.json")
    .then(function (response) {
      if (response.ok) return response.json();
      else throw error(response.statusText);
    })
    .then(function (catching) {
      if (origenNombre.options[origenNombre.selectedIndex].value != "none") {
        if (generoNombre.options[generoNombre.selectedIndex].value != "none") {
          DeleteLastDatas(displayParent);
          for(let i=0;i < parseInt(cantidadGenerar.value);i++){
            GenerateName(catching,origenNombre,generoNombre);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Genero no indicado",
            text: "Debes indicar el genero del Nombre",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Origen no indicado",
          text: "Debes indicar el origen del Nombre",
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

