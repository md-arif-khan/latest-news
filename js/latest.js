const navMenuAdded=()=>{
    const url='https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
    .then(res=>res.json())
    .then(data=>DisplayMenu(data.data.news_category))
}
navMenuAdded()
const DisplayMenu=categorys=>{
    const navId=document.getElementById('navId')
   for (const category of categorys) {
    console.log(category.category_name)
    const li =document.createElement('li')
    li.classList.add('nav-item','ms-5','ps-2')
        li.innerHTML=`
        <p>${category.category_name}</p>
        
        `
        navId.appendChild(li)
   }

}
