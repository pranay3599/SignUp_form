const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirmpassword");
let signupBtn = document.getElementById("signup");
let userData ={};
const generatedToken = generateToken();
function isAuthenticated(){
  return localStorage.getItem("accessToken") !== null;
}
function signUp(){
  const msg = document.getElementById("message");
  let name = fullName.value;
  let e = email.value;
  let pass = password.value;
  let cp = confirmPass.value;
  if(name === '' || e === '' || pass === '' || cp === '')
  {
      msg.innerHTML = `
        <p class="e-msg">Error : All the fields are mandatory </p>
      `;

      return;
  }
  else if(pass !== cp)
  {
      msg.innerHTML = `
        <p class="e-msg">Error: Password Not Matching, Please check!</p>
      `;
      return;
  }
  else if(pass.length < 6 || cp.length < 6)
  {
      msg.innerHTML = `
        <p class="e-msg">Error: Password must be 6 or more character long!</p>
      `;
  }
  else{
    msg.innerHTML = `
      <p class="s-msg">Successfully Signed Up!</p>
    `;

      fullName.value='';
      email.value='';
      password.value='';
      confirmPass.value = '';
    userData = {
      name: name,
      email: e,
      password: pass,
      accessToken: generatedToken,
    }
    localStorage.setItem('userData', JSON.stringify(userData));

    let timer = document.getElementById("timer");
    timer.innerHTML = `
     <p class="time">You will be redirecting in 2 seconds ...</p>
   `;
   
   setTimeout(() => {
       window.location.href = 'profile.html';
     }, 2000);
    }

}
function Profile(){
  if (isAuthenticated()){
    window.location.href = 'profile.html';
  }

  const userData = JSON.parse(localStorage.getItem('userData'));
  let name = document.getElementById("username");
  let em = document.getElementById("useremail");
  let p = document.getElementById("userpass");

   name.innerHTML =`${userData.name}`;
   em.innerHTML =`${userData.email}`;
   p.innerHTML =`${userData.password}`;


}  

function logout(){
  localStorage.removeItem('userData');
  window.location.href = 'index.html';
}
function generateToken(length=10){
  const tokens = new Uint8Array(length);
  crypto.getRandomValues(tokens);

  const token = Array.from(tokens, byte => byte.toString(16).padStart(2, '0')).join('');
  return token;
}