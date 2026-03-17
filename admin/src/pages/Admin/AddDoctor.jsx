import React from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  return (
    <form>
      <p>Add Doctor</p>
      <div>
        <div>
          <label htmlFor="doc-img">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" id="doc-img" hidden />
          <p>Upload Image</p>
        </div>
        <div>
          <div>
            <div>
              <p>Doctor Name</p>
              <input type="text" placeholder="Name" required />
            </div>
            <div>
              <p>Doctor Email</p>
              <input type="text" placeholder="Email" required />
            </div>
            <div>
              <p>Doctor Password</p>
              <input type="password" placeholder="Password" required />
            </div>
            <div>
              <p>Experience</p>
              <select name="" id="">
                <option value="1 Year"> 1Year </option>
                <option value="2 Year"> 2Year </option>
                <option value="3 Year"> 3Year </option>
                <option value="4 Year"> 4Year </option>
                <option value="5 Year"> 5Year </option>
                <option value="6 Year"> 6Year </option>
                <option value="7 Year"> 7Year </option>
                <option value="8 Year"> 8Year </option>
                <option value="9 Year"> 9Year </option>
                <option value="10 Year"> 10Year </option>
              </select>
              <div>
              <p>Fees</p>
              <input type="number" placeholder="Fees" required />
            </div>
              
            </div>
            <div>
                <div>
                    <p>Speciality</p>
                    <select name="" id="">
                        <option value="General physician">General Physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                </div>
                <div>
                     <p>Education</p>
              <input type="text" placeholder="Education" required />

                </div>
                <div>
                    <p>Address</p>
                    <input type="text" placeholder="Address 1" required />
                    <input type="text" placeholder="Address 2" required />

                </div>
            </div>
          </div>
          <div>
                     <p>Aboout Doctor</p>
              <textarea type="text" placeholder="About Doctor" required />

                </div>
          


        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
