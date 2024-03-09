import { useEffect, useState } from "react";
import AdminLayout from "../../components/adminLayout"
import { getUsers } from "../../apis/auth/userApi";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    getUsers()
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  };


  return (
    <>
      <AdminLayout>
        <h1 className="mb-5 p-5 text-xl">Users</h1>
        <div role="tablist" className="tabs tabs-lifted">
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Users" defaultChecked />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Sn</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>isDoctor</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    users && users.map((user, index) => {
                      return (
                        <tr key={user._id}>
                          <th>{index + 1}</th>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${user.pic}`} onError={(e) => e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{user.name}</div>
                                <div className="text-sm opacity-50">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {user.role}
                          </td>
                          <td>{user.isDoctor ? "Yes" : "No"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th>Sn</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>isDoctor</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default UsersList