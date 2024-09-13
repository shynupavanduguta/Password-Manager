import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: '', username: '', pass: '' });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Fetch stored passwords from the server
  const getPassword = async () => {
    try {
      const req = await fetch("http://localhost:3000/");
      const storedPasswords = await req.json();
      setPasswordArray(storedPasswords); // No need to parse again
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {
    getPassword(); // Call to fetch passwords on mount
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    ref.current.src = isPasswordVisible
      ? "icons/wired-outline-69-eye-hover-blink.png"
      : "icons/wired-outline-69-eye-hover-cross.png";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save password to local state and server
  const savePassword = async () => {
    const newEntry = { ...form, id: uuidv4() };
    const updatedPasswords = [...passwordArray, newEntry];

    setPasswordArray(updatedPasswords); // Update local state
    localStorage.setItem('password', JSON.stringify(updatedPasswords)); // Save to localStorage

    try {
      const res = await fetch("http://localhost:3000/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (res.ok) {
        toast('Password added successfully', { theme: 'light' });
      } else {
        throw new Error('Failed to save password');
      }
    } catch (error) {
      toast('Error saving password', { theme: 'dark' });
    }
  };

  // Delete password from local state and server
  const deletePassword = async (id) => {
    const updatedPasswords = passwordArray.filter((password) => password.id !== id);
    setPasswordArray(updatedPasswords); // Update local state
    localStorage.setItem('password', JSON.stringify(updatedPasswords)); // Update localStorage

    try {
      const res = await fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast('Password deleted', { theme: 'dark' });
      } else {
        throw new Error('Failed to delete password');
      }
    } catch (error) {
      toast('Error deleting password', { theme: 'dark' });
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(i => i.id === id);
    setForm(passwordToEdit);
    deletePassword(id); // Optionally delete from list while editing
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard', { theme: 'light' });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <div className="p-2 md:p-0 md:mycontainer min-h-[80vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-700">&lt;</span>Pass
          <span className="text-green-700">Manager/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

        <div className="flex flex-col p-4 py-1 text-black gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter user ID"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.pass}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type={isPasswordVisible ? "text" : "password"}
                name="pass"
              />
              <span className="absolute right-[1px] top-[2px] cursor-pointer" onClick={togglePasswordVisibility}>
                <img ref={ref} className="p-1" width={30} src="icons/wired-outline-69-eye-hover-cross.png" alt="Toggle visibility" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className="flex justify-center items-center gap-4 bg-cyan-500 hover:bg-green-400 rounded-full px-8 py-2 w-fit">
            Add Password
          </button>
        </div>

        <div className="password">
          <h2 className="font-bold text-2xl py-2">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border border-white">
                      <div className="flex items-center justify-center text-center">
                        <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                        <div className="size-7 cursor-pointer" onClick={() => copyText(item.site)}>
                        <lord-icon
                                                style={{ width: "25px", height: "25px" }}
                                                src="https://cdn.lordicon.com/uecgmesg.json"
    trigger="hover"
    delay="1500"
    stroke="bold"
    // state="in-reveal"

                                            >
                                            </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center text-center">
                        {item.username}
                        <div className="size-7 cursor-pointer" onClick={() => copyText(item.username)}>  <lord-icon
                                                style={{ width: "25px", height: "25px" }}
                                                src="https://cdn.lordicon.com/uecgmesg.json"
    trigger="hover"
    delay="1500"
    stroke="bold"
    // state="in-reveal"

                                            >
                                            </lord-icon></div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center text-center">
                        {item.pass}
                        <div className="size-7 cursor-pointer" onClick={() => copyText(item.pass)}>  <lord-icon
                                                style={{ width: "25px", height: "25px" }}
                                                src="https://cdn.lordicon.com/uecgmesg.json"
    trigger="hover"
    delay="1500"
    stroke="bold"
    // state="in-reveal"

                                            >
                                            </lord-icon></div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <span className="cursor-pointer mx-2" onClick={() => editPassword(item.id)}><lord-icon
    src="https://cdn.lordicon.com/wuvorxbv.json"
    trigger="hover"
    delay="500"
    stroke="bold"
    // state="in-dynamic"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>
                      <span className="cursor-pointer mx-2" onClick={() => deletePassword(item.id)}><lord-icon
src="https://cdn.lordicon.com/hjbrplwk.json"
    trigger="hover"
    stroke="bold"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
