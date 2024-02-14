import conf from '../conf/conf.js' //step 1 since we'll need "Apiendpoint" and "project id" so imported conf

import { Client, ID, Databases, Storage, Query } from "appwrite"; //step 2 copy this line from documentation ..."Query" isliye ki we can write custom queries

// Step 3  creating class
export class Service {
    client = new Client();
    databases;
    bucket; //aka storage

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // to make a post we can use this
    /**
     *  
        const promise = databases.createDocument(
            '<DATABASE_ID>',
            '<COLLECTION_ID>',
            ID.unique(),
            { "title": "Hamlet" }
        );

        but we will make slight chnage in ID.unique() we can us documnt id as well but we will use something else (slug)
        { "title": "Hamlet" } this is our post
     */
    /* 
        * slug->    we need this for jo bhi yh service use krega and we have alrady defined slug
        * content-> that we will give jo bhi hume save krwana h
        * featuredImage -> how will we get this ?..iske liye bhi ek method bnega storage ka..
    */
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  //in place of ID.unique()
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }

    /**
     * slug-> giving this inplace of "documentId" id jiske basis hum post ko identify krkr update krenge
     * userId-> ki zaruart nhi h since hum us user ko hi update krne ki permission denge jo loggd in and usi ki post h
     */
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { //this is the object that we want to update isme hum ya toh new value denge ya fr purani toh denge hi 
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

            return true; //kuch handle krna hoga front end m based on if item delete then then do this but to drtmine if it is deleted or not we need to return true or false 
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);

            return false;
        }
    }

    //get single post
    async getPost(slug) {
        try { //returning single post
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug //instead of document id
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false
        }
    }

    // Get ALL POSTS
    //get all posts we will give here one default value and whenver we will call this method thn we will not need to pass any parameter as we have passed default value here
    //and we will pass one Query that says return all posts which has "status" as "active"
    /*
        *queries = [Query.equal("status", "active")]  
        queries-> u can give any name
        key="status"
        value="active"
        We can give multiple quries that why we have wrote inside array [Query.equal("status", "active")]  
        u have to define a key if u want to use them inside query , so we have defined key as "status" inside "indexes"
    */
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries, // u could hav given [Query.equal("status", "active")] but we have already stored inside a variable so wrote that variable directly
                //100   -> kitne pagination chahiye
                //0     -> kitne values chahiye
                // createdAt -> ... yh sb available hote h we need to read documentation
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error ", error);
            return false;
        }
    }


    // File upload service ( in future do this in separate file)


    // uploadFile(file) returns "id" and we will pass this "id" when we call this createPost()
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file //same parameter from uploadFile u can put here
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error);

            return false;
        }
    }

    //get file preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

// Step4 creating object with name "service"
const service = new Service();

// Step 5 export object
export default service;
