import React from 'react';
import { Editor } from '@tinymce/tinymce-react' //read documentation for more info
import { Controller } from 'react-hook-form';
import conf from '../conf/conf.js';

// name=>naam kya h, control=> y react-hook-form s aata h and yhi control responsible h iski saari state vgera ko us form m le jaane k liye yh toh abhi component h and is component se form m and yh "control" kb pass kroge jb is RTE ko use krenge hum vha pr 
export default function RTE({ name, control, label, defaultValue = "" }) {

    return (
        /* 
        We could have done directly like this as well but problem y h ki aapka editor separate jagah pr designed h as a separate component and fr ise khi na khi use bhi toh kroge khi form m, khi post form m khi na khi toh use krenge hi toh vha se mainly mudda y h ki hume reference kese iska milega vo ek intresting chiz h us liy kya h ki hum react form usey kr rh h...we could have done same thing with Forward hook as well...but is tarah k hum kaam krenege toh hume pdhna pdega about "Controller" and yh hume react-hook-form se milta h
             <Editor
             initialValue='default value'
             init={
                 {
                     branding:false,
                     height:500,
                     menubar:true,
                     plugins:[
                         'advlist autolink lists link..................' 
                     ],
                     toolbar:'undo redo | formatselect etc....'
                 }
                 }
         />*/

        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller  //yh pure control pass krega yha se khi or
                name={name || "content"} //agr name pass kra h toh name leleha nhi toh humne cotnent string de di
                control={control} //yh control dega parent element ko, jo bhi parnt element isko call krega hum usko as it is aise hi pass kredenge taai vo pura control lepaye ..jitne bhi events ho rh h iski state kya h , iski values kya h, iska data kya h vo aise k aise hi le paye
                //    next sikahega ki elements render kese krte h
                render={({ field: { onChange } }) => ( //field pr event lgaya "onChange"
                    <Editor
                        const apiKey={conf.rteapiKey}
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange} //editor m kuch bhi chnage ho toh humara field jo h vo govern ho rhe h onChnage se
                    />
                )}


            />
        </div>
    )
}
