import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select, RTE } from '../index';
import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; //kuki info chahiye hogi
import { Button } from '../index';

function PostForm({ post }) {
    // watch=>watching capabalities bhi deta h useForm, ki kisi bhi field ko continuolsy monitor krna h toh watching capabilites bhi milti h...aap kisi bhi form k saath watch lga skte h 
    //setValue=>kisi bhi form k andr koi value set krni h toh hum directly "value" likh kr nhi krte kuki hum react-hook-form use kr rh h , normal form use nhi kr rhe h toh react-hook-form m values ko aise hi set krte h
    //control=> kisi form ka aapko control chahiye toh as it is yh control hi hum as it is pass krenge RTE m toh vha se jo bhi syntax h toh hume uska control mil jaega
    //getValues=>jitne bhi form ki values aapko grab krni ho toh aap yha s l skte h 

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({ //useForm k andr hum object bhi pass kr skte h
        defaultValues: { //y vo values h jo hum use krenge
            // post kha se aaeaga. yh aaega jo bhi user click krega form m like  jb dit button pr click hoga toh post ki info toh lenege hi hum
            title: post?.title || '', //hum check krenge phle ki user yha pr edit krne aaya h ya nya post krne...agr edit/update krne h aaya h toh hum DB se purani value lenge agr nyi value h toh hum empty dekste h
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active', //by default active show kr rhe hum
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    /**
     * agr user n form submit krdia toh kya krna h ?
     * agr user n form submit kra h toh user n "data" toh dia hi hoga...humne dekha h ki react-hook-form h vha pr hume ek "data" mil jaata h as an object jo register krkr hum le lete h toh phl hum submit naam ka k form bnate h
     * ab 2 cases h .. ya toh post ki value h already..toh hume sirf update krna pdta h AGR value nhi h toh hum ek nyi entry create krenge  
    */
    const submit = async (data) => { //react-hook-forms m acchi baat yh h ki yh "data" accept krta h agr aap by default aise bnate toh bht mhnt lgti h
        console.log("data ", data);
        console.log("post ", post);
        console.log("userData ", userData);
        if (post) { //agr post h aapke pass toh hum sirf update hi toh krenege post..sbse phle hum update m file ko handle krenge and jiske liye uploadfile humne already bna rkha h 
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;//data hume access deta h images ka  vese toh ek array hota h and hum muliple imags bhi le skte h but hum is tarah se lenge i.e first image lenge,, agr image h toh appwrite use krkr uploadFile kro nhi toh null kro 

            if (file) {
                appwriteService.deleteFile(post.featuredImage); //purani file delete kr rhe after getting new file uploaded 
            }
            //ab hum krenge post ko update
            // sbse phle toh hum vha slug expect kr rh h jo h post ka id so we did "post.$id"
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data, //data ko spread krdo kuki field hi is tarah bnaeneg ki sara kaam ho jaega
                featuredImage: file ? file.$id : undefined, //lkin imag ko override krna padega
            });
            if (dbPost) { //agr dbPost aagya  h aapke pass m toh navigate krdo yha `/post/${dbPost.$id}`
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else { //agr post nhi h toh means new post creat kr rhe ho and kuch update krne ko nhi h 
            // sbse phl file upload krenge..again good practice
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data, //data ko isliye spread kra kuki hum createPost m userId bhi expect kr rhe h toh "data" object ko create kra
                    userId: userData.$id, //userData.$id means userId jo hum redux m se le rhe h
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    // slug transform ....askd in interviews
    // slugTransform kya krta h ...humar pass 2 input field h ek h "title" or dusra h "slug" or slugTansform jb bhi use kreoge toh "value" toh doge hi
    //"title" ko watch krna h or "slug" k andr value generate krni h or khi bhi user space deta h "title" me toh us space ko convert krna h "dash" m slug k andr toh vo replace se hojaega and hum vo regex m dekh lenege
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')
        }

        return '' //agr value nhi h toh hum empty string return krwa rhe h
    }, [])

    // using slugTransform ....kese slugTransform use krna h hi interview qustion h
    useEffect(() => {
        //watch hume react-hook-form se mila hota h toh hume yha bhi callback mila hota h
        const subscription = watch((value, { name }) => {
            if (name === 'title') { //value ek object h
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        });

        return () => { //yh retrn m jo humne unsubscib kra usse memory management ho jaat h isliye humneupr method ko vaiable m store ka and yha lakr unsusbscribe kr dia taaki vo aapn m hi ghumta na rhe  and yhi question pucha jaata h interview m 
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])
    //watch=> watch jiske saath bhi lga h uske saath..mtlb uske saath kuch bhi change aajae usko and yh kha lgega jses ki register m inputform m jha title value hogi usme  we'll see that 
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm