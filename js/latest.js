const navMenuAdded=()=>{
    const url='https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
    .then(res=>res.json())
    .then(data=>DisplayMenu(data.data.news_category))
    .catch(error => {
      throw(error);
  })
}
navMenuAdded()
const DisplayMenu=categorys=>{
    const navId=document.getElementById('navId')
   for (const category of categorys) {
 
    const li =document.createElement('li')
    li.classList.add('nav-item','ms-5','ps-2')
        li.innerHTML=`
        <p onclick="loadData('${category.category_id}')">${category.category_name}</p>
        
        `
        navId.appendChild(li)
   }
   
}

const loadData=(id)=>{
    
    const url=`https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCard(data.data))
    .catch(error => {
      throw(error);
  })
}
loadData('01')
const displayCard=(data)=>{
  
    const card=document.getElementById('card')
    card.innerHTML=''
    const showCategory=document.getElementById('howMuchCategory')
    showCategory.innerHTML=` 
    <p>${data.length?data.length +' '+ 'items found for this category':'No data Found'}</p>
    `
   if(data.length==0){
    const noData=document.getElementById('no-data')
    noData.classList.remove('d-none')
   }else{
    
    for (const item of data) {
    
        const rowDiv =document.createElement('div')
        
        rowDiv.classList.add('row','p-4','bg-white','mb-3')
        rowDiv.innerHTML=`
        <div class="col-md-4">
        <img style="background-size:cover" src="${item.image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p style="text-align:justifys" class="card-text">${item.details.slice(0,250)+'...'}</p>
          <div class="d-flex justify-content-between">
            <div class="d-flex">
             <img style="width:50px; height:50px; border-radius:50px" class="img-fluid" src="${item.author.img}" alt="Paris">
            <div class="ms-2 pt-1">
               <p style="font-size:12px" class="m-0">${item.author.name?item.author.name:'No data'}</p>
               <p style="font-size:12px" class="m-0">${item.author.published_date?item.author.published_date:'No data'}</p>
             </div>
             </div>
             <div class="d-flex align-content-center">
              <p><i class="fa-regular fa-eye pe-2"></i></p>
             <p>${item.total_view?item.total_view:'No data'}</p>
             </div>
             <div class="ps-2">
             <i class="fa-regular fa-star-half-stroke"></i>
             <i class="fa-regular fa-star"></i>
             <i class="fa-regular fa-star"></i>
             <i class="fa-regular fa-star"></i>
             <i class="fa-regular fa-star"></i>
             </div>
             <div>
             <i onclick="loadDetail('${item._id}')" class="fa-solid fa-arrow-right text-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
             </div>
          </div>
        </div>
        
        `
       card.appendChild(rowDiv)
    }
    const noData=document.getElementById('no-data')
    noData.classList.add('d-none')
   }
    
}
const loadDetail=(detail)=>{
  const url=`https://openapi.programming-hero.com/api/news/${detail}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayDetail(data.data[0]))
}
const displayDetail=(data)=>{
  console.log(data)
  const modalData=document.getElementById('modal-data')
  modalData.innerHTML= `
    <div class="card">
    <img style="height:250px;"  src="${data.author.img}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
      
      <p class="card-text fw-bold">${data.title}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="">Author Name:</span> ${data.author.name?data.author.name:'No Data'}</li>
      <li class="list-group-item">Total View: ${data.total_view?data.total_view:'No Data'}</li>
      <li class="list-group-item">Published:  ${data.author.published_date?data.author.published_date:'No data'}</li>
      
    </ul>
   
    </div>
  `
}