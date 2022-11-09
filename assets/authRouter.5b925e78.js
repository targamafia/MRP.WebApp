import{u as w,r as t,a as C,j as e,b as a,N as h,O as P,R,c as r,F as I}from"./index.26f2a223.js";import{C as y,R as x,N as k}from"./404.32d2d385.js";const E=()=>{const{login:l}=w(),[i,f]=t.exports.useState(""),[g,b]=t.exports.useState(""),[c,d]=t.exports.useState(""),m=C(),u=o=>{const s=o=="email"?f:b;return N=>{d(""),s(N.target.value||"")}};return e("div",{className:"max-w-md",children:e(y,{padding:8,rounded:"lg",bg:"surface-1",children:a("div",{className:"text-main",children:[a("div",{className:"mb-8",children:[e("h1",{children:"Iniciar Sesi\xF3n"}),e("p",{children:"Te damos la bienvenida, por favor inicia sesi\xF3n"})]}),c!==""&&e("div",{className:"bg-surface-3 p-4 mb-4 rounded-md border border-solid border-error-50 text-error-60",children:c}),a("form",{onSubmit:async o=>{o.preventDefault();const s=await l(i,g);return s.error?d(s.error):m("/")},className:"text-left flex flex-col items-stretch gap-6 mb-16",children:[a("div",{className:"flex flex-col gap-4",children:[a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"email",className:"block",children:"Correo:"}),e("input",{id:"email",type:"email",onInput:u("email"),autoComplete:"email"})]}),a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"password",children:"Contrase\xF1a:"}),e("input",{id:"password",type:"password",onInput:u("password"),autoComplete:"password"})]})]}),e("input",{type:"submit",value:"Iniciar Sesi\xF3n",className:"px-8 py-2 bg-blue rounded-md cursor-pointer hover:bg-primary-40 mx-auto text-white"})]}),a("div",{className:"text-center",children:[e("p",{children:"No tienes una cuenta?"}),e(x,{spacing:8,justify:"center",children:e(h,{to:"/auth/signup",children:"Cr\xE9ala ahora"})})]})]})})})},A=()=>e("div",{className:"max-w-md",children:e(y,{padding:8,rounded:"lg",bg:"surface-1",color:"white",children:a("div",{className:"text-main text-center",children:[a("div",{className:"mb-16",children:[a("h1",{children:["MRP"," Administraci\xF3n"]}),e("p",{children:"Te damos la bienvenida, por favor inicia sesi\xF3n o crea una cuenta para continuar"})]}),a(x,{spacing:8,justify:"center",children:[e(h,{to:"/auth/login",children:"Iniciar Sesi\xF3n"}),e(h,{to:"/auth/signup",children:"Crear una Cuenta"})]})]})})}),L=()=>{const{signup:l}=w(),[i,f]=t.exports.useState(""),[g,b]=t.exports.useState(""),[c,d]=t.exports.useState(""),[m,u]=t.exports.useState(""),[F,o]=t.exports.useState(""),[s,N]=t.exports.useState(""),[T,S]=t.exports.useState(""),j=C(),n=v=>p=>{v(p.target.value||"")};return e("div",{className:"max-w-2xl w-full text-main",children:a(y,{padding:8,rounded:"lg",bg:"surface-1",color:"main",children:[a("div",{className:"mb-8",children:[e("h1",{children:"Crear una cuenta"}),e("p",{children:"Te damos la bienvenida, llena el formulario para crear tu cuenta"})]}),a("form",{onSubmit:async v=>{if(v.preventDefault(),m!=F)return S("Passwords don't match");const p=await l(i,g,c,m,s);return p.isSuccess?j("/"):S(p.error)},className:"text-left flex flex-col items-stretch gap-6 mb-16",children:[a(x,{spacing:8,items:"start",justify:"stretch",children:[a("div",{className:"flex flex-col gap-4 flex-grow",children:[a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"email",className:"block",children:"Correo:"}),e("input",{id:"email",type:"email",onInput:n(d),autoComplete:"email"})]}),a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"password",children:"Contrase\xF1a:"}),e("input",{id:"password",type:"password",onInput:n(u),autoComplete:"new-password"})]}),a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"confirmPassword",children:"Confirmar contrase\xF1a:"}),e("input",{id:"confirmPassword",type:"password",onInput:n(o),autoComplete:"new-password"})]})]}),a("div",{className:"flex flex-col gap-4 flex-grow",children:[a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"name",className:"block",children:"Nombre:"}),e("input",{id:"name",type:"text",onInput:n(f),autoComplete:"given-name"})]}),a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"lastName",className:"block",children:"Apellido:"}),e("input",{id:"lastName",type:"text",onInput:n(b),autoComplete:"family-name"})]}),a("div",{className:"flex flex-col gap-1",children:[e("label",{htmlFor:"password",children:"Compa\xF1ia:"}),e("input",{id:"company",type:"text",onInput:n(N),autoComplete:"organization"})]})]})]}),e("input",{type:"submit",value:"Crear cuenta",className:"px-8 py-2 bg-blue rounded-md cursor-pointer hover:bg-primary-40 mx-auto text-white"})]}),a("div",{className:"text-center",children:[e("p",{children:"Ya tienes una cuenta?"}),e(x,{spacing:8,justify:"center",children:e(h,{to:"/auth/login",children:"Inicia sesi\xF3n"})})]})]})})},O=()=>{const{token:l}=w(),i=C();return t.exports.useEffect(()=>{l&&i("/",{replace:!0})},[]),e("div",{className:"h-screen flex flex-row items-center justify-center p-16",children:e(P,{})})},B=()=>a(R,{children:[e(r,{path:"",element:e(I,{})}),a(r,{path:"auth",element:e(O,{}),children:[e(r,{path:"onboarding",element:e(A,{})}),e(r,{path:"login",element:e(E,{})}),e(r,{path:"signup",element:e(L,{})}),e(r,{path:"*",element:e(k,{})})]}),e(r,{path:"*",element:e(I,{})})]});export{B as default};
