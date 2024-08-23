import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../features/user/userSlice';

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const [image, setImage] = useState(undefined);
  const [imgProgress, setImgProgress] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSucess, setUpdateSucess] = useState(false);



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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        },
      );

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      };
      dispatch(updateUserSuccess(data)); 
      setUpdateSucess(true);     
      
    } catch (error) {
      dispatch(updateUserFailure(error));
    };
  };





  return (
    <section className="md:w-2/4 mx-auto py-6 rounded-3xl bg-slate-200 mt-3 shadow-md">
      <h1 className="text-bold text-center text-2xl font-serif pt-2 ">Profile</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col mt-6 mb-7 gap-4 md:w-2/4 px-2 mx-auto'>
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="img"
          onClick={() => fileRef.current.click()}

          className="w-20 h-20 self-center cursor-pointer object-cover rounded-full hover:shadow-lg "
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
        <input onChange={handleChange} defaultValue={currentUser.username} type="text" placeholder='Username' id='username' className='p-2 bg-slate-100 rounded-lg' />
        <input onChange={handleChange} defaultValue={currentUser.email} type="email" placeholder='Email' id='email' className='p-2 bg-slate-100 rounded-lg' />
        <input onChange={handleChange} type="password" placeholder='Password' id='password' className='p-2 bg-slate-100 rounded-lg' />
        <button className="bg-slate-600 p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 text-white">{loading ? "loading...": "update"}</button>
      </form>
      <div className="flex justify-between mt-5 px-2 md:w-2/4 mx-auto">
        <span className="text-red-600 opacity-90 hover:opacity-100 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
      <p className='text-red-600 mt-5 text-center'>{error && "Something went wrong!"}</p>
      <p className='text-green-600 mt-5 text-center'>{updateSucess && "User profile updated successfully!"}</p>
    </section>
  )
}

export default Profile;