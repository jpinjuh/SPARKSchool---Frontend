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
   title.innerHTML = 'Title';

   const image = crEl('img');
   article.appendChild(image);
   image.setAttribute('class', 'image');
   image.setAttribute('src', 'https://cdn.vox-cdn.com/thumbor/JDCeC5UoVn024wUnj6JVq4iBqcg=/0x0:1000x555/1200x800/filters:focal(420x198:580x358)/cdn.vox-cdn.com/uploads/chorus_image/image/60067105/the_last_of_us.0.png');

   const content = crEl('p');
   article.appendChild(content);
   content.setAttribute('class','content');
   content.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam sint, explicabo deleniti tenetur iste necessitatibus minus exercitationem aspernatur aut dolorum!'

   const link = crEl('a');
   article.appendChild(link);
   link.setAttribute('href','https://spark.ba');
   link.innerHTML = 'Read more';
}