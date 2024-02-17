# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<!-- steps -->

<!-- 
step1-> npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form

step2-> set .env file with👇🏻

VITE__APPWRITE_URL="test environment"
VITE__APPWRITE_PROJECT_ID=""
VITE__APPWRITE_DATABASE_ID=""
VITE__APPWRITE_COLLECTION_ID=""
VITE__APPWRITE_BUCKET_ID=""  

Rules-> always set it in root folder, and after adding or updating anything in .env always re-run your app and add it to git ignore using right click on file and selecting "Add it to gitignore"


STEP 3 -> create a project in APPWRITE and froms setting copy projctid and API endpoint 

STEP 4 -> copy API ENDPOINT and projectid and paste in .env file
VITE__APPWRITE_URL and VITE__APPWRITE_PROJECT_ID

STEP 5 -> inside appwrite go to database and click on create database & give some name once got created copy database id and paste in .env file VITE__APPWRITE_DATABASE_ID

STEP 6 -> click on create collection(table) and give name ("articles" we have) and copy id and paste in VITE__APPWRITE_COLLECTION_ID present inside .env

STEP 7 -> inside collection("articles") go to settings and then update permission which means kon kon collction k andr likh skta h, read kr skta h etc that all permission we need to give here
    *click on "+ADD a role" and select all create,read,update,delete means ki jo ek br register ho jae vo hi
    iss collection m likh pae, means collection m create hone k bd jo users h vo hi CRUD kr pae

    Select "ALL users" and select CRUD

STEP 8 -> go to attributes section
-> create attribute...type "string"... attributeKey-> "title", size->"255" ,required->"checked"..and click on    
   create toh "title" attribute create hogya
-> create attribute...type "string"... attributeKey-> "content", size->"255" ,required->"checked"..and click on   create toh "content" attribute create hogya
->  create attribute...type "string"... attributeKey-> "featuredImage", size->"255" ,required->"checked"..and click on   create toh "featuredImage" attribute create hogya, why we choose featuredImage as string reason being
ki image toh jaegi khi or hum uska id lekr store yha krdenge whihc will be in string 
-> create attribute...type "string"... attributeKey-> "status", size->"255" ,required->"un checked"..and click on   create toh "status" attribute create hogya
->create attribute...type "string"... attributeKey-> "userId", size->"255" ,required->"checked"..and click on   create toh "userId" attribute create hogya

STEP 9 -> go to indexes section and click on create index (if it is not clickable then refresh page or go to db and thn collections and then go to index )

index key-> "status"
index type-> Key
attribute-> "status"
Order->"ASC"

u can select multiple attributes if u need more keys

STEP 10 -> go to STORAGE section and click on create bucket and give name "images"
we will keep all our images here
copy the bucket id and paste in VITE__APPWRITE_BUCKET_ID inside .env file

go to settings and then update permission which means kon kon buckets ko access kr skta h that all permission we need to give here
Select "ALL USER" and select all CRUD and in the end click on UPDATE

STEP 11 -> Handling env variables like the way they're handled in production
why we are doing this sometimes env variables do not load and then error comes so it becomes difficult to debug the error 
create a folder with name "conf" inside "src" and thn create a file "conf.js" and import all 
variables and convert them to string
 -->
<!-- --------------------------------------------------------------------------- -->


<!--                             STEP 2                                -->
<!--                  Build authentication service with appwrite       -->


STEP 1 : under "src" create a folder "appwrite" and inside that create one file "auth.js"

<!--                               STEP 3                                     -->
<!--                 Appwrite database, file upload and custom queries        -->

Blog k andr images bhi upload ho rhi h & DB k andr kuch collections m values bhi jaa rhi h
So we will create one more service howver it is always said that if u have storage(a.k.a storage) service then create that service in different file so that it can be reused But right now we will mix both but we can always restructure our app such that humari jo bucket services h unko alg nikal ske 

