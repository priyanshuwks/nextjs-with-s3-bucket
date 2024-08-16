"use server";

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

export async function onSubmit(formData : FormData){
    try{
        //create a new S3 client
        const client = new S3Client({
            region : process.env.AWS_REGION
        })

        //it will return url, policy & signature which is required by browser/client
        //to upload the file to aws s3.
        const {url, fields} = await createPresignedPost(client, {
            Bucket : process.env.AWS_BUCKET_NAME || '',
            Key : nanoid()
        })
        
        //policy & signature received from aws s3 should be passed from client when
        //making post request for file upload. So create formDataS3.
        const formDataS3 = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
            formDataS3.append(key, value)
        })

        //add the file to be uploaded to formDataS3
        formDataS3.append('file', formData.get('file') as string);

        const response = await fetch(url , {
            method : 'POST',
            body : formDataS3
        })

        //the response sent in form of xml. So let's convert
        //it to text
        const textResponse = await response.text();

        if(response.ok){
            console.log('File Uploaded')
        }else{
            console.log('some error occured during the file upload')
        }


       
    }catch(err){
        console.log('error has occured:', err);
    }
}