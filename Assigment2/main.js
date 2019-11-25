var doc = document,
    crEl = function(tagName) {
      return document.createElement(tagName);
    };

doc.title = 'Zadaća';

const mainDiv = crEl('div');
mainDiv.id = 'container';
doc.body.appendChild(mainDiv);

for(let i = 0; i < 5; i++){
   const article = crEl('div');
   mainDiv.appendChild(article);
   article.setAttribute('class', 'article');

   const title = crEl('h2');
   article.appendChild(title);
   title.setAttribute('class', 'title');
   title.innerHTML = `Title ${i+1}`;

   const image = crEl('img');
   article.appendChild(image);
   image.setAttribute('class', 'image');
   image.setAttribute('src', 'https://cdn.vox-cdn.com/thumbor/JDCeC5UoVn024wUnj6JVq4iBqcg=/0x0:1000x555/1200x800/filters:focal(420x198:580x358)/cdn.vox-cdn.com/uploads/chorus_image/image/60067105/the_last_of_us.0.png');

   const content = crEl('p');
   article.appendChild(content);
   content.setAttribute('class','content');
   content.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sint, explicabo deleniti tenetur iste necessitatibus minus exercitationem aspernatur aut dolorum!`

   const link = crEl('a');
   article.appendChild(link);
   link.setAttribute('href','https://spark.ba');
   link.innerHTML = `Read more`;
}

// ----- remove last element -----

// mainDiv.lastElementChild.remove();
// or
mainDiv.removeChild(mainDiv.lastElementChild);

// ----- remove duplicate elements -----
// mainDiv.childNodes[1].childNodes[0].innerHTML = 'Title 1'; // test for duplicate element

for(let i = 0; i < mainDiv.childNodes.length; i++){
  for(let j = i + 1; j < mainDiv.childNodes.length; j++){
      if (mainDiv.childNodes[i].isEqualNode(mainDiv.childNodes[j])){
          mainDiv.childNodes[j].remove();
      }
  }
}

// or

/* const items = {};
mainDiv.childNodes.forEach(key => {
    let itemText = key.innerHTML;
    if(!items[itemText]) items[itemText] = 0;
    items[itemText]++;
    if(items[itemText]>1){
       key.remove();
    }
}); */

//or

/* const newItems = Array.from(mainDiv.childNodes, x => x.textContent);
for(let i = 0; i < mainDiv.childNodes.length; i++){
  if(newItems.indexOf(mainDiv.childNodes[i].textContent) <= i){
    mainDiv.childNodes[i].remove();
  }
} */

//or

/* const newItems = Array.from(mainDiv.childNodes, x => x.textContent);
newItems.forEach((item, index) => {
  if(newItems.indexOf(item) !== index){
    mainDiv.childNodes[index].remove();
  }
}); */

// ----- replace first and last element -----
/* const replaced = mainDiv.replaceChild(mainDiv.lastElementChild, mainDiv.firstElementChild);
mainDiv.appendChild(replaced); */

// or shorter

//mainDiv.appendChild(mainDiv.replaceChild(mainDiv.lastElementChild, mainDiv.firstElementChild));  

// exercise
/* const articleArray = [1,23,4,5,7,8];
const first = articleArray.splice(0, 1, articleArray[articleArray.length -1]);
articleArray.splice(articleArray.length - 1, 1, first[0]);
console.log(articleArray); */

// ----- add link to penultimate element -----
const a = crEl('a');
a.setAttribute('href', 'https://www.google.com');
a.setAttribute('target', '_blank');
a.innerHTML = ' Added link';

mainDiv.lastElementChild.previousElementSibling.appendChild(a);

// ----- odd elements blue, even elements red -----
mainDiv.childNodes.forEach((item, index) => {
  (index % 2 === 0)
    ? item.style.backgroundColor = 'red'
    : item.style.backgroundColor = 'blue';
})

// ----- add css to head -----
const css = crEl('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'css/style.css');

doc.head.appendChild(css);