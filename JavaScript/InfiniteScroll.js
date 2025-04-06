//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infinite Scrolling</title>
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <div class="container"></div>
    <script src="script.js"></script>
</body>
</html>


//script.js
const container = document.querySelector(".container");

function loadImages(numImages = 10) {
  let i = 0;
  while (i < numImages) {
    const element = document.createElement("img");
    element.src = `https://picsum.photos/id/${i}/200/300`;
    container.appendChild(element);
    i++;
  }
}

function handleScroll() {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    loadImages();
  }
}

window.addEventListener("scroll", handleScroll);

loadImages();

//styles.css
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
img {
    margin: 5px;
    width: 400px;
    height: 400px;
}
