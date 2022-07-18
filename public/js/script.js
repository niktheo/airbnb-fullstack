//let galpic = document.querySelectorAll('.galpic')
//let bigpic = document.querySelectorAll('.bigpic')

//console.log(bigpic)
const renderPic = photo => {
  console.log(photo.src)
  let bigimg = document.querySelector('.bigpic')

  //console.log(bigimg)
  bigimg.src = photo.src
}
