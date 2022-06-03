
  const firebaseConfig = {
    apiKey: "AIzaSyDNcT9gOqgN6GhC9ay6kKXGUFUedFQ_cFo",
    authDomain: "samiullah-07.firebaseapp.com",
    projectId: "samiullah-07",
    storageBucket: "samiullah-07.appspot.com",
    messagingSenderId: "346378670613",
    appId: "1:346378670613:web:970d023adf7a222979f41c",
    measurementId: "G-8WPZ68SPSX"
  };

  firebase.initializeApp(firebaseConfig);
  

let ul = document.getElementById('ul')
function addData(){
  let text = document.getElementById('text');
  let key = firebase.database().ref('list').push().key;
  let list = {
    value : text.value,
    key : key 
  }
  firebase.database().ref('list/' + key).set(list)
  text.value = ''

}


firebase.database().ref('list').on('child_added',function(data){

  let li = document.createElement('li')
  let p = document.createElement('p')
  let pText = document.createTextNode(data.val().value)
  p.appendChild(pText)
  li.appendChild(p)
  
  let div = document.createElement('div')
  div.setAttribute('class','liParent')
  li.appendChild(div)

  let img1 = document.createElement('img')
  img1.setAttribute('src','./assert/edit.png')
  img1.setAttribute('onclick', 'EditData(this)')
  img1.setAttribute('id', data.val().key)
  
  let img2 = document.createElement('img')
  img2.setAttribute('src','./assert/remove.png')
  img2.setAttribute('onclick', 'removeData(this)')
  img2.setAttribute('id', data.val().key)
  
  let inp = document.createElement('input')
  inp.setAttribute('type', 'text')
  li.appendChild(inp)    
  inp.setAttribute('id', 'textinp')
  li.setAttribute('class','animate__animated animate__bounceInDown')

  div.appendChild(img1)
  div.appendChild(img2)
  li.appendChild(div)
  ul.appendChild(li)

})


function removeData(n){
   n.parentNode.parentNode.remove()
   firebase.database().ref('list/' + n.id).remove()
   
}


function EditData(n){
  let a = n.parentNode.parentNode.children[1]
  a.setAttribute('class','animate__animated animate__flipInX')
  if(a.style.display === 'none'){
    a.style.display = 'block'
  }else{
    a.style.display = 'none'
  }
  let b = n.parentNode.parentNode.firstChild
  let v = b.innerHTML = a.value  
  let xx = document.getElementById('textinp')
  xx.value = ''

  let list = {
    value : v,
    key : n.id 
  }
  firebase.database().ref('list/' + n.id).set(list)
  
}

function deleteData(){
  firebase.database().ref('list').remove()
  ul.innerHTML = ''
}

let a = document.getElementById('box')
window.onload = a.setAttribute('class','box animate__animated animate__zoomInDown')


























