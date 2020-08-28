const puppeteer = require('puppeteer');
const fs = require('fs'); 
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/my_little_sensor/');

  const imgList = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('article img')
      //toda essa função será executada no Browser

      //vamos pegar todas as imagens da pagina de post

      //transformar o nodeList em Array
      const imgArray = [...nodeList]

      //tranformar os elementos html em elementos JS
      const imgList = imgArray.map( img => ({
          src: img.src
      }))
      return imgList
  });

  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
      if (err) throw new Error('Alguma coisa deu em merda') 

      console.log('Certinho!')
  })
 
  await browser.close();
})();