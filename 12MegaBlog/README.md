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

