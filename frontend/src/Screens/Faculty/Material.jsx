import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiUpload, FiEdit, FiTrash2 } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import { baseApiURL } from "../../baseUrl";

const Material = () => {
  const { fullname } = useSelector((state) => state.userData);
  const [subject, setSubject] = useState();
  const [file, setFile] = useState();
  const [materials, setMaterials] = useState([]);
  const [selected, setSelected] = useState({
    title: "",
    subject: "",
    link: "",
    faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
  });
  const [editing, setEditing] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchMaterials = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/material/getMaterial`, { faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2] }, { headers })
      .then((response) => {
        if (response.data.success) {
          setMaterials(response.data.material);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    toast.loading("Loading Subjects");
    axios
      .post(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.message);
      });
    fetchMaterials();
  }, [fullname]);

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      setIsUploading(true);
      toast.loading("Upload Material To Storage");
      const storageRef = ref(
        storage,
        `Material/${selected.subject}/${selected.title} - ${selected.faculty}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something Went Wrong!");
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Material Uploaded To Storage");
            setSelected({ ...selected, link: downloadURL });
            setIsUploading(false);
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [file, selected]);

  const addMaterialHandler = () => {
    toast.loading("Adding Material");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/material/addMaterial`, selected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setSelected({
            title: "",
            subject: "",
            link: "",
            faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
          });
          fetchMaterials();
        } else {
          console.log(response);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  const deleteMaterialHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      toast.loading("Deleting Material");
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .delete(`${baseApiURL()}/material/deleteMaterial/${id}`, {
          headers: headers,
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            fetchMaterials();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response?.data?.message || "Delete failed");
        });
    }
  };

  const editMaterialHandler = (material) => {
    setSelected({
      title: material.title,
      subject: material.subject,
      link: material.link,
      faculty: material.faculty,
    });
    setEditing(material._id);
  };

  const updateMaterialHandler = () => {
    toast.loading("Updating Material");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/material/updateMaterial/${editing}`, selected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setSelected({
            title: "",
            subject: "",
            link: "",
            faculty: fullname.split(" ")[0] + " " + fullname.split(" ")[2],
          });
          setEditing(null);
          fetchMaterials();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Upload Material`} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="w-[80%] mt-2">
            <label htmlFor="title">Material Title</label>
            <input
              type="text"
              id="title"
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
            />
          </div>
          <div className="w-[80%] mt-2">
            <label htmlFor="subject">Material Subject</label>
            <select
              value={selected.subject}
              name="subject"
              id="subject"
              onChange={(e) =>
                setSelected({ ...selected, subject: e.target.value })
              }
              className="px-2 bg-blue-50 py-3 rounded-sm text-base accent-blue-700 mt-1 w-full"
            >
              <option defaultValue value="select">
                -- Select Subject --
              </option>
              {subject &&
                subject.map((item) => {
                  return (
                    <option value={item.name} key={item.name}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="w-[80%] mt-4">
            <label htmlFor="file" className="leading-7 text-sm ">
              Upload Material File
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[80%] mt-4">
            <label htmlFor="link" className="leading-7 text-sm ">
              Or Enter Material File URL
            </label>
            <input
              type="text"
              id="link"
              value={selected.link}
              onChange={(e) => setSelected({ ...selected, link: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {editing ? (
            <button
              className="bg-green-500 text-white mt-8 px-4 py-2 rounded-sm"
              onClick={updateMaterialHandler}
              disabled={isUploading}
            >
              Update Material
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
              onClick={addMaterialHandler}
              disabled={isUploading}
            >
              Add Material
            </button>
          )}
        </div>
      </div>
      <div className="w-full mt-12">
        <h2 className="text-xl font-semibold mb-4">Uploaded Materials</h2>
        {materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((material) => (
              <div key={material._id} className="border border-blue-200 rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-medium">{material.title}</h3>
                <p className="text-sm text-gray-600">Subject: {material.subject}</p>
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Material
                </a>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => editMaterialHandler(material)}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteMaterialHandler(material._id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No materials uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Material;
