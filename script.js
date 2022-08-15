const button = document.querySelector(".getMealButton");
const body = document.querySelector("body");
const responseParent = document.querySelector(".responseParent");

const url = "https://www.themealdb.com/api/json/v1/1/random.php";
let gotMeal={};
let ingredient=[];
button.addEventListener("click", () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.meals)
      .then((gotMealPre) => {
        gotMeal = gotMealPre[0]
          console.log(gotMeal)
          for(i=1; i<=20; i++) { 
            if (gotMeal[`strIngredient${i}`]) {
            ingredient.push(gotMeal[`strIngredient${i}`] + " - " + gotMeal[`strMeasure${i}`])
            }
          }
         buildUI(gotMeal);
         
      })
      
})

const buildUI = (data) => {
  responseParent.innerHTML = "";
  const toTop = document.createElement("div");
  toTop.classList.add("toTop");
  const gotMealUI = document.createElement("div");
  gotMealUI.classList.add("gotMealUI");
  const UI = ` 
                <h1 class="gotMealHeader">${data.strMeal}</h1>
                <div class="gotMealPhotoParent">
                  <img src="${data.strMealThumb}" alt="Picture of ${data.strMeal}" class="gotMealPhoto">
                </div>
                <div class="textHolder">
                  <div class="ingredientAndFact">
                    <div class="fact">
                      <h4> <strong>></strong> Category: ${data.strCategory}</h4>
                      <h4> <strong>></strong> Area: ${data.strArea}</h4>
                      <h4> <strong>></strong> Tags: ${data.strTags}</h4>
                    </div> 
                    <div class="ingredientsParent">
                      <ul class="ingredients">
                        ${ingredient.map((ingredient) => `<li><p>${ingredient}</p></li>`).join(" ")}
                      </ul>
                    </div>
                  </div>
                  
                  <div class="instructionParent">
                    <h3 style="text-align:left">Instruction</h3>
                    <p class="instruction">
                      ${data.strInstructions}
                    </p>
                  </div>
                </div>
                <div class="videoRecipe">
                  <h3 style="text-align: certer;">Video Recipe</h3>
                  <iframe src="https://www.youtube.com/embed/${data.strYoutube.slice(-11)}?autoplay=1&mute=1" width="680" height="415"></iframe>
                </div>
              `
 gotMealUI.innerHTML = UI;
 toTop.innerHTML = `<a href="#"><i class="fas fa-circle-up"></i></a>`
 responseParent.append(gotMealUI, toTop);
};