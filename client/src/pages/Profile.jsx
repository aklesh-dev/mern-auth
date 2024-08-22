import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [image, setImage] = useState(undefined);
  const [imgProgress, setImgProgress] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [formData, setFormData] = useState({});



  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (img) => {
    // console.log(img)
    if (!img) {
      console.error("No image provided");
    }
    const storage = getStorage(app);
    const imageName = new Date().getTime() + img.name;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgProgress(Math.round(progress));
        // console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        setImgError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, profilePicture: downloadURL })
          });
      }
    );
  };



  return (
    <section className="md:w-2/4 mx-auto py-6 rounded-3xl bg-slate-200 mt-3 shadow-md">
      <h1 className="text-bold text-center text-2xl font-serif pt-2 ">Profile</h1>
      <form action="" className='flex flex-col mt-6 mb-7 gap-4 md:w-2/4 px-2 mx-auto'>
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="img"
          onClick={() => fileRef.current.click()}
          className="w-20 h-20 self-center cursor-pointer object-cover rounded-3xl hover:shadow-lg "
        />
        <p className='text-center'>
          {imgError
            ? (<span className="text-red-500 text-sm">Error uploading image</span>)
            : (imgProgress > 0 && imgProgress < 100
              ? <span className="text-sm">{`Uploading: ${imgProgress} %`}</span>
              : (imgProgress === 100
                ? <span className="text-green-500 text-sm">Image uploaded successfully</span>
                : ""
              )
            )
          }
        </p>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        <input defaultValue={currentUser.username} type="text" placeholder='Username' id='username' className='p-2 bg-slate-100 rounded-lg' />
        <input defaultValue={currentUser.email} type="email" placeholder='Email' id='email' className='p-2 bg-slate-100 rounded-lg' />
        <input type="password" placeholder='Password' id='password' className='p-2 bg-slate-100 rounded-lg' />
        <button className="bg-slate-600 p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 text-white">update</button>
      </form>
      <div className="flex justify-between mt-5 px-2 md:w-2/4 mx-auto">
        <span className="text-red-600 opacity-90 hover:opacity-100 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </section>
  )
}

export default Profile;