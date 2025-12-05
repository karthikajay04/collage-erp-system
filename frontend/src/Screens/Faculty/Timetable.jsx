import axios from "axios";
import React, { useEffect, useState ,useCallback} from "react";
import { FiUpload, FiEdit, FiTrash2 } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase/config";
import { baseApiURL } from "../../baseUrl";
const Timetable = () => {
  const [addselected, setAddSelected] = useState({
    // branch: "",
    semester: "",
    link: "",
  });
  const [file, setFile] = useState();
  const [timetables, setTimetables] = useState([]);
  const [editing, setEditing] = useState(null);
  // const [branch, setBranch] = useState();

  const fetchTimetables = () => {
    axios
      .post(`${baseApiURL()}/timetable/getTimetable`, {})
      .then((response) => {
        setTimetables(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTimetables();
  }, []);
  const addTimetableHandler = useCallback(() => {
    toast.loading("Adding Timetable");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/timetable/addTimetable`, addselected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setAddSelected({
            // branch: "",
            semester: "",
            link: "",
          });
          setFile("");
        } else {
          console.log(response);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  }, [addselected]);

  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Upload Timetable To Server");
      const storageRef = ref(
        storage,
        `Timetable/Semester ${addselected.semester}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          // toast.error("Something Went Wrong!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Timetable Uploaded To Server");
            setAddSelected({ ...addselected, link: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [file,addselected]);

  const deleteTimetableHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this timetable?")) {
      toast.loading("Deleting Timetable");
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .delete(`${baseApiURL()}/timetable/deleteTimetable/${id}`, {
          headers: headers,
        })
        .then((response) => {
          toast.dismiss();
          if (response.data.success) {
            toast.success(response.data.message);
            fetchTimetables();
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

  const editTimetableHandler = (timetable) => {
    setAddSelected({
      semester: timetable.semester,
      link: timetable.link,
    });
    setEditing(timetable._id);
  };

  const updateTimetableHandler = () => {
    toast.loading("Updating Timetable");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/timetable/updateTimetable/${editing}`, addselected, {
        headers: headers,
      })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setAddSelected({
            semester: "",
            link: "",
          });
          setEditing(null);
          fetchTimetables();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  // const getBranchData = () => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   axios
  //     .get(`${baseApiURL()}/branch/getBranch`, { headers })
  //     .then((response) => {
  //       if (response.data.success) {
  //         setBranch(response.data.branches);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error(error.message);
  //     });
  // };

  return (
    <div className="w-[85%] mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Upload Timetable`} />
      </div>
      <div className="w-full flex justify-evenly items-center mt-12">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <p className="mb-4 text-xl font-medium">Add Timetable</p>
          {/* <select
            id="branch"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
            value={addselected.branch}
            onChange={(e) =>
              setAddSelected({ ...addselected, branch: e.target.value })
            }
          >
            <option defaultValue>-- Select Branch --</option>
            {branch &&
              branch.map((branch) => {
                return (
                  <option value={branch.name} key={branch.name}>
                    {branch.name}
                  </option>
                );
              })}
          </select> */}
          <select
            onChange={(e) =>
              setAddSelected({ ...addselected, semester: e.target.value })
            }
            value={addselected.semester}
            name="semester"
            id="semester"
            className="px-2 bg-blue-50 py-3 rounded-sm text-base w-[80%] accent-blue-700 mt-4"
          >
            <option defaultValue>-- Select Semester --</option>
            <option value="1">1st Sem</option>
            <option value="2">2nd Sem</option>
            <option value="3">3rd Sem</option>
            <option value="4">4th Sem</option>
            <option value="5">5th Sem</option>
            <option value="6">6th Sem</option>
            <option value="7">7th Sem</option>
            <option value="8">8th Sem</option>
          </select>
          <div className="w-[80%]">
            <label htmlFor="link" className="leading-7 text-sm ">
              Enter Timetable Image URL
            </label>
            <input
              type="text"
              id="link"
              value={addselected.link}
              onChange={(e) => setAddSelected({ ...addselected, link: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {editing ? (
            <button
              className="bg-green-500 text-white mt-8 px-4 py-2 rounded-sm"
              onClick={updateTimetableHandler}
            >
              Update Timetable
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white mt-8 px-4 py-2 rounded-sm"
              onClick={addTimetableHandler}
            >
              Add Timetable
            </button>
          )}
        </div>
      </div>
      <div className="w-full mt-12">
        <h2 className="text-xl font-semibold mb-4">Uploaded Timetables</h2>
        {timetables.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timetables.map((timetable) => (
              <div key={timetable._id} className="border border-blue-200 rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-medium">Semester {timetable.semester}</h3>
                <a
                  href={timetable.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Timetable
                </a>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => editTimetableHandler(timetable)}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteTimetableHandler(timetable._id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No timetables uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Timetable;