STEP 1 : under "src" and under a folder "appwrite" and inside that create one file    "config.js"


<!--                               STEP 4                                     -->
<!--                       configure redux toolkit                            -->
"src" k andr "store" folder rkha h and uske andr "store.js" create kra h
"src" k andr "store" folder rkha h and uske andr "authSlice.js" create kra h 
COMPONENTS creation starts: 
"src" k andr "components" folder create kra h and then under this created "Header" and "Footer" component and inside them we have Header.jsx ad Footer.jsx



<!--                               STEP 5                                     -->
<!--                       building react components                            -->
under "src" folder..create "pages" folder 

ste1-> created "container" folder inside "components" folder and inside that we created "container.jsx" 
ste2 footer ka cod just copy paste and import link and logo(first create logo compnent) 
step 3 Header...yh thodasa optional h means ki kya dikhana kya nhi..example logout sbko nhi dikhana only to persons who're logged in

Header folder k andr create "LogoutBtn.jsx" we did make completely thi compnent
Header.jsx k andr ki coding
Button.jsx ko bnakr ..hr jagah use krenge
input.jsx ko bnakr ..hr jagah use krenge (we discussed forwardRef() here)

Advance React interview question
forwardRef ka example->
we will create one login form
login form k andr alg input fields h & same input field hum username,password,email
sb jagah use krenge toh input compont alg h
login page khi or h
but input ki state ka access toh mujhe form m chhaiye toh hume refernce dena padega form k andr

<!--                                        STEP 6                                          -->
<!--                              use React hook form in production                         -->
-creating "Select.jsx" inside "src"->"componenents"
-creating PostCard.jsx inside "src"->"componenents"
    jb hum logged in rhte h toh hume cards dikh rhe the and that cards ko click krkr we can go thru whole blog, so that card is PostCard.jsx, ise hi click krkr hum iske andr jaenge
-Login.jsx
    we will use REACT HOOK FORM & we installed this earlier
    documntation: https://react-hook-form.com/

    register ...form handling krta h
    handleSubmit toh ek function h jo bnnana hi pdta h
-Signup.jsx
-AuthLayout.jsx-> y ek mechanism h ki kis tarah se pages ko ya routing ko protect kra jaata h 
it is like a container which will decide ki value show krni h ya nhi
Creatd an function with name "Protected"


<!--                                STEP 7                              -->
<!--                    Adding form and slug values                     -->

we'll discuss here about Real Time Editor, it is easy to use but there is one problem here as well. Till now we were making one InputBox separately and jb hum form bna rhe the tb hum inputBox ko le rhe the and jo humara hook h "Forward" waala vo seedhe seedhe kaam kr rha tha
i.e reference de rha tha parent k andr toh hume kuch krna hi nhi pdh rha tha sb kaam apne aap ho rha tha

Ab yha bhi humare pass same problem h ...jo RTE h vo toh ek separate component bnega ya toh usey aap wrap kro pure FORWARD waale hook k andr and fr aap uska  access lijiye BUT since here
we've reack-hook-form here also we have same technique but how to do that we will see here...

We'll design form intrestingly coz this same form, submit k bhi kaam aaega, edit k bhi kaam aaega, exactly same content hi toh h jb edit krna h toh saari values load krkr usey de do and nya create krna h toh empty values dedo and also we'll see about slug ki kese hum....also hum
useEffect ka example lenege and y example interview m bhi pucha jaata h

hum ek inputForm ko track krenge and uske basis pr ek slug ko design krenge...khi pr bhi ek space add krta h toh hum uske basis pr ek DASH add krdenge 

-RTE.jsx
-inside "component" folder create one more folder "post-form" and inside that create one more file "PostForm.jsx"

<!--                                                          STEP 8                                       -->
<!--                                                     Building pages                                    -->

-create Signup.jsx,Login.jsx,Addpost.jsx,AllPosts.jsx,EditPost.jsx,Home.jsx,Post.jsx  inside "pages" folder

-Routing
