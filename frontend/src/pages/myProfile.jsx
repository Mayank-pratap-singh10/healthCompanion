import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      // ✅ Fixed: was {header:{token}}, now correctly {headers:{token}}
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setIsEdit(false);
    setImage(false);
  };

  return (
    userData && (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

          .profile-root {
            font-family: 'DM Sans', sans-serif;
            min-height: 100vh;
            background: #f0f4f8;
            padding: 2.5rem 1rem;
          }

          .profile-wrapper {
            max-width: 780px;
            margin: 0 auto;
          }

          /* ── Header banner ── */
          .profile-banner {
            background: linear-gradient(135deg, #0369a1 0%, #0284c7 55%, #38bdf8 100%);
            border-radius: 20px 20px 0 0;
            height: 130px;
            position: relative;
            overflow: hidden;
          }
          .profile-banner::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }
          .banner-label {
            position: absolute;
            top: 1.2rem;
            left: 1.8rem;
            color: rgba(255,255,255,0.9);
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          .cross-icon {
            position: absolute;
            top: 1.1rem;
            left: 1.6rem;
            width: 22px;
            height: 22px;
            opacity: 0.8;
          }

          /* ── Main card ── */
          .profile-card {
            background: #fff;
            border-radius: 0 0 20px 20px;
            padding: 0 2.2rem 2.2rem;
            box-shadow: 0 8px 32px rgba(10, 110, 110, 0.10);
          }

          /* ── Avatar row ── */
          .avatar-row {
            display: flex;
            align-items: flex-end;
            gap: 1.4rem;
            margin-top: -46px;
            margin-bottom: 1.4rem;
          }
          .avatar-wrap {
            position: relative;
            width: 92px;
            height: 92px;
            flex-shrink: 0;
          }
          .avatar-img {
            width: 92px;
            height: 92px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #fff;
            box-shadow: 0 4px 14px rgba(0,0,0,0.13);
            display: block;
          }
          .avatar-img.edit-mode {
            opacity: 0.72;
            cursor: pointer;
          }
          .avatar-edit-badge {
            position: absolute;
            bottom: 4px;
            right: 4px;
            background: #0d9488;
            border: 2px solid #fff;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.18);
            transition: background 0.2s;
          }
          .avatar-edit-badge:hover { background: #0a6e6e; }
          .avatar-edit-badge svg { width: 13px; height: 13px; fill: #fff; }

          .avatar-info { padding-bottom: 6px; }
          .avatar-info h2 {
            font-family: 'DM Serif Display', serif;
            font-size: 1.45rem;
            color: #0f2d2d;
            margin: 0 0 2px;
            line-height: 1.2;
          }
          .avatar-info p {
            font-size: 0.82rem;
            color: #5a8a8a;
            margin: 0;
          }

          /* ── Section title ── */
          .section-title {
            font-family: 'DM Serif Display', serif;
            font-size: 1rem;
            color: #0a6e6e;
            margin: 1.6rem 0 0.9rem;
            padding-bottom: 0.4rem;
            border-bottom: 1.5px solid #e0f0ee;
            letter-spacing: 0.01em;
          }

          /* ── Field grid ── */
          .fields-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem 1.6rem;
          }
          @media (max-width: 560px) {
            .fields-grid { grid-template-columns: 1fr; }
          }

          .field-item label {
            display: block;
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #7aadad;
            margin-bottom: 0.35rem;
          }
          .field-item p {
            font-size: 0.92rem;
            color: #1a3a3a;
            font-weight: 500;
            margin: 0;
            padding: 0.55rem 0;
            border-bottom: 1px solid #eef4f4;
            min-height: 2.1rem;
          }
          .field-item input,
          .field-item select {
            width: 100%;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.92rem;
            color: #1a3a3a;
            padding: 0.55rem 0.75rem;
            border: 1.5px solid #b2d8d8;
            border-radius: 8px;
            background: #f7fbfb;
            outline: none;
            transition: border 0.18s, box-shadow 0.18s;
            box-sizing: border-box;
          }
          .field-item input:focus,
          .field-item select:focus {
            border-color: #0d9488;
            box-shadow: 0 0 0 3px rgba(13,148,136,0.12);
            background: #fff;
          }

          /* ── Action buttons ── */
          .btn-row {
            display: flex;
            gap: 0.75rem;
            margin-top: 2rem;
          }
          .btn-save {
            background: linear-gradient(135deg, #0a6e6e, #0d9488);
            color: #fff;
            border: none;
            padding: 0.65rem 1.8rem;
            border-radius: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(13,148,136,0.28);
            transition: transform 0.15s, box-shadow 0.15s;
          }
          .btn-save:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(13,148,136,0.36);
          }
          .btn-cancel {
            background: transparent;
            color: #5a8a8a;
            border: 1.5px solid #b2d8d8;
            padding: 0.65rem 1.4rem;
            border-radius: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.88rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
          }
          .btn-cancel:hover { background: #f0f8f8; color: #0a6e6e; }
          .btn-edit {
            background: transparent;
            color: #0d9488;
            border: 1.5px solid #0d9488;
            padding: 0.65rem 1.8rem;
            border-radius: 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.45rem;
            transition: background 0.15s, color 0.15s;
          }
          .btn-edit:hover { background: #e8f8f7; }
          .btn-edit svg { width: 15px; height: 15px; }

          /* ── Hidden file input ── */
          #avatar-upload { display: none; }
        `}</style>

        <div className="profile-root">
          <div className="profile-wrapper">

            {/* Banner */}
            <div className="profile-banner">
              <span className="banner-label">
                ✦ &nbsp;Patient Profile
              </span>
            </div>

            {/* Card */}
            <div className="profile-card">

              {/* Avatar + Name row */}
              <div className="avatar-row">
                <div className="avatar-wrap">
                  <img
                    className={`avatar-img${isEdit ? " edit-mode" : ""}`}
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="profile"
                    onClick={() => isEdit && document.getElementById("avatar-upload").click()}
                  />
                  {isEdit && (
                    <label htmlFor="avatar-upload" className="avatar-edit-badge" title="Change photo">
                      {/* Camera icon */}
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.3.07-.62.07-.93s-.03-.63-.07-.93l2.03-1.58c.18-.14.23-.42.12-.64l-1.92-3.32c-.12-.22-.37-.3-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.5.12.64l2.03 1.58c-.04.3-.07.63-.07.93s.03.63.07.93l-2.03 1.58c-.18.14-.23.42-.12.64l1.92 3.32c.12.22.37.3.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.5-.12-.64l-2.01-1.58z"/>
                      </svg>
                    </label>
                  )}
                  {/* Hidden file input */}
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="avatar-info">
                  <h2>{userData.name}</h2>
                  <p>{userData.email}</p>
                </div>
              </div>

              {/* Personal Information */}
              <p className="section-title">Personal Information</p>
              <div className="fields-grid">

                {/* Full Name */}
                <div className="field-item">
                  <label>Full Name</label>
                  {isEdit ? (
                    <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Your full name" />
                  ) : (
                    <p>{userData.name || "—"}</p>
                  )}
                </div>

                {/* Email (read-only) */}
                <div className="field-item">
                  <label>Email Address</label>
                  <p>{userData.email}</p>
                </div>

                {/* Phone */}
                <div className="field-item">
                  <label>Phone Number</label>
                  {isEdit ? (
                    <input type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                  ) : (
                    <p>{userData.phone || "—"}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="field-item">
                  <label>Gender</label>
                  {isEdit ? (
                    <select name="gender" value={userData.gender} onChange={handleChange}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p>{userData.gender || "—"}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="field-item">
                  <label>Date of Birth</label>
                  {isEdit ? (
                    <input type="date" name="dob" value={userData.dob} onChange={handleChange} />
                  ) : (
                    <p>{userData.dob || "—"}</p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="field-item">
                  <label>Address Line 1</label>
                  {isEdit ? (
                    <input
                      type="text"
                      value={userData.address?.line1 || ""}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: { ...userData.address, line1: e.target.value },
                        })
                      }
                      placeholder="Street / Area"
                    />
                  ) : (
                    <p>{userData.address?.line1 || "—"}</p>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className="field-item">
                  <label>Address Line 2</label>
                  {isEdit ? (
                    <input
                      type="text"
                      value={userData.address?.line2 || ""}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: { ...userData.address, line2: e.target.value },
                        })
                      }
                      placeholder="City / State / PIN"
                    />
                  ) : (
                    <p>{userData.address?.line2 || "—"}</p>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="btn-row">
                {isEdit ? (
                  <>
                    <button className="btn-save" onClick={updateUserProfileData}>
                      Save Changes
                    </button>
                    <button className="btn-cancel" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn-edit" onClick={() => setIsEdit(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </>
    )
  );
};

export default MyProfile;
